import HeroSection from './components/HeroSection'
import Navbar from './components/organisms/Navbar'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import EmailSection from './components/EmailSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='mx-auto w-full max-w-3xl flex-grow px-6 pt-24'>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  )
}
