import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase.js";
import { toast } from "react-toastify";
import { Button } from "antd";
import {
  GoogleOutlined,
  MailOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createOrUpdateUser } from "../../functions/auth";



const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if(res.data.role === 'admin') {
        history.push('/admin/dashboard')
    } else {
        history.push('/user/history')
    }
}

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
        //history.push('/')
        
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token).then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res)
        //   history.push("/");
        });

        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>

      <br />
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
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
          {!loading ? <h4>Login</h4> : <LoadingOutlined />}

          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
