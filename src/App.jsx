import { useState, useEffect } from 'react'
import PasswordGate from './components/PasswordGate'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Gallery from './sections/Gallery'
import Videos from './sections/Videos'
import Packages from './sections/Packages'
import Social from './sections/Social'
import FAQ from './sections/FAQ'



import WhatsAppButton from './components/WhatsAppButton'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if already authenticated in session
        const auth = sessionStorage.getItem('camila_auth')
        if (auth === 'true') {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const handleAuthenticate = () => {
        sessionStorage.setItem('camila_auth', 'true')
        setIsAuthenticated(true)
    }

    // Content Protection
    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault()

        const handleKeyDown = (e) => {
            if (
                (e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'p')) ||
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                e.key === 'PrintScreen'
            ) {
                e.preventDefault()
            }
        }

        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="text-brand-red text-2xl loading-pulse font-display font-bold">CARGANDO...</div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <PasswordGate onSuccess={handleAuthenticate} />
    }

    return (
        <div className="min-h-screen bg-brand-dark overflow-x-hidden protected-media">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Gallery />
                <Videos />
                <Packages />
                <FAQ />
                <Social />
            </main>
            <WhatsAppButton />

        </div>
    )
}

export default App
