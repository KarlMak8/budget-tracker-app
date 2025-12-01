#!/bin/bash

echo "🏦 Budget Tracker with Plaid Setup"
echo "=================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo ""
    echo "To use real bank accounts, you need Plaid API credentials:"
    echo "1. Go to https://dashboard.plaid.com/signup"
    echo "2. Sign up for free"
    echo "3. Get your Client ID and Sandbox Secret"
    echo "4. Copy .env.example to .env"
    echo "5. Add your credentials to .env"
    echo ""
    echo "For now, the app will run in DEMO MODE."
    echo ""
fi

echo "Starting Budget Tracker..."
echo ""
echo "📱 Access on your phone:"
echo "   1. Get your IP: ifconfig | grep 'inet ' | grep -v 127.0.0.1"
echo "   2. Visit: http://[YOUR_IP]:8080/index.html"
echo ""
echo "🖥️  Or on this computer: http://localhost:8080/index.html"
echo ""

# Start both servers
echo "Starting backend server (port 3000)..."
node server.js &
SERVER_PID=$!

echo "Starting frontend server (port 8080)..."
python3 -m http.server 8080 &
FRONTEND_PID=$!

echo ""
echo "✅ Servers running!"
echo "   - Backend: http://localhost:3000"
echo "   - Frontend: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for Ctrl+C
trap "kill $SERVER_PID $FRONTEND_PID; exit" INT
wait
