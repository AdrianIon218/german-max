interface IBlackdropProps {
  children: any;
  showState: boolean;
  onClose: ()=>void
}

export default function Blackdrop({children, showState, onClose}: IBlackdropProps) {
  function exitBackdrop() {
    onClose();
  }

  function breakPropagation(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.stopPropagation();
  }

  return showState && 
  (<section className="blackdrop" onClick={exitBackdrop}>
      <div className="blackdrop__content" onClick={breakPropagation}>
        <div className="blackdrop__exit">
          <div onClick={exitBackdrop} className="blackdrop__exit__btn">
            &times;
          </div>
        </div>
        {children}
      </div>
    </section>);
}
