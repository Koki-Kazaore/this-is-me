import HeroSection from './components/HeroSection'
import Navbar from './components/organisms/Navbar'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import EmailSection from './components/EmailSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className='flex min-h-screen min-w-min flex-col bg-[rgb(18,18,18)]'>
      <Navbar />
      <div className='sm:container mt-24 mx-auto px-12 py-4'>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  )
}
