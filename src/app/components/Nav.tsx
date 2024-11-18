import Style from "./Nav.module.css";
import Link from "next/link";

type NavProps = {
  username?: string | null;
  url: string;
};

export default function Nav({ username, url }: NavProps) {
  return (
    <div className={Style.banner}>
      <img
        src="/FitQuickLogo.png"
        alt="FitQuickLogo"
        className={Style.logo}
      ></img>
      <Link href="/" className={Style.title}>
        {username ? `Welcome, ${username}!` : "FitQuick"}
      </Link>
      <div className={Style.loginGroup}>
        <Link href={url} className={Style.loginLink}>
          {url === "/" ? "LogOut" : "Sign-Up/LogIn"}
        </Link>
        <img
          src="/user-icon.png"
          alt="User Logo"
          className={Style.userIcon}
        ></img>
      </div>
    </div>
  );
}
