import styleSignin from '../../styles/Signin.module.css';
import { useState, useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
import SigninFormLink from './SigninFormLink.jsx';


const SignInFormContainer = ({ title, isSignup, setIsSignup }) => {

    const [error, setError] = useState(false);

    //changes the form to sign up or sign in
    const onSignupClicked = () => {
        console.log("Sign up Clicked")
        setIsSignup(!isSignup);
    }



    return (
        <div className={styleSignin.background}>
            <h className={styleSignin.header}>{title}</h>

            {/*shows error message if error occurred during signup*/}
            {error && <h4 className={styleSignin.error}>{isSignup ? "Account couldn't be created" : "Password or email incorrect"}</h4>}
            

            <LoginForm isSignup={isSignup} setError ={setError}/>

            {/*shows the link to the other form(sign in or signup)*/}
            <SigninFormLink isSignup={isSignup} onSignupClicked = {onSignupClicked} />   
        </div>
    )

}

export default SignInFormContainer;