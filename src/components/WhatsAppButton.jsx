import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
    const [showTooltip, setShowTooltip] = useState(false)
    const [hasShownTooltip, setHasShownTooltip] = useState(false)
    const [animationStep, setAnimationStep] = useState(0) // 0: hidden, 1: one dot, 2: two dots, 3: three dots, 4: full message

    useEffect(() => {
        const handleScroll = () => {
            if (hasShownTooltip) return

            const gallerySection = document.getElementById('gallery')
            if (!gallerySection) return

            const rect = gallerySection.getBoundingClientRect()
            const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0

            if (isInView && !showTooltip) {
                setShowTooltip(true)
                setHasShownTooltip(true)
                
                // Animate dots sequence
                setTimeout(() => setAnimationStep(1), 200)  // First dot
                setTimeout(() => setAnimationStep(2), 500)  // Second dot
                setTimeout(() => setAnimationStep(3), 800)  // Third dot
                setTimeout(() => setAnimationStep(4), 1200) // Full message
                
                // Hide tooltip after showing full message for 3 seconds
                setTimeout(() => {
                    setShowTooltip(false)
                    setAnimationStep(0)
                }, 4500)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check on mount

        return () => window.removeEventListener('scroll', handleScroll)
    }, [showTooltip, hasShownTooltip])

    const handleOpenChat = () => {
        const phoneNumber = "50660539901"
        const message = "Hola quiero comprar de tu contenido "
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <div className="fixed bottom-6 right-3 md:right-6 z-50">
            {/* Chat bubble tooltip - positioned above button */}
            {showTooltip && animationStep > 0 && (
                <div className="absolute bottom-full right-0 mb-3 transition-all duration-300">
                    <div className="relative">
                        {/* Chat bubble */}
                        <div className="bg-black/80 backdrop-blur-md text-white px-3 py-2 rounded-lg shadow-xl text-xs font-medium whitespace-nowrap">
                            {animationStep === 1 && (
                                <span className="animate-pulse">●</span>
                            )}
                            {animationStep === 2 && (
                                <span className="animate-pulse">● ●</span>
                            )}
                            {animationStep === 3 && (
                                <span className="animate-pulse">● ● ●</span>
                            )}
                            {animationStep === 4 && (
                                <span className="animate-fade-in">Escríbeme para comprar ❤️</span>
                            )}
                        </div>
                        
                        {/* Bubble tail/pointer */}
                        <div className="absolute -bottom-1 right-4 w-3 h-3 bg-black/80 backdrop-blur-md transform rotate-45"></div>
                    </div>
                </div>
            )}

            {/* WhatsApp button */}
            <button
                onClick={handleOpenChat}
                className="bg-brand-purple text-white p-3 md:p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-gentle-pulse cursor-pointer border-none"
                aria-label="Abrir WhatsApp"
            >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.48s1.066 2.875 1.215 3.072c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
            </button>
        </div>
    )
}
