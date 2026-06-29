import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('')
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
              
           setSuccess(false)
           setErrorMassage('')

        //    password validation
        const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(passwordRegExp.test(password) === false){
            setErrorMassage("password must have one lower case, one upper case, one digit and 6 characters longer");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
               setSuccess(true)
            })
            .catch(error => {
                console.log(error.message);
                setErrorMassage(error.message)
            })
    }
    return (
        <div className="hero mt-12">
            <div className="card  w-full max-w-sm mx-auto shrink-0 shadow-2xl">
                <div className="card-body">
                    <form className="fieldset" onSubmit={handleLogin}>
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </form>
                    {
                        errorMassage && <p className='text-red-400'>{errorMassage}</p>
                    }
                    {
                          success && <p className='text-green-400'>user has created successfully</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;