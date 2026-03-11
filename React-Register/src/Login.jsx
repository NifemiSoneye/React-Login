import { useState, useEffect, useRef } from "react";
import axios from "./API/axios";
import UseAuth from "./hooks/UseAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "./auth";

const Login = () => {
  const { setAuth } = UseAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
      console.log(response);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus;
    }
    /* console.log(user, pwd); */
  };

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="
        username"
        >
          Username :
        </label>

        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label
          htmlFor="
        password"
        >
          Password :
        </label>

        <input
          type="password"
          id="password"
          ref={userRef}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an account ? <br />
        <span className="line">
          {/* put router link here */}
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
