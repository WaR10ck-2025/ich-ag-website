import { NavBar } from './components/layout/NavBar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Leistungen } from './components/sections/Leistungen'
import { UeberMich } from './components/sections/UeberMich'
import { Kontakt } from './components/sections/Kontakt'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">Zum Inhalt springen</a>
      <NavBar />
      <main id="main">
        <Hero />
        <Leistungen />
        <UeberMich />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}

export default App
