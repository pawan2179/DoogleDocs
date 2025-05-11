import { useState } from "react"

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [string, typeof setValue] => {
  const [storeValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item): initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      const valueToStore = value instanceof Function ? value(storeValue): value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore)); 
    } catch (error) {
      
    }
  }
  return [storeValue, setValue];
}

export default useLocalStorage;