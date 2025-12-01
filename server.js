const express = require('express');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Plaid client configuration
const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox, // Use 'development' or 'production' for real accounts
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});

const plaidClient = new PlaidApi(configuration);

// Store access tokens (in production, use a database)
const accessTokens = new Map();

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create link token
app.post('/api/create_link_token', async (req, res) => {
    try {
        const request = {
            user: {
                client_user_id: 'user-' + Date.now(),
            },
            client_name: 'Budget Tracker',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
        };

        const createTokenResponse = await plaidClient.linkTokenCreate(request);
        res.json(createTokenResponse.data);
    } catch (error) {
        console.error('Error creating link token:', error);
        res.status(500).json({ error: error.message });
    }
});

// Exchange public token for access token
app.post('/api/exchange_public_token', async (req, res) => {
    try {
        const { public_token } = req.body;
        
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: public_token,
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // Store access token (in production, save to database associated with user)
        accessTokens.set(itemId, accessToken);

        res.json({
            access_token: accessToken,
            item_id: itemId,
        });
    } catch (error) {
        console.error('Error exchanging token:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get account balances
app.post('/api/accounts/balance', async (req, res) => {
    try {
        const { access_token } = req.body;

        const response = await plaidClient.accountsBalanceGet({
            access_token: access_token,
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching balances:', error);
        res.status(500).json({ error: error.message });
    }
});

// Sync transactions
app.post('/api/transactions/sync', async (req, res) => {
    try {
        const { access_token, start_date, end_date } = req.body;

        const response = await plaidClient.transactionsGet({
            access_token: access_token,
            start_date: start_date,
            end_date: end_date,
            options: {
                count: 100,
                offset: 0,
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error syncing transactions:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get transactions (paginated)
app.post('/api/transactions/get', async (req, res) => {
    try {
        const { access_token, start_date, end_date, count = 100, offset = 0 } = req.body;

        const response = await plaidClient.transactionsGet({
            access_token: access_token,
            start_date: start_date,
            end_date: end_date,
            options: {
                count: count,
                offset: offset,
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error getting transactions:', error);
        res.status(500).json({ error: error.message });
    }
});

// Remove account/item
app.post('/api/item/remove', async (req, res) => {
    try {
        const { access_token } = req.body;

        const response = await plaidClient.itemRemove({
            access_token: access_token,
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Budget Tracker backend server running on port ${PORT}`);
    console.log(`Plaid environment: ${process.env.PLAID_ENV || 'sandbox'}`);
    console.log(`Make sure you have set PLAID_CLIENT_ID and PLAID_SECRET in .env file`);
});
