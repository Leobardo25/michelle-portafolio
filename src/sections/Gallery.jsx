import { useState, useEffect } from 'react'
import { getGalleryImages } from '../services/firebaseStorage'

export default function Gallery() {
    const [freeItems, setFreeItems] = useState([])
    const [premiumItems, setPremiumItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('free')
    const [visibleItems, setVisibleItems] = useState(20) // Show 20 items initially

    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 20)
    }

    useEffect(() => {
        async function loadImages() {
            try {
                setLoading(true)

                // Load free images (no blur)
                const freeImages = await getGalleryImages('gallery')
                setFreeItems(freeImages.map(img => ({ ...img, isExclusive: false })))

                // Load premium images (with blur)
                const premiumImages = await getGalleryImages('gallery-premium')
                setPremiumItems(premiumImages.map(img => ({ ...img, isExclusive: true })))

            } catch (err) {
                console.error('Error loading gallery:', err)
            } finally {
                setLoading(false)
            }
        }

        loadImages()
    }, [])

    const currentItems = activeTab === 'free' ? freeItems : premiumItems

    // Lightbox Logic
    const handleNext = (e) => {
        e?.stopPropagation()
        if (!selectedItem) return
        const currentIndex = currentItems.findIndex(item => item.id === selectedItem.id)
        const nextIndex = (currentIndex + 1) % currentItems.length
        setSelectedItem(currentItems[nextIndex])
    }

    const handlePrev = (e) => {
        e?.stopPropagation()
        if (!selectedItem) return
        const currentIndex = currentItems.findIndex(item => item.id === selectedItem.id)
        const prevIndex = (currentIndex - 1 + currentItems.length) % currentItems.length
        setSelectedItem(currentItems[prevIndex])
    }

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedItem) return
            if (e.key === 'ArrowRight') handleNext()
            if (e.key === 'ArrowLeft') handlePrev()
            if (e.key === 'Escape') setSelectedItem(null)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedItem, currentItems]) // Dependencies for proper state access

    return (
        <section id="gallery" className="section-padding relative bg-dark-bg">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-purple/10 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-brand-red font-medium">Galería</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
                        Mi <span className="text-brand-red">Contenido</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explora mi contenido gratuito o mira la seccion premium para comprar los videos o fotos donde podras verme completa.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('free')}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'free'
                            ? 'bg-gradient-to-r from-brand-red to-brand-red/50 text-white shadow-lg shadow-brand-red/30'
                            : 'glass text-gray-300 hover:text-white'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Gratis ({freeItems.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('premium')}
                        className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'premium'
                            ? 'bg-gradient-to-r from-brand-red to-brand-red/50 text-white shadow-lg shadow-brand-red/30'
                            : 'glass text-gray-300 hover:text-white'
                            }`}
                    >
                        <span className="absolute -top-4 -right-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce shadow-glow-red z-10">
                            🔞 EXPLÍCITO
                        </span>
                        <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        Premium ({premiumItems.length})
                    </button>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
                    </div>
                )}

                {/* Empty state */}
                {!loading && currentItems.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4 grayscale opacity-50 flex justify-center">
                            {activeTab === 'free'
                                ? <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                : <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            }
                        </div>
                        <p className="text-brand-muted uppercase tracking-widest text-sm">
                            {activeTab === 'free'
                                ? 'No hay contenido gratuito aún'
                                : 'Contenido premium próximamente'}
                        </p>
                    </div>
                )}

                {/* Gallery Grid */}
                {!loading && currentItems.length > 0 && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                            {currentItems.slice(0, visibleItems).map((item) => (
                                <GalleryItem key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {currentItems.length > visibleItems && (
                            <div className="text-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="btn-outline px-8 py-3 text-xs"
                                >
                                    VER MÁS FOTOS
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Lightbox Modal - Full Screen Z-100 */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                    onClick={() => setSelectedItem(null)}
                >
                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white p-4 transition-all hover:scale-125"
                    >
                        <svg className="w-10 h-10 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white p-4 transition-all hover:scale-125"
                    >
                        <svg className="w-10 h-10 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-6 right-6 z-[110] text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10" onClick={e => e.stopPropagation()}>
                        {selectedItem.url ? (
                            selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.url}
                                    controls
                                    autoPlay
                                    controlsList="nodownload"
                                    disablePictureInPicture
                                    onContextMenu={(e) => e.preventDefault()}
                                    className={`max-h-full max-w-full rounded-md shadow-2xl protected-media no-drag ${selectedItem.isExclusive ? 'blur-censored' : ''}`}
                                />
                            ) : (
                                <img
                                    src={selectedItem.url}
                                    alt=""
                                    draggable="false"
                                    onContextMenu={(e) => e.preventDefault()}
                                    className={`protected-media no-drag max-h-full max-w-full object-contain rounded-md shadow-2xl ${selectedItem.isExclusive ? 'blur-censored' : ''}`}
                                />
                            )
                        ) : (
                            <div className="aspect-[3/4] max-h-[80vh] rounded-2xl bg-gradient-to-br from-primary-purple to-accent-pink/50 opacity-20"></div>
                        )}

                        {selectedItem.isExclusive && (
                            <div className="absolute inset-x-0 bottom-10 text-center z-[110]">
                                <div className="inline-block glass px-8 py-6 rounded-2xl border border-accent-gold/30 bg-black/80">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <svg className="w-6 h-6 text-brand-red" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span className="text-brand-red font-bold text-lg tracking-widest">VIP ONLY</span>
                                    </div>
                                    <a
                                        href="#packages"
                                        onClick={(e) => { e.preventDefault(); setSelectedItem(null); document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' }) }}
                                        className="btn-primary inline-block px-8"
                                    >
                                        Desbloquear Acceso
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}

function GalleryItem({ item, onClick }) {
    const [isVisible, setIsVisible] = useState(false)
    const [ref, setRef] = useState(null)

    useEffect(() => {
        if (!ref) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                observer.disconnect()
            }
        }, { threshold: 0.1 })

        observer.observe(ref)

        return () => observer.disconnect()
    }, [ref])

    return (
        <div
            ref={setRef}
            className={`relative aspect-[3/4] bg-brand-gray overflow-hidden group cursor-pointer border border-white/5 hover:border-brand-red transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            onClick={onClick}
        >
            {/* Image */}
            {item.url ? (
                <img
                    src={item.url}
                    alt=""
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    className={`protected-media no-drag absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${item.isExclusive
                        ? 'blur-md grayscale'
                        : isVisible ? 'grayscale-0' : 'grayscale'
                        } ${!item.isExclusive && 'group-hover:scale-105'}`}
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 bg-brand-gray flex items-center justify-center">
                    <span className="text-3xl opacity-20">📷</span>
                </div>
            )}

            {/* Premium badge */}
            {item.isExclusive && (
                <div className="absolute top-2 right-2 bg-black/80 border border-brand-red/50 px-2 py-1 text-[10px] font-bold text-brand-red uppercase tracking-widest">
                    VIP
                </div>
            )}
        </div>
    )
}
