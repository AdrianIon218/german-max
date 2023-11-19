import { useEffect } from "react";
import { useLocation } from "react-router";
import { IProps } from "../Helpers/CommonInterfaces";

const ScrollToTop = (props: IProps) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
