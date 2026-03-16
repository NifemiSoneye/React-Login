import { Outlet } from "react-router-dom";

import { useState, useEffect } from "react";
import UseRefreshToken from "./hooks/UseRefreshToken";
import UseAuth from "./hooks/UseAuth";
import useLocalStorage from "./hooks/useLocalStorage";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = UseRefreshToken();
  const { auth } = UseAuth();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    console.log(`isLoading : ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);
  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
