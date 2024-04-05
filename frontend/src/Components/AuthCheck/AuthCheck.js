import Cookies from "js-cookie";

const AuthCheck = ({ Component }) => {
  return (props) => {
    const authCheck = Cookies.get("type");
    const authToken = Cookies.get("token");
    const isCheck = authCheck === "admin" ? true : false;
    return <Component auth={isCheck} authToken={authToken} {...props} />;
  };
};

export default AuthCheck;
