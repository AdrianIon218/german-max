import { useState } from "react";
import RadioButton from "../../Common/RadioButton";
import LinkTansition from "../../Common/LinkTransition";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../SliceReducers/NotificationSlice";
import { NotificationType } from "../../Common/Notfication";
import { hideLoading, showLoading } from "../../SliceReducers/LoadingSlice";
import { RootState } from "../../SliceReducers/store";
import { startTransition } from "../../SliceReducers/TransitionSlice";

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
  const [emailUsed, setEmailUsed] = useState("");
  const [name, setName] = useState("");
  const [passwordUsed, setPasswordUsed] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [level, setLevel] = useState(KnowlegdeLevel.BEGGINER);

  const dispatch = useDispatch();
  const isNotificationShwon = useSelector((store:RootState) => store.notification.isShown);
  const isLoadingSignShown = useSelector((store:RootState) => store.loading.isLoading);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(showLoading());
    const currentLevel = ["A1","B1","C1"][level];

    axios
      .post("http://localhost:5000/signup/checkEmail", { email: emailUsed })
      .then((response) => {
        const { isEmailAvailable } = response.data;

        if (isEmailAvailable) {
          return axios.post("http://localhost:5000/signup/addNewUser", {
            email: emailUsed,
            name,
            password: passwordUsed,
            level: currentLevel,
          });
        } else {
          dispatch(hideLoading());
          dispatch(showNotification("Adresa de mail este deja folosită !", NotificationType.WARNING))
        }
      })
      .then((resAddUser) => {
        if (resAddUser?.data.isUserAdded) {
          localStorage.setItem("userAccount", emailUsed);
          dispatch(hideLoading());
          dispatch(startTransition(`/course-plan/${currentLevel}`));
        }
      })
      .catch(()=>{
        dispatch(showNotification("Eroare de server, încerca-ți mai târziu !", NotificationType.ERROR))
      });
  }

  return (
    <>
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
                  <input type="text" id="name"
                    className="form__input"
                    placeholder="Nume complet *"
                    value={name}
                    onChange={(input)=>setName(input.target.value)}
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
                    type="email" id="email"
                    className="form__input" placeholder="Adresă de email *"
                    value={emailUsed}
                    onChange={(input)=>setEmailUsed(input.target.value)}
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
                    type={showPass? "text":"password"} id="password"
                    minLength={6} maxLength={50}
                    className="form__input"
                    placeholder="Parolă de minim 6 caractere *"
                    value={passwordUsed} onChange={(input)=>setPasswordUsed(input.target.value)}
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
                      onClick={()=> setShowPass(oldState => !oldState)}
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
                  <button className="btn btn--white" disabled={isLoadingSignShown || isNotificationShwon}>
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
