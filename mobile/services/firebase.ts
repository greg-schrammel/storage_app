import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCV62nnfXwoMitheQEvYUatZlPHDJtyc8E',
  authDomain: 'gtc-storage.firebaseapp.com',
  databaseURL: 'https://gtc-storage.firebaseio.com',
  projectId: 'gtc-storage',
  storageBucket: 'gtc-storage.appspot.com',
  messagingSenderId: '96453212450',
  appId: '1:96453212450:web:35d3e847807f8a01bb8d7b',
};

export { default as firebase } from 'firebase';
export default firebase.apps[0] || firebase.initializeApp(firebaseConfig);
