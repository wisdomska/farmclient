import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth'

export const firebaseEnabled = !!import.meta.env.VITE_FIREBASE_API_KEY

let _auth: Auth | null = null
let _googleProvider: GoogleAuthProvider | null = null

if (firebaseEnabled) {
  const app: FirebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  })
  _auth = getAuth(app)
  _googleProvider = new GoogleAuthProvider()
}

export const auth = _auth
export const googleProvider = _googleProvider

export async function signInWithGoogle(): Promise<string> {
  if (!firebaseEnabled || !_auth || !_googleProvider) {
    throw new Error('Firebase is not configured. Set VITE_FIREBASE_API_KEY to enable Google sign-in.')
  }
  const result = await signInWithPopup(_auth, _googleProvider)
  return result.user.getIdToken()
}
