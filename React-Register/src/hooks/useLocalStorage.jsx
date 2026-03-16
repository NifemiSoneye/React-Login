import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  //SSR Next.js
  if (typeof window === "undefined") return initValue;

  // if a value is already stored

  const storedValue = localStorage.getItem(key); // returns null if not found
  if (storedValue !== null) {
    try {
      return JSON.parse(storedValue);
    } catch {
      return initValue;
    }
  }

  //return result of a function;

  if (initValue instanceof Function) return initValue();
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
