import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { changeField, initializeForm, login } from "../../modules/auth";
import { check } from "../../modules/user";

const LoginFormContainer = ({ form, auth, authError, user, changeField, initializeForm, login, check }) => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const onChange = (e) => {
    const { value, name } = e.target;
    changeField({
      form: "login",
      key: name,
      value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    login({ username, password });
  };
  useEffect(() => {
    initializeForm("login");
  }, [initializeForm]);

  useEffect(() => {
    if (authError) {
      console.log("오류발생");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      check();
    }
  }, [auth, authError, check]);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log("localStorage is not working");
      }
      history.push("/");
    }
  }, [history, user]);

  return <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />;
};

export default connect(
  ({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }),
  {
    changeField,
    initializeForm,
    login,
    check,
  }
)(LoginFormContainer);
