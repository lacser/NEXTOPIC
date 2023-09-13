import React from "react";
import styles from "./Login.module.css";

const LoginWidget = () => {
    return (
        <div className={styles.loginWidget}>
            <label className={styles.loginLabel} htmlFor="userNameInputBox">
                Login
            </label>
            <form className={styles.inputForm}>
                <input type="text" name='userName' className={`${styles.inputBox} ${styles.userName}`} id="userNameInputBox">
                </input>
                <input type="text" name='userPassword' className={`${styles.inputBox} ${styles.password}`}>
                </input>
                <input type="submit" name='signUp' value='Sign up' className={`${styles.submitButton} ${styles.signUpSubmitButton}`}>
                </input>
                <input type="submit" name='signIn' value='Sign in' className={`${styles.submitButton} ${styles.signInSubmitButton}`}>
                </input>
            </form>
        </div>
    );
}

export default LoginWidget;