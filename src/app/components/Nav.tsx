import { styleText } from "util";
import Style from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={Style.banner}>
      <img
        src="/FitQuickLogo.png"
        alt="FitQuickLogo"
        className={Style.logo}
      ></img>
      <h1 className={Style.title}>FitQuick</h1>
      <div className={Style.loginGroup}>
        <h6 className={Style.loginLink}>CreateUser/Login</h6>
        <img
          src="user-icon.png"
          alt="User Logo"
          className={Style.userIcon}
        ></img>
      </div>
    </div>
  );
}
