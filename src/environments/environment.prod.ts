declare var RECLAMEI_FIREBASE_API_KEY: string;
declare var RECLAMEI_FIREBASE_AUTH_DOMAIN: string;
declare var RECLAMEI_FIREBASE_PROJECT_ID: string;
declare var RECLAMEI_FIREBASE_STORAGE_BUCKET: string;
declare var RECLAMEI_FIREBASE_MESSAGING_SENDER_ID: string;
declare var RECLAMEI_FIREBASE_APP_ID: string;
declare var RECLAMEI_FIREBASE_MEASUREMENT_ID: string;

export const environment = {
  production: true,
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
