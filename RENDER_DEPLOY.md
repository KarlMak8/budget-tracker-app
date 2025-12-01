# Budget Tracker - Render Deployment Guide

## 🚀 Deploy to Render

### Prerequisites
1. GitHub account
2. Render account (sign up at https://render.com)
3. Plaid API credentials

### Step 1: Push to GitHub

```bash
cd "/Users/karl/Documents/budget tracker app"

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Budget Tracker with Plaid"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/budget-tracker-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `budget-tracker-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free

5. Add Environment Variables:
   - `PLAID_CLIENT_ID` = your_client_id
   - `PLAID_SECRET` = your_sandbox_secret
   - `PLAID_ENV` = sandbox
   - `PORT` = 3000

6. Click "Create Web Service"

### Step 3: Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name:** `budget-tracker-frontend`
   - **Build Command:** (leave empty)
   - **Publish Directory:** `.`

4. Click "Create Static Site"

### Step 4: Update Frontend to Use Backend URL

After backend deploys, you'll get a URL like:
`https://budget-tracker-backend.onrender.com`

Update the frontend to use this URL:

1. Open `index.html`
2. Find all instances of `http://localhost:3000`
3. Replace with your Render backend URL

Or use environment detection:

```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'https://budget-tracker-backend.onrender.com';
```

### Step 5: Access Your App

Your app will be live at:
- Frontend: `https://budget-tracker-frontend.onrender.com`
- Backend: `https://budget-tracker-backend.onrender.com`

Add `/index.html` to access the app.

## 🔧 Alternative: Single Service Deployment

You can also deploy both as a single service:

```yaml
services:
  - type: web
    name: budget-tracker
    env: node
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: PLAID_CLIENT_ID
        sync: false
      - key: PLAID_SECRET
        sync: false
      - key: PLAID_ENV
        value: sandbox
    staticPublishPath: .
```

Then update `server.js` to serve static files:

```javascript
// Add after app.use(express.json())
app.use(express.static('.'));
```

## 📱 Access on Phone

Once deployed, you can access the app from anywhere:
- Just visit your Render URL on your phone
- Add to home screen for app-like experience
- No need for local IP addresses anymore!

## 🔐 Security for Production

When moving to production:

1. Update Plaid environment:
   - Change `PLAID_ENV` to `production`
   - Use production Plaid credentials

2. Add CORS restrictions in `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.onrender.com'
}));
```

3. Enable HTTPS (automatic on Render)

4. Add authentication for users

5. Use database for storing access tokens (MongoDB, PostgreSQL)

## 💰 Render Free Tier

- Backend: Spins down after 15 min inactivity
- May take 30-60 seconds to wake up on first request
- 750 hours/month free
- Upgrade to paid plan ($7/month) for always-on service

## 🆘 Troubleshooting

### Backend not connecting?
- Check Environment Variables are set correctly
- View logs in Render Dashboard
- Verify Plaid credentials

### CORS errors?
- Update CORS settings in `server.js`
- Ensure frontend URL is whitelisted

### App not loading?
- Check if backend service is running (green indicator)
- View deployment logs for errors
- Verify build succeeded

## 🔄 Updating Your App

```bash
git add .
git commit -m "Update app"
git push origin main
```

Render will automatically redeploy!

---

**Note:** For best performance, consider upgrading to a paid Render plan or use Vercel/Railway for faster cold starts.
