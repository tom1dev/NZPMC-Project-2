import styleSignin from '../../styles/Signin.module.css';
import { useState } from 'react';
import signinService from '../../services/signinService';
import userService from '../../services/userService';
import { useNavigate } from 'react-router-dom';


const LoginForm= ({ isSignup,setError})=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    
    const handleParramChange = (event,setter) => {
        setter(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password || (isSignup && !name)) {
            alert("Please fill out all fields.");
            return;
        }
        try {
            //if the user is signing up, create a new user else sign in the user
            if (isSignup) {
                const user = { name, email, passwordHash: password, isAdmin: false };
                const data = await userService.createUser(user);
                document.cookie = `token=${"Bearer " + data}`;
                navigate("/");

                
            } else {
                const data = await signinService.signIn(email, password);

                //logs the users auth token in the document cookie
                document.cookie = `token=${"Bearer " + data}`;

                //sends the user to the correct page
                if (email === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

            }

        } catch (error) {
            setError(true);
            console.log(error);
        }
    }
    
    
    return <form onSubmit={handleSubmit}>

        {/**if the user is signing up show the name parrameter */}
        {isSignup &&
            <div className={styleSignin.parrameterBox}>
                <h2>Name</h2>
                <input value={name} onChange={event => handleParramChange(event,setName)} />
            </div>
        }


        <div className={styleSignin.parrameterBox}>
            <h2>Email</h2>
            <input value={email} onChange={event => handleParramChange(event,setEmail)} />
        </div>
        <div className={styleSignin.parrameterBox}>
            <h2>Password</h2>
            <input value={password} onChange={event => handleParramChange(event,setPassword)} />
        </div>

        {/**change the name of the button depending on signin or signup */}
        {isSignup ? <button type="submit">Sign Up</button> : <button type="submit">Login</button>}



    </form>;
}

export default LoginForm;
