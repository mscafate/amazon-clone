import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase.js"

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        //firebase login stuff
        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //console.log(auth); created new user
            if (auth) {
                history.push('/')
            }
        })
        .catch((error) => alert(error.message))
        //firebase register stuff
    }

    return (
        <div className="login">
            <Link to='/'>
            <img 
                className="login__logo"
                src='https://pngimg.com/uploads/amazon/amazon_PNG24.png'
            />
            </Link>
            <div className="login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>Email</h5>
                    <input 
                        type='text' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                    <h5>Password</h5>
                    <input 
                        type='passwords'
                        value={password}  
                        onChange={e => setPassword(e.target.value)} 
                    />

                    <button 
                        type='submit'
                        className='login__signInButton' 
                        onClick={signIn}
                    >Sign In</button>
                </form>
                <p>
                    By signing in you agree to the terms 
                    and conditions of this FAKE AMAZON STORE.
                </p>

                <button 
                    onClick={register}
                    className='login__registerButton'
                >Create your Amazon Account</button>

            </div>
        </div>
    )
}

export default Login
