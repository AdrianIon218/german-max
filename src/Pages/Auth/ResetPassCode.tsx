import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountDownTime from "../../Features/CountDownTime";
import Notification, { NotificationType } from "../../Features/Notfication";

function ResetPassCode() {
  const navigate = useNavigate();
  const [emailToReset, setEmailToReset] = useState<string>("");
  const [expireCodeTime, setExpireCodeTime] = useState("");
  const [isCodeExpired, setCodeExpire] = useState(false);
  const [notification, setNotification] = useState({
    isShown: false,
    messsage: "",
    type: NotificationType.NO_TYPE,
  });
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const email = sessionStorage.getItem("emailToReset");
    if (!email) {
      navigate("/password_reset");
      return;
    }

    setEmailToReset(email);
    if (sessionStorage.getItem("allowToResetPass")) {
      navigate("/password_reset/new_password");
    }
  }, []);

  useEffect(() => {
    if (emailToReset) {
      axios
        .post("http://localhost:5000/login/get_code_expire_time", {
          email: emailToReset,
        })
        .then((response) => {
          const { status } = response.data;
          if (status) {
            const { expire_at } = response.data;
            setExpireCodeTime(expire_at);
          } else {
            setCodeExpire(true);
          }
        });
    }
  }, [emailToReset]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (isCodeExpired) {
      navigate("/login");
    } else {
      const enteredCode = codeRef.current!.value;
      axios
        .post("http://localhost:5000/login/verify_code_reset", {
          email: emailToReset,
          enteredCode: enteredCode,
        })
        .then((response) => {
          const { status, isCorrect } = response.data;
          if (isCorrect) {
            sessionStorage.setItem("allowToResetPass", "true");
            navigate("/password_reset/new_password");
          } else {
            if (status) {
              setNotification({
                isShown: true,
                messsage: "Codul este incorect !",
                type: NotificationType.WARNING,
              });
            } else {
              setNotification({
                isShown: true,
                messsage: "Eroare, încercați mai târziu !",
                type: NotificationType.ERROR,
              });
            }
          }
        })
        .catch(() => {
          setNotification({
            isShown: true,
            messsage: "Eroare, încercați mai târziu !",
            type: NotificationType.ERROR,
          });
        });
    }
  };

  return (
    <>
      {notification.isShown && (
        <Notification
          message={notification.messsage}
          type={notification.type}
          deleteNotification={() => {
            setNotification({
              isShown: false,
              messsage: "",
              type: NotificationType.NO_TYPE,
            });
          }}
        />
      )}
      <section className="section-gradient section-header u_padding_down--big">
        <div className="flex-row--centered">
          <div className="box-mountain-bg">
            <div className="box-mountain-bg__form">
              <form className="forn">
                <div className="u-center-text u-margin-bottom-medium">
                  <h2
                    className="heading-secondary"
                    style={{ textTransform: "none" }}
                  >
                    {isCodeExpired
                      ? `Codul trimis la ${emailToReset} a expirat!`
                      : `Introduceți codul trimis la adresa ${emailToReset}`}
                  </h2>
                  <p
                    style={{ fontSize: "1rem", fontWeight: 800 }}
                    hidden={isCodeExpired}
                  >
                    Codul expiră în &nbsp;
                    <CountDownTime
                      time={expireCodeTime}
                      codeExpire={() => setCodeExpire(true)}
                    />
                  </p>
                </div>

                <div
                  className="form__group u-margin-bottom-intermediate"
                  hidden={isCodeExpired}
                >
                  <input
                    type="password"
                    className="form__input u-center-text"
                    placeholder="Cod de resetare"
                    id="password"
                    name="password"
                    minLength={6}
                    maxLength={6}
                    required
                    ref={codeRef}
                  />
                </div>

                <div className="form__group">
                  <button className="btn btn--white" onClick={onSubmit}>
                    {isCodeExpired
                      ? "Înapoi la autentificare"
                      : "Verifică codul"}
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

export default ResetPassCode;
