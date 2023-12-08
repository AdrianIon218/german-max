import { useRef, useState } from "react";
import LinkTansition from "../../Common/LinkTransition";
import axios from "axios";
import { NotificationType } from "../../Common/Notfication";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../SliceReducers/NotificationSlice";
import { hideLoading, showLoading } from "../../SliceReducers/LoadingSlice";
import { RootState } from "../../SliceReducers/store";
import { startTransition } from "../../SliceReducers/TransitionSlice";
import Password, { PassRef } from "../../Common/Password";

export default function Login() {
  const [passwordUsed, setPasswordUsed] = useState("");
  const [emailUsed, setEmailUsed] = useState("");
  const [passNumMistakes, setPassMistakes] = useState(0);
  const passDisplay = useRef<PassRef>(null);

  const dispatch = useDispatch();
  const isNotificationShwon = useSelector((store:RootState) => store.notification.isShown);
  const isLoadingSignShown = useSelector((store:RootState) => store.loading.isLoading);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(showLoading());

    axios
      .post("http://localhost:5000/login/", {
        email: emailUsed,
        password: passwordUsed,
      })
      .then((response) => {
        const { status } = response.data;
        dispatch(hideLoading());
        setPasswordUsed("");
        passDisplay.current!.deactivateShowPass();

        switch (status) {
          case "USER_OK":
            setEmailUsed("");
            const { lastLevel } = response.data;
            localStorage.setItem("userAccount", emailUsed);
            dispatch(startTransition(`/course-plan/${lastLevel}`));
            break;

          case "NO_USER":
            dispatch(showNotification("Nu există utilizator cu această adresă de mail !", NotificationType.ERROR))
            break;

          case "PASS_INCORECT":
            setPassMistakes((oldVal) => oldVal + 1);
            dispatch(showNotification("Parola este incorectă !", NotificationType.ERROR))
            break;
            
          default:
            dispatch(showNotification("Eroare de server, încerca-ți mai târziu !", NotificationType.ERROR))
            break;
        }
      })
      .catch(() => {
        dispatch(hideLoading());
        dispatch(showNotification("Eroare de server, încerca-ți mai târziu !", NotificationType.ERROR))
      });
  }

  return (
    <>
      <section className="section-gradient section-header u_padding_down--big">
        <div className="flex-row--centered">
          <div className="box-mountain-bg">
            <div className="box-mountain-bg__form">
              <form onSubmit={submit} className="forn">
                <div className="u-margin-bottom-medium u-center-text">
                  <h2 className="heading-secondary">Autentificare</h2>
                  <span className="span-header-block">
                    nu ai cont ?&ensp;
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
                  <input type="email" id="email" name="email" required
                    className="form__input" placeholder="Adresă de email *"
                    value={emailUsed}
                    onChange={(input)=>setEmailUsed(input.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="form__label form__label__required"
                  >
                    Adresă de email
                  </label>
                </div>
                <Password password={passwordUsed} onChange={(str:string)=>setPasswordUsed(str)} ref={passDisplay} />
                <div className="form__group">
                  <button className="btn btn--white" disabled={isLoadingSignShown || isNotificationShwon}>
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
