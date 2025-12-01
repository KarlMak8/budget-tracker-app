# Budget Tracker with Plaid Integration

A mobile-friendly budget tracking app with Plaid integration for automatic bank account and credit card syncing.

## 🎯 Features

- 📊 Manual transaction tracking (income/expenses)
- 🏦 **Connect real bank accounts and credit cards via Plaid**
- 💳 **Automatic transaction syncing**
- 💰 Real-time balance tracking across all accounts
- 📱 Mobile-responsive design
- 💾 Local storage + cloud sync via Plaid
- 🔒 Secure authentication with Plaid

## 🚀 Quick Start

### 1. Get Plaid API Keys

1. Go to [Plaid Dashboard](https://dashboard.plaid.com/signup)
2. Sign up for a free account
3. Get your **Client ID** and **Sandbox Secret** from the Keys page

### 2. Setup Backend

```bash
cd "/Users/karl/Documents/budget tracker app"

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Plaid credentials:
# PLAID_CLIENT_ID=your_client_id_here
# PLAID_SECRET=your_sandbox_secret_here
```

### 3. Run the App

```bash
# Start both backend and frontend
npm run dev

# Or run separately:
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend server  
python3 -m http.server 8080
```

### 4. Access on Your Phone

1. Find your computer's IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. On your phone, visit: `http://[YOUR_IP]:8080/index.html`
3. Click "Connect Bank Account" to link your accounts

## 🏦 Plaid Integration Features

### Supported Account Types
- ✅ Checking accounts
- ✅ Savings accounts
- ✅ Credit cards
- ✅ Money market accounts
- ✅ Prepaid cards

### What Gets Synced
- Account balances (real-time)
- Transaction history (last 30 days)
- Account names and numbers
- Institution information
- Available balance

### Demo Mode
If backend isn't running, the app automatically switches to demo mode where you can:
- Add demo bank accounts
- Test the UI
- See how connected accounts work

## 📱 Using the App

### Manual Transactions
1. Enter amount and description
2. Tap "+ Income" or "- Expense"
3. View in transaction history

### Connected Accounts
1. Click "🏦 Connect Bank Account"
2. Choose your bank from Plaid
3. Enter credentials (sandbox: user_good / pass_good)
4. Select accounts to connect
5. Transactions auto-sync

### Syncing
- Accounts sync automatically on connection
- Click "Sync" button to manually refresh
- Last sync time shown under each account

## 🔧 API Endpoints

### Backend Server (Port 3000)

- `GET /api/health` - Health check
- `POST /api/create_link_token` - Get Plaid Link token
- `POST /api/exchange_public_token` - Exchange for access token
- `POST /api/accounts/balance` - Get account balances
- `POST /api/transactions/sync` - Sync recent transactions
- `POST /api/transactions/get` - Get historical transactions
- `POST /api/item/remove` - Remove connected account

## 🧪 Testing with Plaid Sandbox

Use these test credentials in sandbox mode:

**Good Account:**
- Username: `user_good`
- Password: `pass_good`

**Account with Transactions:**
- Username: `user_custom`
- Password: `pass_good`

[More test credentials](https://plaid.com/docs/sandbox/test-credentials/)

## 🛠️ Tech Stack

### Frontend
- Vanilla JavaScript
- HTML5/CSS3
- Plaid Link (client-side)
- LocalStorage API
- Progressive Web App (PWA)

### Backend
- Node.js + Express
- Plaid Node SDK
- CORS enabled
- Environment variables

## 📦 Project Structure

```
budget tracker app/
├── index.html          # Main web app
├── manifest.json       # PWA manifest
├── server.js          # Backend API server
├── package.json       # Dependencies
├── .env              # Plaid credentials (create this)
├── .env.example      # Example environment file
└── README.md         # This file
```

## 🔐 Security Notes

- Never commit `.env` file with real credentials
- Use sandbox for testing
- Requires HTTPS in production
- Access tokens stored temporarily (use database in production)
- Plaid handles all sensitive banking data

## 🚀 Moving to Production

1. Apply for Plaid Production access
2. Update `.env` with production credentials
3. Change `PlaidEnvironments.sandbox` to `PlaidEnvironments.production` in `server.js`
4. Deploy backend to secure server (Heroku, AWS, etc.)
5. Enable HTTPS for frontend
6. Implement proper user authentication
7. Use database for storing access tokens

## 📝 Environment Variables

```bash
PLAID_CLIENT_ID=your_client_id      # From Plaid dashboard
PLAID_SECRET=your_secret            # Sandbox/Development/Production
PLAID_ENV=sandbox                   # sandbox | development | production
PORT=3000                           # Backend server port
```

## 🆘 Troubleshooting

### Backend not connecting?
- Check if server is running: `curl http://localhost:3000/api/health`
- Verify `.env` file exists with correct credentials
- Check console for error messages

### Plaid Link not opening?
- Ensure backend is running
- Check browser console for errors
- Verify Plaid credentials in `.env`

### Transactions not syncing?
- Check date range (last 30 days by default)
- Verify account has transactions
- Check backend logs for API errors

## 📱 Add to Home Screen

### iOS
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Tap "Add"

### Android
1. Open in Chrome
2. Tap menu (⋮)
3. Select "Add to Home Screen"
4. Tap "Add"

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Cloud database storage
- [ ] Budget categories and goals
- [ ] Spending analytics and charts
- [ ] Recurring transactions
- [ ] Export data (CSV, PDF)
- [ ] Multiple user support
- [ ] Notifications for low balance
- [ ] Native mobile app with widgets

## 📄 License

ISC

## 🙏 Credits

- [Plaid](https://plaid.com/) - Banking API
- [Express](https://expressjs.com/) - Backend framework

---

**Note:** This app uses Plaid Sandbox by default. Real banking data requires Production access from Plaid.
