import * as Google from 'expo-google-app-auth';

import app, { firebase } from './firebase';
import 'firebase/auth';

const auth = app.auth();

const googleAuthConfig = {
  // expoClientId: `<YOUR_WEB_CLIENT_ID>`,
  iosClientId: `96453212450-vo7in1eiln02nk75blbcv3q93mrtfu05.apps.googleusercontent.com`,
  // androidClientId: `<YOUR_ANDROID_CLIENT_ID>`,
  // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`, // use in a standalone app
  // androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
};

export async function loginWithGoogle() {
  const result = await Google.logInAsync(googleAuthConfig);
  if (result.type === 'success') {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      result.idToken,
      result.accessToken,
    );
    return auth.signInWithCredential(credential);
  }
  throw new Error('canceled');
}

export function onAuthStateChanged(cb: (u: firebase.User) => void) {
  return auth.onAuthStateChanged(cb);
}
