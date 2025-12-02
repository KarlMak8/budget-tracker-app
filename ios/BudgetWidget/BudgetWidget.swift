import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), balance: 0.0, budgetGoal: 2000.0, percentage: 100.0)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let widgetData = getWidgetData()
        let entry = SimpleEntry(date: Date(), 
                              balance: widgetData.balance, 
                              budgetGoal: widgetData.budgetGoal,
                              percentage: widgetData.percentage)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let widgetData = getWidgetData()
        let currentDate = Date()
        let entry = SimpleEntry(date: currentDate, 
                              balance: widgetData.balance,
                              budgetGoal: widgetData.budgetGoal,
                              percentage: widgetData.percentage)
        
        // Update every 5 minutes
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 5, to: currentDate)!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
    
    func getWidgetData() -> (balance: Double, budgetGoal: Double, percentage: Double) {
        // Read from shared UserDefaults
        if let userDefaults = UserDefaults(suiteName: "group.com.budgettracker.app") {
            let balance = userDefaults.double(forKey: "widget_balance")
            let budgetGoal = userDefaults.double(forKey: "widget_budgetGoal")
            let percentage = userDefaults.double(forKey: "widget_percentage")
            return (balance, budgetGoal > 0 ? budgetGoal : 2000.0, percentage > 0 ? percentage : 100.0)
        }
        return (0.0, 2000.0, 100.0)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let balance: Double
    let budgetGoal: Double
    let percentage: Double
}

struct BudgetWidgetEntryView : View {
    var entry: Provider.Entry
    
    var body: some View {
        ZStack {
            LinearGradient(gradient: Gradient(colors: [Color(hex: "667eea"), Color(hex: "764ba2")]), 
                         startPoint: .topLeading, 
                         endPoint: .bottomTrailing)
            
            VStack(alignment: .center, spacing: 12) {
                Text("Budget Tracker")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(.white.opacity(0.9))
                
                Text(formatBalance(entry.balance))
                    .font(.system(size: 28, weight: .bold))
                    .foregroundColor(.white)
                    .minimumScaleFactor(0.5)
                    .lineLimit(1)
                
                // Progress Bar
                GeometryReader { geometry in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 6)
                            .fill(Color.white.opacity(0.2))
                            .frame(height: 10)
                        
                        RoundedRectangle(cornerRadius: 6)
                            .fill(progressColor())
                            .frame(width: geometry.size.width * CGFloat(min(entry.percentage / 100.0, 1.0)), height: 10)
                    }
                }
                .frame(height: 10)
                
                HStack {
                    Text("\(Int(entry.percentage))%")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(.white.opacity(0.9))
                    
                    Spacer()
                    
                    Text("of \(formatBalance(entry.budgetGoal))")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(.white.opacity(0.8))
                }
            }
            .padding()
        }
    }
    
    func progressColor() -> Color {
        if entry.percentage < 25 {
            return Color(hex: "ef4444")
        } else if entry.percentage < 50 {
            return Color(hex: "f59e0b")
        } else {
            return Color(hex: "22c55e")
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
        BudgetWidgetEntryView(entry: SimpleEntry(date: Date(), balance: 1234.56, budgetGoal: 2000.0, percentage: 61.7))
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
