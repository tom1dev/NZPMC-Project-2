import {useState, useEffect} from 'react';
import styleSignin from '../styles/Signin.module.css';
import { Outlet, Link } from "react-router-dom";
import LoginForm from '../components/signIn/LoginForm.jsx';
import userService from '../services/userService.js';
import { useNavigate } from "react-router-dom";
import SignInFormContainer from '../components/signIn/SignInFormContainer.jsx';

const SignIn = ({}) => {
    const [isSignup,setIsSignup] = useState(false);
    
    const navigate = useNavigate();

    //checks if user is logged in and changes its page if it is
    useEffect(() => {
        //gets user information with its auth cookie
        const fetchUserInformation = async () => {
            try {
                const user = await userService.getUserByToken();
                return user[0];
            } catch (error) {
                console.log(error);
                return;
            }
        }

        //fetches user information if user is logged in it navigates to correct page
        const fetchAndNavigate = async () => {
            const user = await fetchUserInformation();
            if (user && user.email === "admin") {
                navigate("/admin");
            } else if (user) {
                navigate("/");
            }
        };

        fetchAndNavigate();
    }, []);



    return(
        <div className={styleSignin.SigninContainer}>  
            <div className={styleSignin.LinkContainer}><Link className={styleSignin.homeLink} to="/">home</Link></div>    
            
            {/*shows sign in or login version of the form depending on isSignup condition*/}
        
            <SignInFormContainer title={isSignup ? "Sign Up" : "Sign In"} isSignup={isSignup} setIsSignup={setIsSignup} />
        </div>
    )
}; 

export default SignIn;