import axios from "axios";
import { useRef } from "react";
import { NotificationType } from "../../Common/Notfication";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../SliceReducers/NotificationSlice";

function Support() {
  const userEmail = useLoaderData();
  const emailRef = useRef<HTMLInputElement>(null);
  const topicRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const dispatch =  useDispatch();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const emailAdress = userEmail ?? emailRef.current!.value.trim();
    const topic = topicRef.current!.value.trim();
    const message = messageRef.current!.value.trim();

    axios.post("http://localhost:5000/contacts", {
        email: emailAdress,
        topic: topic,
        message: message,
      })
      .then((response) => {
        const { status } = response.data;
        if (status === "sent") {
          topicRef.current!.value = "";
          messageRef.current!.value = "";
          dispatch(showNotification("Mesaj trimis !", NotificationType.SUCCESS));
        } else {
          dispatch(showNotification("Eroare, încercați mai târziu !", NotificationType.ERROR));
        }
      })
      .catch(() => {
        dispatch(showNotification("Eroare, încercați mai târziu !", NotificationType.ERROR));
      });
  }

  return (
    <section className="section-header form u_padding_down--big flex-column--centered">
      <form onSubmit={submit} className="forn box-form u-margin-top--small">
        <div className="u-margin-bottom-medium u-center-text">
          <h2 className="heading-secondary">Formular de contact</h2>
        </div>
        {!userEmail && (
          <div className="form__group">
            <input
              type="email"
              className="form__input blue_border"
              placeholder="Adresă ta de email *"
              id="email"
              required
              ref={emailRef}
              name="email"
            />
            <label
              htmlFor="email"
              className="form__label form__label__required"
            >
              Adresă ta de email
            </label>
          </div>
        )}
        <div className="form__group">
          <input
            type="text"
            className="form__input blue_border"
            placeholder="Topic *"
            id="topic"
            required
            ref={topicRef}
            name="topic"
          />
          <label htmlFor="topic" className="form__label form__label__required">
            Topic
          </label>
        </div>
        <div className="form__group">
          <textarea
            name="message"
            className="form__input form__textarea blue_border"
            id="message"
            rows={10}
            ref={messageRef}
            minLength={5}
            placeholder="Mesaj *"
            required
          />
          <label
            htmlFor="message"
            className="form__label form__label__required"
          >
            Mesaj
          </label>
        </div>

        <div className="form__group">
          <button className="btn btn--white">Trimite mesajul</button>
        </div>
      </form>
    </section>
  );
}

export function loader(){
  return localStorage.getItem("userAccount");
}

export default Support;
