import CardCourse from "../../SpecialComponents/CardCourse";
import { useQuery } from "@tanstack/react-query";
import { useId } from "react";
import { getCoursesInfo } from "../../supabase/course_api";
import { AvailableCourses } from "../../data/availableCourses";

export default function CoursesSection({
  location,
}: {
  location: "home" | "own-page";
}) {
  const {data:courses, isLoading} = useQuery({queryKey:["availableCourses"], queryFn:getCoursesInfo});
  const courseID = useId();
  const courseCards = AvailableCourses.map((item, index)=>{
    const courseFromDatabase = courses?.filter((course)=>course.level === item.heading);
    const courseKey = `${courseID}-${index}`;

    return isLoading ? <CardCourse {...item} key={courseKey} isLoading={true} /> :
         courseFromDatabase?.length === 1 ? 
           <CardCourse {...item} key={courseKey}
            estimationWeeks = {Math.ceil(courseFromDatabase[0].estimated_time/7)}
            details = {
             {
               levels:item.details.levels,
               lessonsNumber: courseFromDatabase[0].num_lessons,
               words: courseFromDatabase[0].num_words,
               testsNumber: courseFromDatabase[0].num_tests
             }}/> 
          : <CardCourse {...item} key={courseKey} />
  });

  return (
    <section
      className={`section-courses ${
        location === "home"
          ? "section-courses--between section-between"
          : "section-header"
      } `}
    >
      <div className="u-center-text u-margin-bottom-medium">
        <h2 className="heading-secondary" id="section-course-id">Cursuri disponibile</h2>
      </div>
      <div className="flex-row--centered">
        {courseCards}
      </div>
    </section>
  );
}
