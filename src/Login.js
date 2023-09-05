import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const[{}, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    };

  return (
    <div className='login'>
        <div className='login__container'>
            <img 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904'
                alt='WhatsApp Logo'
            />

            <div className='login__text'>
                <h1>Sign in to WhatsaApp</h1>
            </div>
            
            <Button onClick={signIn}>Sign In with Google</Button>
        </div>
    </div>
  )
}

export default Login