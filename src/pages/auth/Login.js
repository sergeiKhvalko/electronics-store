import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleAuthProvider } from "../../firebase";
import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      history("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });

        history("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form className="mb-0" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />

      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4 className="text-danger">Login...</h4> : <h4>Login</h4>}
          {loginForm()}

          <Button
            className="mb-2"
            onClick={googleLogin}
            type="danger"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="text-danger float-right">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
