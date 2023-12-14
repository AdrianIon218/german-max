import axios from "axios";
import { useEffect, useRef } from "react";
import { NotificationType } from "../../Common/Notfication";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../SliceReducers/NotificationSlice";
import { hideLoading, showLoading } from "../../SliceReducers/LoadingSlice";
import store from "../../SliceReducers/store";

function Support() {
  const userFromStorage = useLoaderData() as string;
  const dispatch =  useDispatch();
  const topicRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const actionData = useActionData() as {status:string, notificationType: NotificationType};
  useEffect(()=>{
    if(actionData?.status && actionData?.status){
      topicRef.current!.value = "";
      messageRef.current!.value = "";
      dispatch(showNotification(actionData.status, actionData.notificationType));
    }
  },[actionData]);

  return (
    <section className="section-header form u_padding_down--big flex-column--centered">
      <Form method="POST" action="/support" className="forn box-form u-margin-top--small">
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
        {userFromStorage && <input type="hidden" name="userFromStorage" value={userFromStorage} />}
        <div className="form__group">
          <input type="text" id="topic" name="topic" required
            className="form__input blue_border"
            placeholder="Topic *" ref={topicRef}
          />
          <label htmlFor="topic" className="form__label form__label__required">
            Topic
          </label>
        </div>
        <div className="form__group">
          <textarea name="message" id="message"
            className="form__input form__textarea blue_border"
            rows={10} minLength={5} placeholder="Mesaj *"
            required ref={messageRef}
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
      </Form>
    </section>
  );
}

export function loader(){
  return localStorage.getItem("userAccount");
}

export async function supportAction({request}: {request: Request}){
  store.dispatch(showLoading());
  const data = await request.formData();
  const {email, topic, userFromStorage, message} = Object.fromEntries(data);
  try{
    const response = await axios.post("https://localhost:5000/contacts", {
        email: userFromStorage || email,
        topic: topic,
        message: message,
      });

    const { status } = response.data;
    store.dispatch(hideLoading());
    if (status === "sent") {
      return {status: "Mesaj trimis !", notificationType: NotificationType.SUCCESS};
    } else {
      return {status: "Eroare, încercați mai târziu !", notificationType: NotificationType.ERROR};
    }
  } catch {
      store.dispatch(hideLoading());
      return {status: "Eroare, încercați mai târziu !", notificationType: NotificationType.ERROR};
  }
}

export default Support;
