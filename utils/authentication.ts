import { authApi } from '@/api-client';
import { firebase } from '../app/firebase-client';

export function Auth() {
  // SignIn with email and password then send accessToken to server to verify.
  async function signInWithEmail(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        if (response && response.user) {
          return await postUserToken(await response.user.getIdToken(), response.user.displayName);
        }
        return null;
      });
  }

  // Create user with email and password then send accessToken to server to verify.
  async function createUserWithEmail(email: string, password: string, displayName: string = '') {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response: any) => {
        if (response && response.user) {
          return await postUserToken(await response.user.getIdToken(), displayName);
        }
        return null;
      });
  }

  // Logout user out and remove cookies.
  async function logout() {
    return firebase
      .auth()
      .signOut()
      .then(async () => {
        return await removeCookie();
      });
  }

  // Verify and make sure accessToken is correct -> Yes send cookie to client.
  async function postUserToken(accessToken: string, displayName: string) {
    const url = '/api/login';
    const data = { accessToken, displayName };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Make sure the client cookie is valid.
  async function verifyCookies() {
    // const url = '/api/verifyCookie';
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    const response = await authApi.verifyCookie();
    console.log('response: ', response);
    // return response.json();
  }

  // Remove cookies to logout.
  async function removeCookie() {
    const url = '/api/logout';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  return {
    signInWithEmail,
    createUserWithEmail,
    logout,
    verifyCookies,
  };
}
