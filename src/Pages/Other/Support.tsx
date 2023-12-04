import axios from "axios";
import { useState } from "react";
import { NotificationType } from "../../Common/Notfication";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../SliceReducers/NotificationSlice";
import { hideLoading, showLoading } from "../../SliceReducers/LoadingSlice";

function Support() {
  const userFromStorage = useLoaderData();
  const dispatch =  useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [topicMessage, setTopic] = useState("");
  const [messageText, setMessage] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(showLoading());

    axios.post("http://localhost:5000/contacts", {
        email: userFromStorage || userEmail,
        topic: topicMessage,
        message: messageText,
      })
      .then((response) => {
        const { status } = response.data;
        dispatch(hideLoading());
        if (status === "sent") {
          setUserEmail("");
          setTopic("");
          setMessage("");
          dispatch(showNotification("Mesaj trimis !", NotificationType.SUCCESS));
        } else {
          dispatch(showNotification("Eroare, încercați mai târziu !", NotificationType.ERROR));
        }
      })
      .catch(() => {
        dispatch(hideLoading());
        dispatch(showNotification("Eroare, încercați mai târziu !", NotificationType.ERROR));
      });
  }

  return (
    <section className="section-header form u_padding_down--big flex-column--centered">
      <form onSubmit={submit} className="forn box-form u-margin-top--small">
        <div className="u-margin-bottom-medium u-center-text">
          <h2 className="heading-secondary">Formular de contact</h2>
        </div>
        {!userFromStorage && (
          <div className="form__group">
            <input
              type="email"
              className="form__input blue_border"
              placeholder="Adresă ta de email *"
              id="email"
              name="email"
              value={userEmail}
              onChange={(email)=>setUserEmail(email.target.value.trim())}
              required
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
          <input type="text" id="topic" name="topic" required
            className="form__input blue_border"
            placeholder="Topic *" 
            value={topicMessage}   
            onChange={(topic)=>setTopic(topic.target.value.trim())}
          />
          <label htmlFor="topic" className="form__label form__label__required">
            Topic
          </label>
        </div>
        <div className="form__group">
          <textarea name="message" id="message"
            className="form__input form__textarea blue_border"
            rows={10} minLength={5} placeholder="Mesaj *"
            required
            value={messageText}
            onChange={(message)=>setMessage(message.target.value.trim())}
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
