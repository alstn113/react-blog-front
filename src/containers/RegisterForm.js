import { connect } from "react-redux";
import { changeField, initializeForm, register } from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";
import { useEffect } from "react";

const RegisterFormContainer = ({ form, auth, authError, changeField, initializeForm, register }) => {
  const onChange = (e) => {
    const { value, name } = e.target;
    changeField({
      form: "register",
      key: name,
      value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      console.log("안맞음");
      return;
    }
    register({ username, password });
  };

  useEffect(() => {
    initializeForm("register");
  }, [initializeForm]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      return;
    }
    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
    }
  }, [auth, authError]);

  return <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default connect(
  ({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.Error,
  }),
  {
    changeField,
    initializeForm,
    register,
  }
)(RegisterFormContainer);
