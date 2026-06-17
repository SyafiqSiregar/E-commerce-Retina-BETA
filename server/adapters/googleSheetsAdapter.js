import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

let doc = null;

export const initGoogleSheets = async () => {
    try {
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, serviceAccountAuth);
        await doc.loadInfo(); // loads document properties and worksheets
        console.log(`Connected to Google Sheet: ${doc.title}`);
        return doc;
    } catch (error) {
        console.error('Failed to initialize Google Sheets Adapter:', error.message);
        throw error;
    }
};

export const getDoc = () => {
    if (!doc) {
        throw new Error('Google Sheets is not initialized yet.');
    }
    return doc;
};
