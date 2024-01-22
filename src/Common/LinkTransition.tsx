import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../Contexts/TransitionContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../SliceReducers/store";
import { hideNotification } from "../SliceReducers/NotificationSlice";

interface IProps {
  to: string;
  icon?: string;
  children?: any;
  className?: string;
  transitNow?: boolean;
  onClose?: () => void;
}

function LinkTansition(props: IProps) {
  const context = useTransition();
  const { isShown } = useSelector((store: RootState) => store.notification);
  const isNotificationShwon = useRef<boolean>();
  const dispath = useDispatch();

  useEffect(() => {
    isNotificationShwon.current = isShown;
  }, [isShown]);

  const navigate = useNavigate();
  const transitionPlay = () => {
    context!.setTransition(true);

    setTimeout(() => {
      context!.setTransition(false);
      if (isNotificationShwon.current) {
        dispath(hideNotification());
      }
    }, 500);

    setTimeout(() => {
      navigate(props.to);
      props?.onClose?.();
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
