import { useLoaderData } from 'react-router-dom';
import Header from './Header'
import AboutSection from './AboutSection';
import TestSection from './TestSection';

function MainPage() {
  const isUserLogged = useLoaderData();

  return (
    <>
    <Header />
    <main>
      <AboutSection />
      <TestSection />
      {isUserLogged ? "da":"nu" }
    </main>
    </>
  )
}

export function loader(){
    return localStorage.getItem("userAccount");
}

export default MainPage