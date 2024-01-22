import axios, { AxiosResponse } from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../SliceReducers/LoadingSlice";
import { addExpiringCode, selectUserByEmail } from "../../Effects/user_api";
import { showNotification } from "../../SliceReducers/NotificationSlice";
import { NotificationType } from "../../Common/Notfication";
import { generateCode } from "../../Effects/util_functions";
import { useIsLoadingOrNotifcationShown } from "../../SpecialComponents/CustomedHooks/ReduxHooks";

function ResetPass() {
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const disableForm = useIsLoadingOrNotifcationShown();

  function serverError() {
    dispatch(hideLoading());
    dispatch(
      showNotification("Eroare, încercați mai târziu!", NotificationType.ERROR),
    );
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!disableForm) {
      const emailEntered = emailRef.current!.value.trim();
      dispatch(showLoading());
      selectUserByEmail(emailEntered)
        .then((users) => {
          if (users?.length === 0) {
            dispatch(hideLoading());
            return dispatch(
              showNotification(
                "Nu există utilizator cu această adresă de mail!",
                NotificationType.ERROR,
              ),
            );
          }
          const code = generateCode(6);
          axios
            .post("https://germanmaxserver.onrender.com/reset_mail", {
              email: emailEntered,
              code,
            })
            .then(async (response: AxiosResponse) => {
              const { status } = response.data;

              if (status === "ok") {
                const currentDate = new Date();
                currentDate.setMinutes(currentDate.getMinutes() + 10);
                const expire_at = currentDate
                  .toLocaleTimeString()
                  .replace("AM", "")
                  .replace("PM", "")
                  .trim();
                try {
                  const isCodeSaved = await addExpiringCode(
                    emailEntered,
                    code,
                    expire_at,
                  );
                  console.log(isCodeSaved);
                  dispatch(hideLoading());
                  sessionStorage.setItem("emailToReset", emailEntered);
                  navigate("/password_reset_code");
                  dispatch(
                    showNotification("Cod trimis!", NotificationType.SUCCESS),
                  );
                } catch {
                  serverError();
                }
              } else {
                serverError();
              }
            })
            .catch(() => {
              serverError();
            });
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
                <h2 className="heading-secondary">Resetare parola</h2>
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
                  Resetează&nbsp;
                  <i className="fas fa-sync" />
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
