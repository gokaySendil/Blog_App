import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset, login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
const Form = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // To switch between login and register Form
  const [selectedTab, SetselectedTab] = useState(1);
  const handleSwitch = (tab) => {
    if (tab === 1 && selectedTab !== 1) {
      SetselectedTab(1);
    }
    if (tab === 2 && selectedTab !== 2) {
      SetselectedTab(2);
    }
  };


  // Register Form inputs
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    Rpassword: "",
    Rpassword2: "",
  });
  const { username, email, Rpassword, Rpassword2 } = registerFormData;



  const onChangeRegister = (e) => {
    setRegisterFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // Register redux variables
  const { user, loading, error, success, message } = useSelector(
    (state) => state.auth
  );

  // Register handler
  const onRegisterSubmit = () => {
    //Create userData
    const newUser = {
      username: username,
      email: email,
      password: Rpassword,
    };
    // dispatch register action
    dispatch(register(newUser))
  };
  // Login Form inputs
  const [loginFormData, setloginFormData] = useState({
    loginMethod: "",
    password: "",
  });
  const { loginMethod, password } = loginFormData;

  // Login handler
  const onLoginSubmit = () => {
    // User temp data
    const u_login = {
      loginMethod,
      password,
    }
    // dispacth login action
    dispatch(login(u_login));

  };



  useEffect(() => {
    if (selectedTab === 2) {
      if (success|| user) {
        toast.success("User Created")
        console.log(user)
        setRegisterFormData({
          username: "",
          email: "",
          Rpassword: "",
          Rpassword2: "",
        })
        nav("/main");
      }
      if (error) {
        toast.error(message);
      }
    }
    else if(selectedTab===1){
      if(success|| user){
        toast.success(`Logged in`)
        setloginFormData({
          loginMethod:"",
          password:""
        })
        nav("/main")
      }
      if(error){
        toast.error(message);
      }
      
    }
    dispatch(reset())
  }, [user, error, success, message,dispatch])

  return (
    <div>
      <div className="form-nav">
        <ul>
          <li>
            <button onClick={() => handleSwitch(1)}>Login</button>
          </li>
          <li>
            <button onClick={() => handleSwitch(2)}>Register</button>
          </li>
        </ul>
      </div>
      {selectedTab === 1 ? (
        <div>
          <h3 className="form-title">Sign In</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLoginSubmit();
            }}
            className="login-form"
          >
            <div className="form-input">
              <input
                id="loginMethod"
                name="loginMethod"
                value={loginMethod}
                placeholder="Username or Email"
                onChange={() => { }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-input">
              <input
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={() => { }}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-button">
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h3 className="form-title">Sign Up</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onRegisterSubmit();
            }}
            className="login-form"
          >
            <div className="form-input">
              <input
                id="username"
                name="username"
                value={username}
                placeholder="Username"
                onChange={onChangeRegister}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-input">
              <input
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChangeRegister}
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-input">
              <input
                id="Rpassword"
                name="Rpassword"
                value={Rpassword}
                placeholder="Password"
                onChange={onChangeRegister}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-input">
              <input
                id="Rpassword2"
                name="Rpassword2"
                value={Rpassword2}
                placeholder="Confrim Password"
                onChange={onChangeRegister}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-button">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
