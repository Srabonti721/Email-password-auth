import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setSuccess(false)
        setErrorMassage('')

        //    password validation
        // const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        // if(passwordRegExp.test(password) === false){
        //     setErrorMassage("password must have one lower case, one upper case, one digit and 6 characters longer");
        //     return;
        // }
        if (/[A-Z]/.test(password) === false) {
            setErrorMassage("password must be 1 character upper case");
            return;
        }
        else if (/[a-z]/.test(password) === false) {
            setErrorMassage("password must be 1 character lower case");
            return;
        }
        else if (/\d/.test(password) === false) {
            setErrorMassage("password must be 1 digit");
            return;
        }
        else if (/.{6,}/.test(password) === false) {
            setErrorMassage("password must be 6 character");
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
                        <div className='relative'>
                            <input type={showPassword?"text":"password"}name='password' className="input " placeholder="Password" />
                            <button onClick={()=>setShowPassword(!showPassword)} className='btn btn-xs absolute top-2 right-6'>
                                {showPassword?<FaEyeSlash />:<FaEye/>}</button>
                        </div>

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