import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../Contexts/TransitionContext";

interface IProps {
  to: string;
  icon?: string;
  children?: any;
  className?: string;
  transitNow?: boolean;
}

function LinkTansition(props: IProps) {
  const context = useNotification();

  const navigate = useNavigate();
  const transitionPlay = () => {
    context!.setTransition(true);
    setTimeout(() => {
      context!.setTransition(false);
    }, 500);

    setTimeout(() => {
      navigate(props.to);
    }, 400);
  };

  useEffect(() => {
    if (props.transitNow) {
      transitionPlay();
    }
  }, []);

  return (
    <span
      className={props.className ?? "span-header-block__link"}
      onClick={() => transitionPlay()}
    >
      {props.children ?? <i className={props.icon} />}
    </span>
  );
}

export default LinkTansition;
