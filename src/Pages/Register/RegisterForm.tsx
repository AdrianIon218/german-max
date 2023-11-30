import { useState, useRef } from "react";
import RadioButton from "../../Common/RadioButton";
import LinkTansition from "../../Common/LinkTransition";
import axios from "axios";
import Notification, { NotificationType } from "../../Common/Notfication";

enum KnowlegdeLevel {
  BEGGINER,
  INTERMEDIATE,
  ADVANCED,
}

export default function RegisterForm({
  location,
}: {
  location: "home" | "register";
}) {
  const [level, setLevel] = useState(KnowlegdeLevel.BEGGINER);
  const [warningNotification, setNotification] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [pageTarget, setPage] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailEntered = emailRef.current!.value;
    const currentLevel =
      level === KnowlegdeLevel.ADVANCED
        ? "C1"
        : level === KnowlegdeLevel.BEGGINER
        ? "A1"
        : "B1";
    axios
      .post("http://localhost:5000/signup/checkEmail", { email: emailEntered })
      .then((response) => {
        const { isEmailAvailable } = response.data;

        if (isEmailAvailable) {
          const username = usernameRef.current!.value;
          const password = passRef.current!.value;

          return axios.post("http://localhost:5000/signup/addNewUser", {
            email: emailEntered,
            name: username,
            password: password,
            level: currentLevel,
          });
        } else {
          setNotification(true);
        }
      })
      .then((resAddUser) => {
        if (resAddUser?.data.isUserAdded) {
          localStorage.setItem("userAccount", emailEntered);
          setPage(`/course-plan/${currentLevel}`);
        }
      });
  }

  function togglePassVisibility() {
    if (passRef.current!.type === "password") {
      passRef.current!.type = "text";
    } else {
      passRef.current!.type = "password";
    }
  }

  return (
    <>
      {warningNotification && (
        <Notification
          message="Adresa de mail este deja folosită !"
          type={NotificationType.WARNING}
          deleteNotification={() => setNotification(false)}
        />
      )}
      {pageTarget && (
        <LinkTansition to={pageTarget} transitNow={true}>
          {" "}
        </LinkTansition>
      )}
      <section
        className={
          location === "home"
            ? "section-sign-up section-between u_padding_down--med"
            : "section-header u_padding_down--big section-gradient"
        }
      >
        <div className="flex-row--centered">
          <div className="box-mountain-bg">
            <div className="box-mountain-bg__form">
              <form onSubmit={submit} className="forn">
                <div className="u-margin-bottom-medium u-center-text">
                  <h2 className="heading-secondary">Creare cont</h2>
                  <span className="span-header-block">
                    ai cont deja ? &ensp;
                    <span className="span-pointer">
                      <LinkTansition
                        to="/login"
                        icon="fas fa-sign-in-alt"
                      />
                    </span>
                  </span>
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    className="form__input"
                    placeholder="Nume complet *"
                    id="name"
                    ref={usernameRef}
                    required
                  />
                  <label
                    htmlFor="name"
                    className="form__label form__label__required"
                  >
                    Nume complet
                  </label>
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    className="form__input"
                    placeholder="Adresă de email *"
                    id="email"
                    ref={emailRef}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="form__label form__label__required"
                  >
                    Adresă de email
                  </label>
                </div>

                <div className="form__group">
                  <input
                    type="password"
                    minLength={6}
                    maxLength={50}
                    className="form__input"
                    placeholder="Parolă de minim 6 caractere *"
                    id="password"
                    ref={passRef}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="form__label form__label__required"
                  >
                    Parolă
                  </label>

                  <div className="form__group form__group__checkbox">
                    <label htmlFor="pass_toggle" className="form__label">
                      Arată parola
                    </label>
                    <input
                      type="checkbox"
                      className="form__checkbox"
                      onClick={togglePassVisibility}
                      name="pass_toggle"
                      id="pass_toggle"
                    />
                  </div>
                </div>

                <div className="form__group u-margin-bottom-intermediate">
                  <h3 className="form__sub-heading">
                    Care este nivelul tău de germană ?
                  </h3>
                  <RadioButton
                    id="beginner"
                    name="level"
                    value={KnowlegdeLevel.BEGGINER}
                    change={() => setLevel(KnowlegdeLevel.BEGGINER)}
                    label="Începător  (A1-A2)"
                    validate={() => level === KnowlegdeLevel.BEGGINER}
                  />

                  <RadioButton
                    id="intermediate"
                    name="level"
                    value={KnowlegdeLevel.INTERMEDIATE}
                    change={() => setLevel(KnowlegdeLevel.INTERMEDIATE)}
                    label="Intermediar  (B1-B2)"
                    validate={() => level === KnowlegdeLevel.INTERMEDIATE}
                  />

                  <RadioButton
                    id="advanced"
                    name="level"
                    value={KnowlegdeLevel.ADVANCED}
                    change={() => setLevel(KnowlegdeLevel.ADVANCED)}
                    label="Avansat  (C1-C2)"
                    validate={() => level === KnowlegdeLevel.ADVANCED}
                  />
                </div>

                <div className="form__group">
                  <button className="btn btn--white">
                    Continuă <i className="fas fa-angle-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
}
