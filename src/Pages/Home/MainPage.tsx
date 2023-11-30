import { useLoaderData } from 'react-router-dom';
import Header from './Header'
import AboutSection from './AboutSection';
import TestSection from './TestSection';
import CourseAvailableContext from '../../Contexts/CourseAvailableContext';
import CoursesSection from './CoursesSection';
import RegisterForm from '../Auth/RegisterForm';

function MainPage() {
  const isUserLogged = useLoaderData();
  console.log(isUserLogged ? "1":"0")

  return (
    <>
    <Header />
    <main>
      <AboutSection />
      <TestSection />
      <CourseAvailableContext>
          {<CoursesSection location="home" />}
      </CourseAvailableContext>
      {!isUserLogged && <RegisterForm location="home" />}
    </main>
    </>
  )
}

export function loader(){
    return localStorage.getItem("userAccount");
}

export default MainPage