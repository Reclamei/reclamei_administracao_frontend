// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

declare var RECLAMEI_FIREBASE_API_KEY: string;
declare var RECLAMEI_FIREBASE_AUTH_DOMAIN: string;
declare var RECLAMEI_FIREBASE_PROJECT_ID: string;
declare var RECLAMEI_FIREBASE_STORAGE_BUCKET: string;
declare var RECLAMEI_FIREBASE_MESSAGING_SENDER_ID: string;
declare var RECLAMEI_FIREBASE_APP_ID: string;
declare var RECLAMEI_FIREBASE_MEASUREMENT_ID: string;
declare var GATEWAY_ENDPOINT: string;

export const environment = {
    production: true,
    apiEndpoint: GATEWAY_ENDPOINT,
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
