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
import LinkTansition from "../Common/LinkTransition";
import { stopTransition } from "../SliceReducers/TransitionSlice";

export default function MainLayout() {
  const {
    isShown: isNotificationShwon,
    message: notificationMessage,
    type: notificationType,
  } = useSelector((store: RootState) => store.notification);
  const { isLoading } = useSelector((store: RootState) => store.loading);
  const pageTransition = useSelector(
    (store: RootState) => store.pageTransition,
  );
  const dispatch = useDispatch();

  return (
    <TransitionContext>
      <ScrollToTop>
        {isNotificationShwon && (
          <Notification
            message={notificationMessage}
            type={notificationType}
            deleteNotification={() => dispatch(hideNotification())}
          />
        )}
        {isLoading && <LoadingSpinner />}
        {pageTransition.isTransitioning && (
          <LinkTansition
            to={pageTransition.pageTarget}
            transitNow={true}
            onClose={() => dispatch(stopTransition())}
          >
            {" "}
          </LinkTansition>
        )}
        <MainMenu />
        <Suspense fallback={<LoadingLoader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </ScrollToTop>
    </TransitionContext>
  );
}
