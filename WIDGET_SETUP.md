# Lock Screen Widget Setup Guide - SIMPLE VERSION

Your Budget Tracker now includes a widget that works on iOS lock screens and home screens!

## 🚀 Quick Setup (3 Minutes):

### **Step 1: Enable Widget in App**

1. Open Budget Tracker app
2. Scroll down to "Lock Screen Widget" section
3. Toggle it **ON**
4. Set your budget goal (e.g., $2000)

### **Step 2: Create iOS Shortcut Widget**

1. **Open Safari** on your iPhone
2. **Go to this URL**: `shortcuts://create-shortcut`
3. **Tap the "+" button** to add actions:
   - Search for "**Open URLs**" → Add it
   - Enter: `file:///Users/karl/Documents/budget%20tracker%20app/widget.html`
   - (Or your deployed URL once you deploy the app)
4. **Tap the settings icon** (three dots)
5. **Name it**: "Budget Widget"
6. **Tap "Add to Home Screen"**
7. **Enable "Show on Lock Screen"**

### **Step 3: Add Widget to Lock Screen**

1. **Lock your iPhone**
2. **Long press the lock screen** → Tap "Customize"
3. **Choose "Lock Screen"**
4. **Tap below the time** to add widgets
5. **Find "Budget Widget"** and add it
6. **Tap "Done"**

---

## 📱 Even Easier Option: Widget Page

I've created a standalone widget page for you!

### **Method 1: Bookmark the Widget Page**

1. **Open the app** and enable the widget
2. **Go to**: `http://localhost:3000/widget.html` (or wherever your app is hosted)
3. **Tap Share** → **Add to Home Screen**
4. **Name it**: "Budget Widget"
5. **Tap this icon** anytime to see your widget!

### **Method 2: iOS Shortcuts (More Features)**

1. **Open Shortcuts app** on iPhone
2. **Tap "+" to create new shortcut**
3. **Add "Open App"** action
4. **Select Safari**
5. **Add "Open URLs"** action  
6. **Enter widget URL**: `http://localhost:3000/widget.html`
7. **Tap settings** → Enable "Show in Widget"
8. **Add to Home Screen**

Now you can:
- Add it as a **home screen widget**
- Add it to your **lock screen**
- Add it to the **Today View** (swipe right from home screen)

---

## 🎨 What You'll See:

Your widget displays:
- ✅ **Large balance** (green if positive, red if negative)
- ✅ **Progress bar** (changes color based on spending)
  - Green: 50%+ remaining
  - Orange: 25-50% remaining  
  - Red: Below 25%
- ✅ **Percentage** of budget left
- ✅ **Budget goal** amount
- ✅ **Last updated** timestamp
- ✅ **Open App** button

---

## 🔄 Auto-Updates:

The widget updates automatically:
- When you add transactions
- Every 30 seconds when widget page is open
- When you tap the widget to refresh

---

## ⚡ Pro Tips:

1. **Deploy your app online** (Render, Vercel, Netlify) so the widget works from anywhere
2. **Use the widget.html page** - it's designed specifically for quick glances
3. **Add multiple shortcuts** - one for lock screen, one for home screen
4. **Set budget goals realistically** based on your monthly income

---

## 🎯 Current Setup:

You now have TWO ways to view your budget:

1. **Full App** (`index.html`): 
   - Complete transaction management
   - Bank connections
   - Full widget preview with settings

2. **Widget Page** (`widget.html`):
   - Quick view only
   - Perfect for shortcuts and widgets
   - Auto-refreshing
   - Minimal design

---

## 🌐 For Better Widget Experience:

### **Deploy Your App** (Recommended)

Deploy to Render or another service so you can access the widget from anywhere:

1. Your widget URL becomes: `https://your-app.onrender.com/widget.html`
2. Use this URL in your shortcuts
3. Works even when away from your computer
4. No localhost limitations

---

## 📱 Alternative: Use the In-App Widget

If shortcuts are too complicated:

1. **Open the app** from your home screen icon
2. **Scroll to "Lock Screen Widget"** section  
3. **Toggle ON** and set budget
4. **View the widget preview** anytime!

This is always available and updates in real-time.

---

## ❓ Troubleshooting:

**Widget shows $0?**
- Make sure you enabled the widget in the main app
- Set a budget goal
- Add some transactions to test

**Widget not updating?**
- Open the main app to sync data
- Check that localStorage is enabled in Safari
- Try refreshing the widget page

**Can't add to lock screen?**
- iOS requires shortcuts to be run at least once first
- Try opening the shortcut manually
- Then it will appear in lock screen widget options

---

**Need help?** The widget preview in the main app always works and shows you exactly what the standalone widget will display!

🎉 Enjoy your Budget Widget!
2. **Long press on the lock screen** until the "Customize" button appears
3. Tap **"Customize"** → Choose **"Lock Screen"**
4. Tap on the widget area (below the time)
5. Search for **"Budget Tracker"**
6. Select the widget and tap **"Done"**

*Note: This only works if the app is built as a native iOS app, not a web app.*

### **Adding to Home Screen:**

1. **Long press on an empty area** of your home screen
2. Tap the **"+"** button in the top-left corner
3. Search for **"Budget Tracker"**
4. Select your preferred size (Small or Medium)
5. Tap **"Add Widget"**

*Note: This only works if the app is built as a native iOS app, not a web app.*

---

## 🤖 For Android Devices (If This Were a Native App):

### **Adding the Widget:**

1. **Long press on an empty area** of your home screen
2. Tap **"Widgets"**
3. Scroll down to find **"Budget Tracker"**
4. **Drag the widget** to your desired location
5. Resize if needed

*Note: This only works if the app is built as a native Android app, not a web app.*

---

## ✨ What You Have Right Now (Web App Widget):

Your Budget Tracker web app has an **interactive widget dashboard** that you can view anytime:

### **How to Use It:**

1. **Open the app** from your home screen icon
2. **Enable the Lock Screen Widget** toggle in the app
3. **Set your budget goal**
4. **View the beautiful widget preview** showing:
   - Your balance in large text
   - Progress bar (green/orange/red based on spending)
   - Percentage remaining
   - Budget goal

This updates **automatically** every time you:
- Add income or expenses
- Sync bank accounts  
- Refresh the app

It's designed to look exactly like a lock screen widget would, giving you a quick visual overview of your budget health!

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
