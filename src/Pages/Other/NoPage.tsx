import Footer from "../../Layouts/Footer";
import MainMenu from "../../Layouts/MainMenu";

export default function NoPage() {
  return (<>
    <MainMenu />
    <section className="section-video-bg section-header">
      <div className="message-not-found">
        <h2 className="heading-secondary u-center-text">
          Pagina nu <span>există !</span>
        </h2>
      </div>

      <video autoPlay muted loop className="bg-video">
        <source
          src="/no_page_found-compressed.mp4"
          type="video/mp4"
        />
      </video>
    </section>
    <Footer />
    </>
  );
}
