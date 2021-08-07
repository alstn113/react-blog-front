import Header from "../../components/common/Header";
import { connect } from "react-redux";
import { logout } from "../../modules/user";

const HeaderContainer = ({ user, logout }) => {
  return <Header user={user} onLogout={logout} />;
};

export default connect(
  ({ user }) => ({
    user: user.user,
  }),
  {
    logout,
  }
)(HeaderContainer);
