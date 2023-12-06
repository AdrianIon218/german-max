import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import ScrollToTop from "../Common/ScrollToTop";
import LoadingLoader from "../Common/LoadingLoader";
import TransitionContext from "../Contexts/TransitionContext";
import Footer from "./Footer";
import MainMenu from "./MainMenu";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../Common/Notfication";
import { hideNotification } from "../SliceReducers/NotificationSlice";
import LoadingSpinner from "../Common/LoadingSpinner";
import { RootState } from "../SliceReducers/store";

export default function MainLayout() {
  const {isShown:isNotificationShwon, message:notificationMessage, type:notificationType} = useSelector((store:RootState) => store.notification);
  const {isLoading} = useSelector((store:RootState) => store.loading);
  const dispatch = useDispatch();
  
  return (
    <TransitionContext>
      <ScrollToTop>
        {isNotificationShwon && (<Notification message={notificationMessage} type={notificationType}
          deleteNotification={() => dispatch(hideNotification())}/>)
        }
        {isLoading && (<LoadingSpinner />)}
        <MainMenu />
        <Suspense fallback={<LoadingLoader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </ScrollToTop>
    </TransitionContext>
  );
}
