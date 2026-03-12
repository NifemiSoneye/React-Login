import axios from "../API/axios";
import UseAuth from "./UseAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logOut = async () => {
    setAuth({});
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logOut;
};

export default useLogout;
