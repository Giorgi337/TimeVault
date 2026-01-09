
const { auth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

async function verifyConnection() {
    try {
        const keyPath = path.resolve('c:/Users/USER 1/Desktop/Company/Website/gcp-key.json');
        if (!fs.existsSync(keyPath)) {
            console.error('Key file not found at:', keyPath);
            return;
        }

        const authClient = new auth.GoogleAuth({
            keyFile: keyPath,
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });

        const client = await authClient.getClient();
        const projectId = await authClient.getProjectId();
        console.log('Successfully authenticated!');
        console.log('Project ID:', projectId);
    } catch (error) {
        console.error('Authentication failed:', error.message);
    }
}

verifyConnection();
