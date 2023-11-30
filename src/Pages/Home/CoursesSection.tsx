import CardCourse from "../../SpecialComponents/CardCourse";
import { useContext } from "react";
import { CourseAvailableCtx } from "../../Contexts/CourseAvailableContext";

export default function CoursesSection({
  location,
}: {
  location: "home" | "own-page";
}) {
  const coursesContext = useContext(CourseAvailableCtx);

  return (
    <section
      className={`section-courses ${
        location === "home"
          ? "section-courses--between section-between"
          : "section-header"
      } `}
      id="section-course-id"
    >
      <div className="u-center-text u-margin-bottom-medium">
        <h2 className="heading-secondary">Cursuri disponibile</h2>
      </div>
      <div className="flex-row--centered">
        {coursesContext.map((course, index) => (
          <CardCourse {...course} key={index} />
        ))}
      </div>
      <div className="u-center-text u-margin-top--medium">
        <a href="#" className="btn btn--blue">
          Află ce curs ți se potrivește
        </a>
      </div>
    </section>
  );
}
