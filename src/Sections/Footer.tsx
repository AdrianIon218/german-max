import imgLogo from "/GermanMax-logo.png";
import LinkTansition from "../Common/LinkTransition";
const footerNav = ["Contacte", "Recenzi", "Termeni și condiții", "Sugestii"];

export default function Footer() {
  const footerNavElements = footerNav.map((item, index) => (
    <li className="footer__item" key={index}>
      <LinkTansition
        to={`${item === "Contacte" ? "/contacts" : "#"}`}
        className="footer__link"
      >
        {item}
      </LinkTansition>
    </li>
  ));

  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer__logo-box u-margin-bottom-medium">
          <img src={imgLogo} alt="GermanMax" className="footer__logo" />
        </div>
        <div className="flex-row--centered-no-wrap">
          <div className="flex-element footer__navigation">
            <ul className="footer__list">
              {footerNavElements}
            </ul>
          </div>
          <div className="flex-element">
            <p className="footer__coryright">
              GermanMax este o aplicație destinată persoanelor dornice să-și
              îmbunătățească cunoștiile de limbă germană. Principalul său
              obiectiv fiind acela de a furniza un conținut cât mai util și
              facil utilizatorilor săi. Proiectul a fost creat si publicat de{" "}
              <span className="footer__link-up">
                <a
                  href="https://adrianion218.github.io/My-React-Projects/#/CV"
                  className="footer__link"
                >
                  Ion Adrian Gabriel
                </a>
              </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
