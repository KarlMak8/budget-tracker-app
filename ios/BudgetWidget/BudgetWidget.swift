import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), balance: 0.0)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), balance: getBalance())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let currentBalance = getBalance()
        let currentDate = Date()
        let entry = SimpleEntry(date: currentDate, balance: currentBalance)
        
        // Update every 5 minutes
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 5, to: currentDate)!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
    
    func getBalance() -> Double {
        // Read from App Group shared UserDefaults
        if let userDefaults = UserDefaults(suiteName: "group.com.budgettracker.app") {
            if let balanceString = userDefaults.string(forKey: "@widget_balance") {
                return Double(balanceString) ?? 0.0
            }
        }
        return 0.0
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let balance: Double
}

struct BudgetWidgetEntryView : View {
    var entry: Provider.Entry
    
    var body: some View {
        ZStack {
            LinearGradient(gradient: Gradient(colors: [Color(hex: "667eea"), Color(hex: "764ba2")]), 
                         startPoint: .topLeading, 
                         endPoint: .bottomTrailing)
            
            VStack(alignment: .center, spacing: 8) {
                Text("Budget Tracker")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white.opacity(0.9))
                
                Text(formatBalance(entry.balance))
                    .font(.system(size: 32, weight: .bold))
                    .foregroundColor(entry.balance >= 0 ? Color(hex: "4ade80") : Color(hex: "f87171"))
                    .minimumScaleFactor(0.5)
                    .lineLimit(1)
                
                Text("Current Balance")
                    .font(.system(size: 12))
                    .foregroundColor(.white.opacity(0.8))
            }
            .padding()
        }
    }
    
    func formatBalance(_ value: Double) -> String {
        let formatted = String(format: "%.2f", abs(value))
        return value >= 0 ? "$\(formatted)" : "-$\(formatted)"
    }
}

@main
struct BudgetWidget: Widget {
    let kind: String = "BudgetWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            BudgetWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Budget Balance")
        .description("Shows your current budget balance")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct BudgetWidget_Previews: PreviewProvider {
    static var previews: some View {
        BudgetWidgetEntryView(entry: SimpleEntry(date: Date(), balance: 1234.56))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
