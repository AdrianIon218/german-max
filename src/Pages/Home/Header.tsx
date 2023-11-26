
export default function Header() {
  return (
    <div className="header-container">
      <div className="logo_box">
        <img
          src="GermanMax.png"
          alt="GermanMax"
          className="logo_box__img"
        />
      </div>
      <header className="header section-header">
        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary__main">GermanMax</span>
            <span className="heading-primary__sub">
              Aplicație de învățat limba Germană
            </span>
          </h1>
          <a href="#section-course-id" className="btn btn--white btn--animated">
            Vezi cursurile
          </a>
        </div>
      </header>
    </div>
  );
}
