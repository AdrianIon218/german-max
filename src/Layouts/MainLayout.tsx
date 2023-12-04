import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import ScrollToTop from "../Common/ScrollToTop";
import LoadingLoader from "../Common/LoadingLoader";
import TransitionContext from "../Contexts/TransitionContext";
import Footer from "./Footer";
import MainMenu from "./MainMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../main";
import Notification from "../Common/Notfication";
import { hideNotification } from "../SliceReducers/NotificationSlice";

export default function MainLayout() {
  const {isShown:isNotificationShwon, message:notificationMessage, type:notificationType} = useSelector((store:RootState) => store.notification);
  const dispatch = useDispatch();
  console.log(isNotificationShwon);
  
  return (
    <TransitionContext>
      <ScrollToTop>
        { isNotificationShwon && <Notification message={notificationMessage} type={notificationType}
          deleteNotification={() => dispatch(hideNotification())}/>
        }
        <MainMenu />
        <Suspense fallback={<LoadingLoader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </ScrollToTop>
    </TransitionContext>
  );
}
