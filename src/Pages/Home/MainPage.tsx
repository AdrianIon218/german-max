import { useLoaderData } from 'react-router-dom';
import Header from './Header'
import AboutSection from './AboutSection';
import TestSection from './TestSection';
import CoursesSection from './CoursesSection';
import RegisterForm from '../Auth/RegisterForm';

function MainPage() {
  const isUserLogged = useLoaderData();

  return (
    <>
    <Header />
    <main>
      <AboutSection />
      <TestSection />
      <CoursesSection location="home" />
      {!isUserLogged && <RegisterForm location="home" />}
    </main>
    </>
  )
}

export function loader(){
    return localStorage.getItem("userAccount");
}

export default MainPage;