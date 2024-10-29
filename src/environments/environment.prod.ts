declare var RECLAMEI_FIREBASE_API_KEY: string;
declare var RECLAMEI_FIREBASE_AUTH_DOMAIN: string;
declare var RECLAMEI_FIREBASE_PROJECT_ID: string;
declare var RECLAMEI_FIREBASE_STORAGE_BUCKET: string;
declare var RECLAMEI_FIREBASE_MESSAGING_SENDER_ID: string;
declare var RECLAMEI_FIREBASE_APP_ID: string;
declare var RECLAMEI_FIREBASE_MEASUREMENT_ID: string;
declare var GATEWAY_ENDPOINT: string;
declare var GOOGLE_MAPS_API_KEY: string;
declare var EMAIL_SERVICE_ID: string;
declare var EMAIL_TEMPLATE_ID: string;
declare var EMAIL_PRIVATE_KEY: string;

export const environment = {
    production: true,
    apiEndpoint: GATEWAY_ENDPOINT,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    emailServiceId: EMAIL_SERVICE_ID,
    emailTemplateId: EMAIL_TEMPLATE_ID,
    emailPrivateKey: EMAIL_PRIVATE_KEY,
    firebase: {
        apiKey: RECLAMEI_FIREBASE_API_KEY,
        authDomain: RECLAMEI_FIREBASE_AUTH_DOMAIN,
        projectId: RECLAMEI_FIREBASE_PROJECT_ID,
        storageBucket: RECLAMEI_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: RECLAMEI_FIREBASE_MESSAGING_SENDER_ID,
        appId: RECLAMEI_FIREBASE_APP_ID,
        measurementId: RECLAMEI_FIREBASE_MEASUREMENT_ID
    }
};
