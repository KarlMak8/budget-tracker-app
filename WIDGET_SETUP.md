# Lock Screen Widget Setup Guide

Your Budget Tracker now includes a beautiful lock screen widget that shows your balance and budget progress!

## 📱 How to Enable the Widget

### **In the Web App:**

1. **Open the app** in your browser (http://localhost:3000)
2. **Scroll down** to find the "Lock Screen Widget" section
3. **Toggle the switch ON** to enable the widget
4. **Set your budget goal** (e.g., $2000)
5. **Watch the preview** update in real-time!

The preview shows exactly what the widget will look like:
- Your current balance
- A color-coded progress bar (Green/Orange/Red)
- Percentage of budget remaining
- Your budget goal

---

## 🍎 For iOS Devices:

### **Adding the Widget to Your Lock Screen:**

1. **Lock your iPhone** (press the power button)
2. **Long press on the lock screen** until the "Customize" button appears
3. Tap **"Customize"** → Choose **"Lock Screen"**
4. Tap on the widget area (below the time)
5. Search for **"Budget Tracker"**
6. Select the widget and tap **"Done"**

### **Adding to Home Screen:**

1. **Long press on an empty area** of your home screen
2. Tap the **"+"** button in the top-left corner
3. Search for **"Budget Tracker"**
4. Select your preferred size (Small or Medium)
5. Tap **"Add Widget"**

---

## 🤖 For Android Devices:

### **Adding the Widget:**

1. **Long press on an empty area** of your home screen
2. Tap **"Widgets"**
3. Scroll down to find **"Budget Tracker"**
4. **Drag the widget** to your desired location
5. Resize if needed

---

## 🌐 For Web/PWA (Progressive Web App):

Since this is a web app, the "widget" functionality works within the app itself:

1. **Enable the widget** in the app settings
2. **Install as PWA** (if you haven't already):
   - Click the **install prompt** at the top of the app
   - OR use your browser's "Add to Home Screen" option

The widget preview in the app will update automatically as you add transactions!

---

## 🔄 How Auto-Updates Work:

The widget updates automatically when:
- ✅ You add a new income or expense transaction
- ✅ You sync bank accounts
- ✅ The app auto-saves (every 30 seconds)
- ✅ You manually refresh the app

---

## 🎨 Widget Features:

### **Progress Bar Colors:**
- 🟢 **Green**: 50%+ of budget remaining (you're doing great!)
- 🟠 **Orange**: 25-50% remaining (getting low)
- 🔴 **Red**: Below 25% (critical - watch your spending!)

### **What's Shown:**
- Current balance
- Percentage of budget remaining
- Budget goal amount
- Real-time updates

---

## 🔧 Technical Notes:

### **For Developers:**

The widget data is stored in:
- `localStorage.getItem('widgetData')` - Complete widget data object
- `localStorage.getItem('widget_balance')` - Current balance
- `localStorage.getItem('widget_budgetGoal')` - Budget goal
- `localStorage.getItem('widget_percentage')` - Percentage remaining

### **For Native Apps:**

If building as a native app with Expo/React Native:
- iOS widget code is in `ios/BudgetWidget/BudgetWidget.swift`
- Android widget code is in `android/app/src/main/java/com/budgettracker/BudgetWidget.kt`
- The widget reads from shared app group storage

---

## 💡 Tips:

1. **Set a realistic budget goal** based on your monthly income
2. **Check the widget preview** to ensure it looks right before adding to your lock screen
3. **The widget updates automatically** - no manual refresh needed!
4. **Try different budget goals** to find what works best for you

---

## ❓ Troubleshooting:

**Widget not showing?**
- Make sure the toggle is ON in the app
- Ensure you've set a budget goal
- Check that the app has permission to update widgets

**Data not updating?**
- Open the app to trigger an update
- Check that auto-save is working (watch the console logs)
- Try toggling the widget OFF and ON again

**Widget looks different?**
- The preview in the app shows exactly how it will look
- Different device sizes may show the widget slightly differently
- Colors adjust based on your remaining budget percentage

---

Enjoy tracking your budget with style! 🎉
