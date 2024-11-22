import Style from "./Nav.module.css";
import Link from "next/link";

type NavProps = {
  username?: string | null;
  url1: string;
  url2: string;
};

export default function Nav({ username, url1, url2 }: NavProps) {
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
        {url1 === "/" || url2 == "/" ? (
          <Link href="/" className={Style.signUpLink}>
            Log-out
          </Link>
        ) : (
          <>
            <Link href={url1} className={Style.signUpLink}>
              Sign-up
            </Link>
            <Link href={url2} className={Style.loginLink}>
              Login
            </Link>
          </>
        )}
        <img
          src="/user-icon.png"
          alt="User Logo"
          className={Style.userIcon}
        ></img>
      </div>
    </div>
  );
}
