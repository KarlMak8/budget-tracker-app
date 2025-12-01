# Budget Tracker App with Live Widget

A mobile budget tracking app with live home screen widgets for iOS and Android.

## Features

- 📊 Track income and expenses
- 💰 Real-time balance display
- 📱 Live home screen widget showing current balance
- 💾 Local data storage
- 🎨 Beautiful gradient UI
- 📝 Transaction history with timestamps
- 🗑️ Long-press to delete transactions

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android)

### Installation

1. Navigate to the project directory:
```bash
cd "/Users/karl/Documents/budget tracker app"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
   - **iOS**: Press `i` to open in iOS simulator, or scan QR code with Expo Go app
   - **Android**: Press `a` to open in Android emulator, or scan QR code with Expo Go app

## Widget Setup

### iOS Widget Setup

1. Build the app for iOS using Expo's EAS Build or eject to bare React Native
2. Add a Widget Extension target in Xcode
3. Use the provided `BudgetWidget.swift` file in the `ios/BudgetWidget/` directory
4. Configure App Groups in both the main app and widget:
   - Go to Signing & Capabilities
   - Add App Groups capability
   - Use group ID: `group.com.budgettracker.app`
5. Build and install on your device
6. Add the widget to your home screen by long-pressing

### Android Widget Setup

1. The widget files are already configured in `android/` directory
2. Build the app using `npx expo run:android` (requires ejecting from Expo)
3. Install on your device
4. Long-press on home screen → Widgets → Find "Budget Tracker" widget
5. Add to home screen

## How to Use

1. **Add Income**: Enter amount and optional description, tap "+ Income"
2. **Add Expense**: Enter amount and optional description, tap "- Expense"
3. **View Balance**: Your current balance updates in real-time at the top
4. **View Transactions**: Scroll down to see all recent transactions
5. **Delete Transaction**: Long-press any transaction and confirm deletion
6. **Widget**: The widget automatically updates to show your current balance

## Widget Features

- **Auto-refresh**: Updates every 5 minutes
- **Color-coded**: Green for positive balance, red for negative
- **Always visible**: Check your balance without opening the app
- **Small & Medium sizes**: Supports multiple widget sizes (iOS)

## Technical Details

- **Framework**: React Native (Expo)
- **Storage**: AsyncStorage for persistent data
- **UI**: Custom components with gradients
- **Widgets**: Native iOS (SwiftUI) and Android (Kotlin) implementations

## Data Storage

All data is stored locally on your device using AsyncStorage. Your financial information never leaves your phone.

## Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## Notes

- Widgets require ejecting from Expo Go to bare React Native for full functionality
- For development, you can test the main app in Expo Go
- Native widget code requires platform-specific builds
- Widget refresh intervals are controlled by the OS

## Future Enhancements

- Budget categories
- Recurring transactions
- Charts and analytics
- Cloud sync (optional)
- Multiple accounts
- Export data

---

Enjoy tracking your budget! 💰📱
