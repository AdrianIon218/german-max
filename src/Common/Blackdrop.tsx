import { useState } from "react";

interface IBlackdropProps {
  children: any;
  onClose: ()=>void
}

export default function Blackdrop({children, onClose}: IBlackdropProps) {
  const [isClosing, setClosing] = useState(false);

  function exitBackdrop() {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 450);
  }

  function breakPropagation(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.stopPropagation();
  }

  return <section className="blackdrop" onClick={exitBackdrop}>
      <div className={`blackdrop__content ${isClosing?"blackdrop__content--closing":""}`} onClick={breakPropagation}>
        <div className="blackdrop__exit">
          <div onClick={exitBackdrop} className="blackdrop__exit__btn">
            &times;
          </div>
        </div>
        {children}
      </div>
    </section>;
}
