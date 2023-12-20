import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { navListLogedIn, navListNotLogedIn } from "../data/navLists";

interface ILocProps {
  btn: string;
  to: string;
  icon: string;
}

const MainMenu = () => {
  const [showMenu, setShownMenu] = useState(false);
  const [menuList, setMenuList] = useState<ILocProps[]>(navListNotLogedIn);

  const triggerMenu = () => {
    if (localStorage.getItem("userAccount")) {
      setMenuList(navListLogedIn);
    }
    setShownMenu((oldState) => !oldState);
  };

  const linkClick = (btn: string) => {
    triggerMenu();
    if (btn === "Deconectare") {
      localStorage.removeItem("userAccount");
      setTimeout(() => setMenuList(navListNotLogedIn), 500);
    }
  };

  const navButtons = useMemo(
    () =>
      menuList.map((item, index) => (
        <li key={index} className="navigation__list__item">
          <Link
            to={item.to}
            className="navigation__link"
            onClick={() => {linkClick(item.btn)}}
          >
            <i className={item.icon} /> {item.btn}
          </Link>
        </li>
      )),
    [menuList],
  );

  return (
    <div className="navigation">
      <div className="navigation__btn" onClick={triggerMenu}>
        <span
          className={`navigation__btn__icon ${
            showMenu ? "navigation__btn__icon--X" : ""
          }`}
        >
          &nbsp;
        </span>
      </div>

      <div
        className={`navigation__background ${
          showMenu ? "navigation__background--open" : ""
        }`}
      />
      <nav className="navigation__menu">
        <ul className="navigation__list">
          {navButtons}
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;
