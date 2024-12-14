import styleSignin from '../../styles/Signin.module.css';


const SigninFormLink = ({ isSignup, onSignupClicked }) => {
    return (
    <div className={styleSignin.linkBox}>
        {isSignup ?
            <>
                <p>Have an account?</p>
                <p className={styleSignin.signupLink} onClick={onSignupClicked}>  Sign In</p>
            </>:
            <>
                <p>Don't have an account?</p>
                <p className={styleSignin.signupLink} onClick={onSignupClicked}>  Sign Up</p>
            </>
        }
    </div>);
}

export default SigninFormLink;