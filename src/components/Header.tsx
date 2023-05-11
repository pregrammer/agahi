import logo from "/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUserCircle, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AdModal from "./AdModal";
import Portal from "./Portal";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";
import Swal from "sweetalert2";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    const getTheme = localStorage.getItem("theme");
    if (getTheme === "dark") {
      document.body.classList.add("dark-mode");
      return "dark";
    }
    return "light";
  });

  const handleTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark-mode");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark-mode");
      setTheme("light");
    }
  };

  const handleModalClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    setUserInfo(null);
    navigate("/");
    Swal.fire(
      "!خارج شدید",
      "شما با موفقیت از حساب کاربری تان خارج شدید",
      "success"
    );
  };

  return (
    <>
      <header>
        {userInfo ? (
          <div className="loged-in-user-options">
            <button onClick={handleModalClick}>ثبت آگهی</button>
            <span onClick={handleLogOut}>خروج</span>
          </div>
        ) : (
          <div className="enterance">
            <Link to={"login"}>ورود</Link>
            <span> / </span>
            <Link to={"register"}>ثبت نام</Link>
            <span>
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
          </div>
        )}
        <div className="logo">
          <img src={logo} alt="logo" width={60} height={45} />
        </div>
        <span className="change-theme" title="تغییر تم" onClick={handleTheme}>
          {theme === "light" ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </span>
      </header>
      {isOpen && (
        <Portal>
          <AdModal closeModal={handleModalClick} />
        </Portal>
      )}
    </>
  );
};

export default Header;
