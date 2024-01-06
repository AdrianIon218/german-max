import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPass() {
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const [disableForm, setDisableForm] = useState(false);

  const serverError = () => {
    setDisableForm(false);
    /*
    setNotification({
      isShown: true,
      message: "Eroare de server ! Încercați mai târziu!",
      type: NotificationType.ERROR,
    });*/
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!disableForm) {
      const emailEntered = emailRef.current!.value;
      setDisableForm(true);

      axios
        .post("http://localhost:5000/login/", {
          email: emailEntered,
          password: "",
        })
        .then((response) => {
          const { status } = response.data;
          if (status === "NO_USER") {
            setDisableForm(false);
            /*
            setNotification({
              isShown: true,
              message: "Nu există utilizator cu această adresă!",
              type: NotificationType.WARNING,
            });
            */
          } else if (status === "PASS_INCORECT") {
            axios
              .post("http://localhost:5000/login/reset_pass", {
                email: emailEntered,
              })
              .then(({ status }) => {
                if (status) {
                  setDisableForm(false);
                  sessionStorage.setItem("emailToReset", emailEntered);
                  navigate("/password_reset_code");
                } else {
                  serverError();
                }
              })
              .catch(() => {
                serverError();
              });
          } else {
            serverError();
          }
        })
        .catch(() => {
          serverError();
        });
    }
  };

  return (
      <section className="section-gradient section-header u_padding_down--big">
        <div className="flex-row--centered">
          <div className="box-mountain-bg">
            <div className="box-mountain-bg__form">
                <form onSubmit={onSubmit} className="forn">
                  <div className="u-margin-bottom-medium u-center-text">
                    <h2 className="heading-secondary">Resetare parolă</h2>
                  </div>
                  <div className="form__group">
                    <input
                      type="email"
                      className="form__input"
                      placeholder="Adresă de email *"
                      id="email"
                      name="email"
                      ref={emailRef}
                      required
                      disabled={disableForm}
                    />
                    <label
                      htmlFor="email"
                      className="form__label form__label__required"
                    >
                      Adresă de email
                    </label>
                  </div>
                  <div className="form__group">
                    <button className="btn btn--white" disabled={disableForm}>
                      Resetează &nbsp;<i className="fas fa-sync"></i>
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </section>
  );
}

export default ResetPass;
