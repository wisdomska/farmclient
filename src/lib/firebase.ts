/**
 * Google sign-in via Firebase Auth. The Firebase SDK is the heaviest
 * dependency in the app, and most sessions never press the Google button —
 * so it is dynamic-imported on first use instead of shipped in the main
 * bundle (matters on budget Android + mobile data).
 */
export const firebaseEnabled = !!import.meta.env.VITE_FIREBASE_API_KEY

export async function signInWithGoogle(): Promise<string> {
  if (!firebaseEnabled) {
    throw new Error('Firebase is not configured. Set VITE_FIREBASE_API_KEY to enable Google sign-in.')
  }
  const [{ initializeApp, getApps }, { getAuth, GoogleAuthProvider, signInWithPopup }] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ])
  const app = getApps()[0] ?? initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  })
  const result = await signInWithPopup(getAuth(app), new GoogleAuthProvider())
  return result.user.getIdToken()
}
