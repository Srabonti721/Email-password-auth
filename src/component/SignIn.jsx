import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import { log } from 'firebase/firestore/lite/pipelines';

const SignIn = () => {
    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const handleSignIn = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, password, terms, name, photo);

        setSuccess(false)
        setErrorMassage('')
        if (!terms) {
            setErrorMassage("please accept our terms and condition");
            return
        }
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
                
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                   setSuccess(true);
                   alert("we sent a you a verification email please check your email")
                })
                            // update user photo
            const profile = {
                displayName : name,
                photoURL : photo
            }
            updateProfile(auth.currentUser,profile)
            .then(()=>{
                console.log("USER PROFILE UPDATE");
            })
            .catch((error)=>console.log(error))
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
                    <form className="fieldset" onSubmit={handleSignIn}>
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="NAME" />
                        <label className="label">Photo URL</label>
                        <input type="text" name='photo' className="input" placeholder="Photo URL" />
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input type={showPassword ? "text" : "password"} name='password' className="input " placeholder="Password" />
                            <button onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute top-2 right-6'>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                        </div>

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <label className="label">
                            <input name='terms' type="checkbox" className='checkbox' />
                            Accept terms and condition <Link className='text-blue-700 text-sm underline' to={'/login'}>Login</Link>
                        </label>
                        <button className="btn btn-neutral mt-4">Sign In</button>
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

export default SignIn;