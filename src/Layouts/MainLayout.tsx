import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import ScrollToTop from "../Common/ScrollToTop";
import LoadingLoader from "../Common/LoadingLoader";
import TransitionContext from "../Contexts/TransitionContext";
import Footer from "./Footer";
import MainMenu from "./MainMenu";
import { useSelector } from "react-redux";
import { RootState } from "../main";

export default function MainLayout() {
  const notification = useSelector((store:RootState) => store.notification);

  console.log(notification.isShown, notification.message, notification.type);
  
  return (
    <TransitionContext>
      <ScrollToTop>
        <MainMenu />
        <Suspense fallback={<LoadingLoader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </ScrollToTop>
    </TransitionContext>
  );
}
