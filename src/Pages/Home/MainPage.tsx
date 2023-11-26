import { useLoaderData } from 'react-router-dom';
import Header from './Header'
import AboutSection from './AboutSection';

function MainPage() {
  const isUserLogged = useLoaderData();

  return (
    <>
    <Header />
    <main>
      <AboutSection />
      {isUserLogged ? "da":"nu" }
    </main>
    </>
  )
}

export function loader(){
    return localStorage.getItem("userAccount");
}

export default MainPage