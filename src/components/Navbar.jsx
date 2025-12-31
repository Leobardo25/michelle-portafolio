import { useState, useEffect } from 'react'

const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Membresía', href: '#packages' },
    { name: 'Contacto', href: '#contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleClick = (e, href) => {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setIsOpen(false)
    }

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled && !isOpen
                ? 'bg-brand-dark/95 backdrop-blur-md py-4 border-b border-white/5'
                : 'bg-transparent py-8'
                }`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href="#hero" onClick={(e) => handleClick(e, '#hero')} className="font-display text-2xl font-bold tracking-tighter flex items-center gap-1 group">
                            <span className="animate-text-wave">CAMILA</span>
                            <span className="relative inline-flex items-center justify-center w-8 h-8 ml-1">
                                <span className="absolute animate-heartbeat text-xl">💕</span>
                                <span className="floating-heart text-[10px]" style={{ animationDelay: '0s', left: '20%' }}>❤️</span>
                                <span className="floating-heart text-[8px]" style={{ animationDelay: '0.5s', left: '80%' }}>💕</span>
                                <span className="floating-heart text-[12px]" style={{ animationDelay: '1.2s', left: '50%' }}>💖</span>
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    className="text-sm font-medium tracking-widest uppercase text-brand-muted hover:text-white transition-colors duration-300"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-white p-2 hover:bg-white/5 rounded-sm transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className={`md:hidden fixed inset-0 bg-black z-[60] transition-all duration-300 flex flex-col justify-center items-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}>

                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="space-y-8 text-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            className="block text-2xl font-bold uppercase tracking-widest text-white hover:text-brand-red transition-colors duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}
