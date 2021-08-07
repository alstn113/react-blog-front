import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { changeField, initializeForm, register } from "../../modules/auth";
import { check } from "../../modules/user";
const RegisterFormContainer = ({ form, auth, authError, user, changeField, initializeForm, register, check }) => {
  const history = useHistory();
  const [error, setError] = useState(null);

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
    if ([username, password, passwordConfirm].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    if (password !== passwordConfirm) {
      console.log("안맞음");
      setError("비밀번호가 일치하지 않습니다");
      changeField({ form: "register", key: "password", value: "" });
      changeField({ form: "register", key: "passwordConfirm", value: "" });
      return;
    }
    register({ username, password });
  };

  useEffect(() => {
    initializeForm("register");
  }, [initializeForm]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정명입니다");
        return;
      }
      console.log("오류 발생");
      console.log(authError);
      setError("회원가입 실패");
      return;
    }
    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
      check();
    }
  }, [auth, authError, check]);

  useEffect(() => {
    if (user) {
      console.log("check API 성공");
      console.log(user);
      history.push("/");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.log("localStorage is not working");
      }
    }
  }, [history, user]);
  return <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />;
};

export default connect(
  ({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }),
  {
    changeField,
    initializeForm,
    register,
    check,
  }
)(RegisterFormContainer);
