// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:8083',
  firebase: {
      apiKey: 'AIzaSyD1mGeGUP1pB_ie5pbkkgqez1f2614sUXI',
      authDomain: 'reclamei-auth.firebaseapp.com',
      projectId: 'reclamei-auth',
      storageBucket: 'reclamei-auth.appspot.com',
      messagingSenderId: '931498777244',
      appId: '1:931498777244:web:1441eaad23accb9cf5ab59',
      measurementId: 'G-T25QTFJB3B'
  }
};
