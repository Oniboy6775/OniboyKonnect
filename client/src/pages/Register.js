import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
const initialState = {
  userName: "",
  email: "",
  password: "",
  isMember: true,
  isForgetPassword: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    setupUser,
    forgetPassword,
  } = useAppContext();

  const toggleMember = () => {
    setValues({
      ...values,
      isMember: !values.isMember,
      isForgetPassword: false,
    });
  };
  const toggleForget = () => {
    setValues({
      ...values,
      isForgetPassword: !values.isForgetPassword,
      isMember: true,
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { userName, email, password, isMember, isForgetPassword } = values;
    if (
      !email ||
      (!password && !isForgetPassword) ||
      (!isMember && !userName)
    ) {
      displayAlert();
      return;
    }
    const currentUser = { userName, email, password };
    if (isMember && !isForgetPassword) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else if (isForgetPassword && isMember) {
      forgetPassword(values.email);
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        {values.isForgetPassword ? (
          <h3>Forget password</h3>
        ) : (
          <h3>{values.isMember ? "Login" : "Register"}</h3>
        )}
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            labelText="Username/business name"
            type="text"
            name="userName"
            value={values.userName}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        {!values.isForgetPassword && (
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
        )}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
        {values.isMember && (
          <p>
            {values.isForgetPassword ? "Already a member?" : "Forget password?"}
            <button type="button" className="member-btn" onClick={toggleForget}>
              {values.isForgetPassword ? "Login" : "Click here"}
            </button>
          </p>
        )}
      </form>
    </Wrapper>
  );
};
export default Register;
