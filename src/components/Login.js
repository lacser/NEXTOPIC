import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import styles from "./stylesheets/Login.module.css";

const LoginWidget = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);

    const signInWithEmail = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
        console.log(auth?.currentUser?.email);
    }

    console.log(auth?.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className={isSignedIn ? styles.loginWidgetSignedIn : styles.loginWidgetNotSignedIn}>
            <label className={isSignedIn ? styles.inactiveloginLabel : styles.activeloginLabel} htmlFor="userNameInputBox">
                Login
            </label>
            <div className={isSignedIn ? styles.activeloginInfo : styles.inactiveloginInfo}>
                <img
                    src={auth?.currentUser?.photoURL}
                    className={styles.profilePhoto}
                />
                <label className={styles.showName}>
                    {auth?.currentUser?.displayName}
                </label>
            </div>
            <form className={isSignedIn ? styles.inputFormSignedIn : styles.inputFormNotSignedIn}>
                <input
                    type="text"
                    name='userName'
                    placeholder="Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    className={`${styles.inputBox} ${styles.userName}`}>
                </input>
                <input
                    type="text"
                    name='userPassword'
                    placeholder="Password"
                    onChange={(p) => { setPassword(p.target.value) }}
                    className={`${styles.inputBox} ${styles.password}`}>
                </input>
                <div className={styles.signInWithEmailSubmitButtons}>
                    <input
                        type="submit"
                        name='signUp'
                        value='Sign up'
                        onClick={signInWithEmail}
                        className={`${styles.submitButton} ${styles.signUpSubmitButton}`}>
                    </input>
                    <input
                        type="submit"
                        name='signIn'
                        value='Sign in'
                        className={`${styles.submitButton} ${styles.signInSubmitButton}`}>
                    </input>
                </div>
            </form>

            <button
                name="signInWithGoogle"
                value="Sign in with Google"
                onClick={signInWithGoogle}
                className={isSignedIn ? styles.inactiveSignInWithGoogleButton : styles.activeSignInWithGoogleButton}>
                Sign in with Google
            </button>
            <button
                name="signOut"
                value="Sign Out"
                onClick={logOut}
                className={isSignedIn ? styles.activeSignOutButton : styles.inactiveSignOutButton}>
                Sign Out
            </button>
        </div>
    );
}

export default LoginWidget;