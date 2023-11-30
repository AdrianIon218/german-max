import { useLoaderData } from 'react-router-dom';
import Header from './Header'
import AboutSection from './AboutSection';
import TestSection from './TestSection';
import CourseAvailableContext from '../../Contexts/CourseAvailableContext';
import CoursesSection from './CoursesSection';

function MainPage() {
  const isUserLogged = useLoaderData();

  return (
    <>
    <Header />
    <main>
      <AboutSection />
      <TestSection />
      <CourseAvailableContext>
          {<CoursesSection location="home" />}
      {isUserLogged ? "da":"nu" }

      </CourseAvailableContext>
    </main>
    </>
  )
}

export function loader(){
    return localStorage.getItem("userAccount");
}

export default MainPage