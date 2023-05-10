import logo from "/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUserCircle, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AdModal from "./AdModal";
import Portal from "./Portal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header>
        {/* <div className="enterance">
        <span>ورود</span>
        <span> / </span>
        <span>ثبت نام</span>
        <span>
          <FontAwesomeIcon icon={faUserCircle} />
        </span>
      </div> */}
        <div className="loged-in-user-options">
          <button onClick={handleModalClick}>ثبت آگهی</button>
          <span>خروج</span>
        </div>
        <div className="logo">
          <img src={logo} alt="logo" width={60} height={45} />
        </div>
        <span className="change-theme">
          <FontAwesomeIcon icon={faMoon} />
          {/* <FontAwesomeIcon icon={faSun} /> */}
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

/*
change logo image
continue header and so on...
*/
