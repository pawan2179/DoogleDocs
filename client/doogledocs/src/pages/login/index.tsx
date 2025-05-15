import React, { useContext, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import TextField from '../../components/atoms/text-field';
import { FaSpinner } from 'react-icons/fa';
import validator from 'validator';
import AuthService from '../../services/auth-service';
import useAuth from '../../hooks/useAuth';
import { ToastContext } from '../../contexts/toast-context';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/atoms/logo';

const Login = () => {
  const {widthStr, heightStr} = useWindowSize();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailErrors, setEmailErrors] = useState<Array<string>>([]);
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const {success, error} = useContext(ToastContext);
  const navigate = useNavigate();

  const validate = () => {
    setEmailErrors([]);
    setPasswordErrors([]);
    let isValid = true;

    if(!validator.isEmail(email)) {
      setEmailErrors(['Must enter a valid email']);
      isValid = false;
    }
    if(!password.length) {
      setPasswordErrors(['Must enter a valid password']);
      isValid = false;
    }
    return isValid;
  };
  const handleEmailInput = (value: string) => {
    setEmailErrors([]);
    setEmail(value);
  }

  const handlePasswordInput = (value: string) => {
    setPasswordErrors([]);
    setPassword(value);
  }

  const loginUser = async() => {
    if(!validate()) return ;
    setLoading(true);
    try {
      const response = await AuthService.login({email, password});
      const {accessToken: newAccessToken, refreshToken: newRefreshToken} = response.data;
      login(newAccessToken, newRefreshToken);
      success("Logged in successfully");
      navigate('/document/create');

    } catch (err) {
      error('Incorrect user name or password.')
    } finally {
      setLoading(false);
    }
  }

  const handleOnKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === "Enter") loginUser();
  };
  return (
    <div className='w-full flex flex-col sm:justify-center items-center p-6 sm:pb-96 bg-gray-100 dark:bg-slate-900 text-primary'
      style={{width: widthStr, height: heightStr}}
      onKeyDown={handleOnKeyPress}
    >
      <div className='w-full max-w-sm bg-white dark:bg-slate-800 rounded shadow-md dark:border-0 dark:shadow-xl p-6'>
        <div className='flex flex-col space-y-4'>
          <div className='w-full text-center flex flex-col justify-center items-center'>
            <Logo />
            <h1 className='font-medium text-2xl'>Sign In</h1>
            <p className='font-medium'>to continue to docs</p>
          </div>
          <TextField
            value={email}
            onInputChange={handleEmailInput}
            label='Email'
            color='secondary'
            errors={emailErrors}
          />
          <Link to={'/register'}>
            <p className='text-sm hover:underline font-semibold text-blue-500 text-left'>
            Need an account?
            </p>
          </Link>
          <TextField
            value={password}
            onInputChange={handlePasswordInput}
            label='Password'
            type='password'
            color='secondary'
            errors={passwordErrors}
          />
          <button
            tabIndex={-1}
            className='text-sm hover:underline font-semibold text-blue-500 text-left'
          >
            Forgot Password?
          </button>
          <button
            onClick={loginUser}
            disabled={loading}
            className='bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1'
          >
            {!loading && <span className=''>Login</span>}
            {loading && <FaSpinner className='w-4 h-4 animate-spin' />}
          </button>
        </div>
      </div>
      <div className='flex justify-center space-x-4 text-sm p-4'>
        <button className='hover:underline font-semibold text-blue-500'>
          Terms
        </button>
        <button className='hover:underline font-semibold text-blue-500'>
          Privacy Policy
        </button>
      </div>
    </div>
  )
}

export default Login