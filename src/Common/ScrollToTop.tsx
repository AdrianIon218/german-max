import { useEffect } from "react";
import { useLocation } from "react-router";
import { IPropsChildren } from "./CommonInterfaces";

const ScrollToTop = (props: IPropsChildren) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
