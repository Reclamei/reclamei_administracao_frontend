const { writeFileSync } = require('fs');
const { join } = require('path');

// Captura as variáveis do Vercel
const targetPath = join(__dirname, 'src/environments/environment.prod.ts');

// Define as variáveis de ambiente a partir do process.env
const envConfigFile = `
export const environment = {
    production: true,
    googleMapsApiKey: '${process.env.GOOGLE_MAPS_API_KEY}',
    emailServiceId: '${process.env.EMAIL_SERVICE_ID}',
    emailTemplateId: '${process.env.EMAIL_TEMPLATE_ID}',
    emailPrivateKey: '${process.env.EMAIL_PRIVATE_KEY}',
    firebase: {
        apiKey: '${process.env.RECLAMEI_FIREBASE_API_KEY}',
        authDomain: '${process.env.RECLAMEI_FIREBASE_AUTH_DOMAIN}',
        projectId: '${process.env.RECLAMEI_FIREBASE_PROJECT_ID}',
        storageBucket: '${process.env.RECLAMEI_FIREBASE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.RECLAMEI_FIREBASE_MESSAGING_SENDER_ID}',
        appId: '${process.env.RECLAMEI_FIREBASE_APP_ID}',
        measurementId: '${process.env.RECLAMEI_FIREBASE_MEASUREMENT_ID}'
    },
    apiEndpoint: '${process.env.GATEWAY_ENDPOINT}'
};
`;

// Escreve o arquivo de ambiente
writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
