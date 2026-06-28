import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';

const Login = () => {
    const [errorMassage, setErrorMassage] = useState('')
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
           setErrorMassage('')
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);

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
                </div>
            </div>
        </div>
    );
};

export default Login;