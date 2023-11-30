import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import ScrollToTop from "../Common/ScrollToTop";
import LoadingLoader from "../Common/LoadingLoader";
import TransitionContext from "../Contexts/TransitionContext";
import Footer from "./Footer";
import MainMenu from "./MainMenu";

export default function MainLayout() {
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
