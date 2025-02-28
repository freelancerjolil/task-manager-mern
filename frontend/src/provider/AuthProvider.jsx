import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config'; // Import auth from firebase.config
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const axiosPublic = useAxiosPublic();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle errors and provide consistent response
  const handleAuthError = (error) => {
    console.error('Authentication error:', error.message);
    return Promise.reject(error);
  };

  // Create new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).catch(
      handleAuthError
    );
  };

  // Sign in with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).catch(
      handleAuthError
    );
  };

  // Google sign-in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        return result;
      })
      .catch(handleAuthError)
      .finally(() => setLoading(false));
  };

  // Logout function
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .catch(handleAuthError)
      .finally(() => setLoading(false));
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    }
    return Promise.reject(new Error('No authenticated user.'));
  };

  // Monitor auth state and handle JWT setup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user in context
      console.log(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post('/jwt', userInfo)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
            }
          })
          .catch((error) => {
            console.error('JWT error:', error);
          })
          .finally(() => setLoading(false)); // Ensure loading stops after processing
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser, // Pass `setUser` for direct updates if necessary
    loading,
    createUser, // For Signup functionality
    signIn, // For Login functionality
    googleSignIn, // For Google Authentication
    logOut, // To handle user logout
    updateUserProfile, // To update profile after signup
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
