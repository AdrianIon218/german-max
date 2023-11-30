import { useRef, useReducer, useState } from "react";
import LinkTansition from "../../Common/LinkTransition";
import axios from "axios";
import Notification, { NotificationType } from "../../Common/Notfication";

const reducer = (
  state: { isShown: boolean },
  action: {
    type: "ACCEPTED" | "INVALID_PASS" | "NO_USER" | "SERVER_ERR" | "DEACTIVATE";
  },
) => {
  console.log(state)
  switch (action.type) {
    case "ACCEPTED":
      return {
        isShown: false,
        message: "Te-ai autentificat !",
        notificationType: NotificationType.SUCCESS,
      };
    case "INVALID_PASS":
      return {
        isShown: true,
        message: "Parola este incorectă !",
        notificationType: NotificationType.ERROR,
      };
    case "NO_USER":
      return {
        isShown: true,
        message: "Nu există utilizator cu această adresă de mail !",
        notificationType: NotificationType.NO_TYPE,
      };
    case "SERVER_ERR":
      return {
        isShown: true,
        message: "Eroare de server, încerca-ți mai târziu !",
        notificationType: NotificationType.ERROR,
      };
    default:
      return {
        isShown: false,
        message: "",
        notificationType: NotificationType.NO_TYPE,
      };
  }
};

export default function Login() {
  const [notification, dispatchNotification] = useReducer(reducer, {
    isShown: false,
    message: "",
    notificationType: NotificationType.NO_TYPE,
  });

  const [pageTarget, setPage] = useState("");
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [passNumMistakes, setPassMistakes] = useState(0);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailEntered = email.current!.value;
    const passwordEntered = password.current!.value;

    axios
      .post("http://localhost:5000/login/", {
        email: emailEntered,
        password: passwordEntered,
      })
      .then((response) => {
        const { status } = response.data;
        password.current!.value = "";

        switch (status) {
          case "USER_OK":
            email.current!.value = "";
            const { lastLevel } = response.data;
            localStorage.setItem("userAccount", emailEntered);
            dispatchNotification({ type: "ACCEPTED" });
            setPage(`/course-plan/${lastLevel}`);
            break;

          case "NO_USER":
            dispatchNotification({ type: "NO_USER" });
            break;

          case "PASS_INCORECT":
            setPassMistakes((oldVal) => oldVal + 1);
            dispatchNotification({ type: "INVALID_PASS" });
            break;

          default:
            dispatchNotification({ type: "SERVER_ERR" });
            break;
        }
      })
      .catch(() => {
        dispatchNotification({ type: "SERVER_ERR" });
      });
  }

  return (
    <>
      {pageTarget && (
        <LinkTansition to={pageTarget} transitNow={true}>
          {" "}
        </LinkTansition>
      )}
      {notification.isShown && (
        <Notification
          message={notification.message}
          type={notification.notificationType}
          deleteNotification={() =>
            dispatchNotification({ type: "DEACTIVATE" })
          }
        />
      )}

      <section className="section-gradient section-header u_padding_down--big">
        <div className="flex-row--centered">
          <div className="box-mountain-bg">
            <div className="box-mountain-bg__form">
              <form onSubmit={submit} className="forn">
                <div className="u-margin-bottom-medium u-center-text">
                  <h2 className="heading-secondary">Autentificare</h2>
                  <span className="span-header-block">
                    creeare cont nou &ensp;
                    <span className="span-pointer">
                      <LinkTansition
                        to="/signup"
                        icon="fas fa-id-card"
                      />
                    </span>
                  </span>
                  <span
                    className="span-header-block span-reset-pass"
                    style={{
                      visibility: passNumMistakes > 1 ? "visible" : "hidden",
                    }}
                  >
                    <span className="span-pointer">
                      <LinkTansition
                        to="/password_reset"
                        className="span-reset-pass__link"
                      >
                        resetare parolă
                      </LinkTansition>
                    </span>
                  </span>
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    className="form__input"
                    placeholder="Adresă de email *"
                    id="email"
                    name="email"
                    ref={email}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="form__label form__label__required"
                  >
                    Adresă de email
                  </label>
                </div>

                <div className="form__group u-margin-bottom-intermediate">
                  <input
                    type="password"
                    className="form__input"
                    placeholder="Parolă *"
                    id="password"
                    name="password"
                    ref={password}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="form__label form__label__required"
                  >
                    Parolă
                  </label>
                </div>

                <div className="form__group">
                  <button className="btn btn--white">
                    Intră in cont <i className="fas fa-sign-in-alt"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
