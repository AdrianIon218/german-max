import { Link } from "react-router-dom";

export interface ITestBoxProps {
  titleBox: string;
  iconClasses: string;
  linkTest: string;
}

export default function TestBox(props: ITestBoxProps) {
  return (
    <div className="flex-element test-box">
      <i className={`${props.iconClasses} test-box__icon`} aria-hidden="true" />
      <h3 className="test-box__title u-margin-bottom-small">
        {props.titleBox}
      </h3>
      <Link className="btn-text" to="#">
        Începe testul
      </Link>
    </div>
  );
}
