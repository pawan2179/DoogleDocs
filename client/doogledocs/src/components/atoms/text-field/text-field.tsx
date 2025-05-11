import { useEffect, useRef, useState, type JSX } from "react";
import type { InputProps } from "../../../types/interfaces/input";
import InputMask from 'inputmask';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import Errors from "../errors";

interface TextFieldProps extends InputProps {
  value?: string | number;
  onInputChange?: Function,
  type?: 'text' | 'password' | 'textarea',
  mask?: string,
  icon?: JSX.Element,
  color?: "primary" | "secondary"
}

const TEXT_FIELD_CLASSES = {
  primary: "bg-white dark:bg-slate-800",
  secondary: "bg-slate-50 dark:bg-slate-700"
}

const TextField = ({
  value,
  onInputChange = () => alert('onInput change registered'),
  type='text',
  label,
  placeholder,
  errors=[],
  mask,
  icon,
  color='primary'
}: TextFieldProps) => {
  const textFieldRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if(textFieldRef != null && textFieldRef.current && mask) {
      const inputMask = new InputMask(mask);
      inputMask.mask(textFieldRef.current);
    }
  }, [mask])

  return (
    <div className="w-full text-sm relative space-y-1">
      {label && <label htmlFor="">{label}</label>}
      <div className={`${errors.length ? 'ring-1 ring-red-500' : isFocused ? 'ring-1 ring-blue-600' : ''}
        ${
        TEXT_FIELD_CLASSES[color]
        } w-full shadow-sm rounded flex justify-center items-center`}>
          {type !== 'textarea' ? (
            <div className='w-full flex justify-between items-center'>
              <input 
                ref={textFieldRef}
                type={type !== 'password' ? type: showPassword ? 'text' : type}
                onInput={(e) => onInputChange((e.target as HTMLTextAreaElement).value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value}
                className={`${TEXT_FIELD_CLASSES[color]} w-full p-2 rounded border-none outline-none`}
                placeholder={placeholder && placeholder}
                />
                  {type === 'password' && (
                    <button tabIndex={-1} onClick={() => setShowPassword(!showPassword)} className="h-full justify-center p-2 items-center text-slate-400 border-none outline-none">
                      {showPassword ? (
                        <FaEyeSlash className='w-4 h-4' />
                      ): (
                        <FaEye className='h-4 w-4' />
                      )}
                    </button>
                  )}
            </div>
          ) : (
            <textarea 
              ref={textFieldRef}
              onInput={(e) => onInputChange((e.target as HTMLTextAreaElement).value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder && placeholder}
              value={value}
              className="w-full p-2 bg-white dark:bg-slate-800 rounded"
            />
          )}
          {errors.length ? (
            <div className="pr-2 text-red-500">
              <BsExclamationCircle className="w-4 h-4" />
            </div>
          ): null}
      </div>
      <Errors errors={errors} />
    </div>
  )
}

export default TextField;