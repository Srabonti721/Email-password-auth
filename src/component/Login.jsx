import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../firebase/firebase.init';

const Login = () => {
    const [errorMassage, setErrorMassage] = useState('');
    const [success, setSuccess] = useState(false)
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setErrorMassage('');
        setSuccess(false);
        
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)
            })
            .catch(error => {
                console.log(error.massage);
                setErrorMassage(error.message)
            })

    }
    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-8">
            <div className="card-body">
                <form onSubmit={handleLogin} className="fieldset">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <label className="label">Email</label>
                    <input name='email' type="email" className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input name="password" type="password" className="input" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>New to this website? Please <Link className='text-blue-600 underline text-sm' to='/signIn'>Sign up</Link></p>
                </form>
                {
                    errorMassage && <p className='text-red-600'>{errorMassage}</p>
                }
                {
                    success && <p className='text-green-600'>user login successfully</p>
                }
            </div>
        </div>
    );
};

export default Login;