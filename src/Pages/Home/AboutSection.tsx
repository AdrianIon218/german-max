import PhotoComposition from "./PhotosComposition";
import aboutPhotos from "../../data/AboutPhotos.json";

function AboutSection() {
  return (
    <section className="section-about section-between u_move_up--big">
      <div className="u-center-text u-margin-bottom-medium">
        <h2 className="heading-secondary">Învață germană simplu și ușor</h2>
      </div>

      <div className="flex-row">
        <div className="col-1-of-2-text">
          <h3 className="heading-tertiary u-margin-bottom-small">
            Unde se vorbește limba germană{" "}
            <span className="u-text-blue">?</span>
          </h3>
          <p className="paragraph">
            Limba germană este vorbită de majoritatea populației din Germania,
            Austria, Elveția, Luxemburg și Liechtenstein. Ea fiind folosită și
            în estul Belgiei, precum și în regiunea Schleswigul de Nord din
            sudul Danemarcei, dar și în regiunea autonomă Tirolul de Sud din
            nordul Italiei, cât și în voievodatul Opole al Poloniei și în
            regiunile Alsacia și Lorena din Franța.
          </p>

          <h3 className="heading-tertiary u-margin-bottom-small u-margin-bottom-small">
            De ce să înveți limba germană <span className="u-text-blue">?</span>
          </h3>
          <p className="paragraph">
            În domeniul afacerilor s-a observat cum comunicare în limba germană
            cu partenerii vorbitori de limba germană contribuie la îmbunătățirea
            relației de afaceri, cât și a ratei de succes.
          </p>
          <p className="paragraph">
            Cunoștințele de limba germană pot ajuta în obținerea unui loc de
            muncă în cadrul unei companii care derulează afaceri pe plan
            internațional .
          </p>
          <p className="paragraph">
            După engleză , germana este cea de-a doua limbă ca importanță în
            lumea științei. Germania ocupând locul trei în lume prin contribuția
            sa importantă în domeniul cercetării și a dezvoltării .
          </p>

          <a href="#section-course-id" className="btn-text">
            Vezi cursurile disponibile &nbsp;
            <i className="fas fa-arrow-right" />
          </a>
        </div>

        <div className="col-1-of-2-img">
          <PhotoComposition photos={aboutPhotos.photos} />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
