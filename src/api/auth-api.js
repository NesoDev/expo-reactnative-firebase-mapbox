import { FIREBASE_AUTH } from '../core/config';
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

const auth = FIREBASE_AUTH;

export const signUpUser = async ({ name, email, password }) => {
  try {
    console.log("Registrando usuario");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export const sendEmailWithPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
