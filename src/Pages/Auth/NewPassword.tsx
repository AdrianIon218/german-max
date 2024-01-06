import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification, { NotificationType } from "../../Features/Notfication";
import axios from "axios";

function NewPassword() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    isShown: false,
    messsage: "",
    type: NotificationType.NO_TYPE,
  });
  const [isPassSaved, setPassSaved] = useState(false);
  const passRef = useRef<HTMLInputElement>(null);
  const email = sessionStorage.getItem("emailToReset");

  useEffect(() => {
    const isResetAllowed = sessionStorage.getItem("allowToResetPass");
    if (!email || isResetAllowed != "true") {
      navigate("/login");
    }
  }, []);

  function togglePassVisibility() {
    if (passRef.current!.type === "password") {
      passRef.current!.type = "text";
    } else {
      passRef.current!.type = "password";
    }
  }

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (isPassSaved) {
      navigate("/login");
      return;
    }
    const password = passRef.current!.value;
    axios
      .post("http://localhost:5000/login/changePassword", {
        email: email,
        password: password,
      })
      .then((response) => {
        const { status } = response.data;
        if (status) {
          setPassSaved(true);
          sessionStorage.removeItem("emailToReset");
          sessionStorage.removeItem("allowToResetPass");
          setNotification({
            isShown: true,
            messsage: "Parolă salvată!",
            type: NotificationType.SUCCESS,
          });
        } else {
          setNotification({
            isShown: true,
            messsage: "Eroare, încercați mai târziu!",
            type: NotificationType.ERROR,
          });
        }
      })
      .catch(() => {
        setNotification({
          isShown: true,
          messsage: "Eroare, încercați mai târziu!",
          type: NotificationType.ERROR,
        });
      });
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
                    {isPassSaved
                      ? "Parola a fost salvată!"
                      : "Setează o parolă nouă!"}
                  </h2>
                </div>
                <div className="form__group" hidden={isPassSaved}>
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
                      name="pass_toggle"
                      id="pass_toggle"
                      onClick={togglePassVisibility}
                    />
                  </div>
                </div>
                <div className="form__group">
                  <button className="btn btn--white" onClick={onSubmit}>
                    {isPassSaved ? "Înapoi la autenficare" : "Salvează parola "}
                    {!isPassSaved && <i className="fa fa-save" />}
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

export default NewPassword;
