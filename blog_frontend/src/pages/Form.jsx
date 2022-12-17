import { useState } from "react";

const Form = () => {
  // To switch between login and register Form
  const [selectedTab, SetselectedTab] = useState(1);

  // Login Form inputs
  const [loginFormData, setloginFormData] = useState({
    loginMethod: "",
    password: "",
  });
  const { loginMethod, password } = loginFormData;
  // Register Form inputs
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    Rpassword: "",
    Rpassword2: "",
  });
  const { username, email, Rpassword, Rpassword2 } = registerFormData;

  const handleSwitch = (tab) => {
    if (tab === 1 && selectedTab !== 1) {
      SetselectedTab(1);
    }
    if (tab === 2 && selectedTab !== 2) {
      SetselectedTab(2);
    }
  };
  // Login handler
  const onLoginSubmit = () => {};
  // Register handler
  const onRegisterSubmit = () => {};

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
                onChange={() => {}}
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
                onChange={() => {}}
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
                onChange={() => {}}
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
                onChange={() => {}}
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-input">
              <input
                id="password"
                name="password"
                value={Rpassword}
                placeholder="Password"
                onChange={() => {}}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-input">
              <input
                id="password"
                name="password"
                value={Rpassword2}
                placeholder="Confrim Password"
                onChange={() => {}}
                type="password"
                className="form-control"
              />
            </div>
            <div className="form-button">
              <button type="submit">Log in</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
