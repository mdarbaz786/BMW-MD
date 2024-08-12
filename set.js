const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUpzcUlPV0Q0ZlFBUmF1bG80YTVUUFZxVW1kdGhjNmkydEc4dHhBMFZrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVp6bmxld1ltS0RnckVkakxJY3FnK2ltZ25VcDNsdXVjQWREOGNvNmdtZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTDNBdzFvMnJCUUNDY2pJY0lETlg5dWVlbzJqcDBuY1JwelZ2ZDVrUUdvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQUNmR0k0REJhYnJSa2JxV1NKa1ordUJZSEVmNld5cS85N3Nad3BGcWk0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCN3orSUNmZVp1clRRQjQxQU5hUVg2bFlyKzJjUGhVaFNCbkJNYU0zbFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJrc3dkMHlZak5XbEhMY1lETUM2MG0zU3FYWnVoZHk2L0F4UzNubDBjUVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU5kdWtQbFVraE55V2dZZXJiL1FxekMrNHpOZy9yTWZOOEhGNm8wU09VST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib25PSDRtc3c1NWFUUktWY3NkclZ5M2ZlVHphaFFJcitMQk9zbXpVUm9Haz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhqdW5IcVhxdzF4VE1Za3RZSXl1NGRUZ1VSZzZpU3h5RVdiVWhaL1Z6MSttTHpjMHNwc1FvWjlISUxnL1dPYkdkZkVMNVNSck9wSUlTTjBIUEtUVGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJOTmxxZGxHem5BdGpYSzJ0UWJUT29oYVVNQmUwQVlKdHhRdERJM0Y1SzIwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJpaTlXS0k4VFE2RzVJeFRBcmVPbWR3IiwicGhvbmVJZCI6IjJmZjhmNzc4LWY0NzItNDg5NS04ZmMxLWYxMzc1YTc2MzkxNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1ZmpDT3BtQ2o1ajRkekFDS08xdE9CWklFZ0U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibWNaZlNZbWk1T1lBOUxobTBDNTZxRmtBMFpjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikc5N01WRFMyIiwibWUiOnsiaWQiOiI5MTc0OTQwMDM0MDk6MTdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pmTDFPSURFT090NTdVR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlpjRlpuMlgwQ2JXYVpsck5pK0pXNG5wYytibFJLK1pSQVR5d3V5cTVBRWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRsVVJPajhmM0RZZi84R0xlT1JNY3hHM25RTWNXMHhWaXF1KzJ0WXFtcnRIZjRZb1A3VHRLQ28zWTZ6amJHSURFVEdSSW55MGhKK29WOFo4NUYvckNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDYTFXUGlFSUVKUmJkVTk1dU5HMUhYaWQrNWl0VTVqZG5YTlJPMnVxMEFIYUdHbC9vSEtaQy9wMFE2cy9EcFNtZVl2YjBhc3hEVTFUbjlwN0UzUTJodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNzQ5NDAwMzQwOToxN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXWEJXWjlsOUFtMW1tWmF6WXZpVnVKNlhQbTVVU3ZtVVFFOHNMc3F1UUJJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNDU1MjE3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUd2aiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Arbaz Khan",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Md Arbaz",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ARBAZ_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/24aad40710dc517906110.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://fabaa:W7RjjRezNnPIKEH7z9vlA6UAQvVVhUsh@dpg-cqs9ijlumphs73ctrbqg-a.oregon-postgres.render.com/ilovemyindimnb"
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
