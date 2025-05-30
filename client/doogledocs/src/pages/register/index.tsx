import { useContext, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize"
import { Link, useNavigate } from "react-router";
import validator from 'validator';
import AuthService from "../../services/auth-service";
import { ToastContext } from "../../contexts/toast-context";
import axios, { AxiosError } from "axios";
import TextField from "../../components/atoms/text-field";
import { FaSpinner } from "react-icons/fa";
import Logo from "../../components/atoms/logo";

const Register = () => {
  const {widthStr, heightStr} = useWindowSize();
  const [email, setEmail] = useState<string>('');
  const [emailErrors, setEmailErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [password1, setPassword1] = useState<string>('');
  const [password1Errors, setPassword1Errors] = useState<Array<string>>([]);
  const [password2, setPassword2] = useState<string>('');
  const [password2Errors, setPassword2Errors] = useState<Array<string>>([]);
  const {addToast, error} = useContext(ToastContext);

  const navigate = useNavigate();

  const validate = () => {
    setEmailErrors([]);
    setPassword1Errors([]);
    setPassword2Errors([]);
    let isValid = true;

    if(!validator.isEmail(email)) {
      setEmailErrors(['Must enter a valid email']);
      isValid = false;
    }
    if(!(password1.length >= 8 && password1.length <= 25)) {
      setPassword1Errors((prev) => [...prev, "Password must be between 1 and 25 characters"]);
      isValid = false;
    }
    if(!/\d/.test(password1)) {
      setPassword1Errors((prev) => [...prev, 'Password 1 must contain atleast 1 number']);
      isValid = false;
    }
    if(password1 !== password2) {
      setPassword2Errors((prev) => [...prev, 'Passwords do not match']);
      isValid = false;
    }
    return isValid;
  };

  const register = async() => {
    if(!validate()) return ;
    try {
      setLoading(true);
      console.log(email, password1, password2);
      await AuthService.register({
        email, password1, password2
      });
      addToast({
        title: 'Successfully registered email',
        body: "Please check your inbox to verify your email address",
        color: 'success'
      })
      navigate(`/login`);
    } catch (err) {
      if(axios.isAxiosError(err)) {
        const {response} = err as AxiosError;
        const errors = (response as any).data.errors;
        const emailFieldErrors = errors.filter((error: any) => error.param === 'email').map((error: any) => error.msg);
        const password1FieldError = errors.filter((error: any) => error.param === 'password1').map((error: any) => error.msg);
        const password2FieldError = errors.filter((error: any) => error.param === 'password2').map((error: any) => error.msg);
        
        if(emailFieldErrors)  setEmailErrors(emailFieldErrors);
        if(password1FieldError) setPassword1Errors(password1Errors);
        if(password2FieldError) setPassword2Errors(password2Errors);

        if(!emailFieldErrors && !password1FieldError && !password2FieldError) {
          error('An unknown error has occured. Please try again.')
        }
      } else {
        error('An unknown error has occured. Please try again.')
      }
    } finally {
      setLoading(false);
    }
  }

  const handleOnKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === "Enter") register();
  };

  const handleOnInputEmail = (value: string) => {
    setEmailErrors([]);
    setEmail(value);
  }
  const handleInputPassword1 = (value: string) => {
    setPassword1Errors([]);
    setPassword1(value);
  }
  const handleInputPassword2 = (value: string) => {
    setPassword2Errors([]);
    setPassword2(value);
  }

  return (
    <div
      onKeyDown={handleOnKeyPress}
      className="w-full flex flex-col sm:justify-center items-center p-6 sm:pb-9 bg-gray-100 dark:bg-slate-900"
      style={{width: widthStr, height: heightStr}}
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 shadow-md dark:border-0 dark:shadow-xl p-6">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <Logo />
            <h1 className="font-medium text-2xl">Sign up</h1>
            <p className="font-medium">for a Docs account</p>
          </div>
          <TextField
            value={email}
            onInputChange={handleOnInputEmail}
            label="Email"
            color="secondary"
            errors={emailErrors}
          />
          <TextField
            value={password1}
            onInputChange={handleInputPassword1}
            label="Password"
            color="secondary"
            type="password"
            errors={password1Errors}
          />
          <TextField
            value={password2}
            onInputChange={handleInputPassword2}
            label="Confirm Password"
            color="secondary"
            type="password"
            errors={password2Errors}
          />
          <Link
            to={'/login'}
            className="text-sm hover:underline font-semibold text-blue-500 text-left"
          >
            Sign In instead
          </Link>
          <button
            onClick={register}
            className="bg-blue-600 rounded text-white text-sm font-medium px-3 py-2 hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            {!loading && <span className={``}>Register</span>}
            {loading && <FaSpinner className={`w-4 h-4 animate-spin`} />}
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-sm p-4">
        <button className="hover:underline font-semibold text-blue-500">
          Terms
        </button>
        <button className="hover:underline font-semibold text-blue-500">
          Privacy Policy
        </button>
      </div>
    </div>
  )
}

export default Register;