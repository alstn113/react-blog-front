import { connect } from "react-redux";
import { changeField, initializeForm } from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";
import { useEffect } from "react";

const LoginFormContainer = ({ form, changeField, initializeForm }) => {
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
  };
  useEffect(() => {
    initializeForm("login");
  }, [initializeForm]);
  return <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default connect(
  ({ auth }) => ({
    form: auth.login,
  }),
  {
    changeField,
    initializeForm,
  }
)(LoginFormContainer);
