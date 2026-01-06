import { useState, useEffect } from 'react'
import { getGalleryImages } from '../services/firebaseStorage'
import { STORAGE_PATHS } from '../config/storage.config'

export default function Gallery() {
    const [freeItems, setFreeItems] = useState([])
    const [premiumItems, setPremiumItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('free')
    const [visibleItems, setVisibleItems] = useState(20)

    // Premium Photos Metadata - URLs will be loaded from Firebase Storage
    const premiumPhotosMetadata = [
        {
            id: 'p1',
            type: 'image',
            title: 'Despertar Caliente 🔥',
            description: 'Empezando el día de la manera más rica... ¿Me das los buenos días? 🤭',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p2',
            type: 'image',
            title: 'Tentación Prohibida 😈',
            description: 'Los extrañé tanto... aquí les traigo un regalito de regreso. 🫣',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p3',
            type: 'image',
            title: 'Juegos Traviesos 💋',
            description: 'Tengo un juego nuevo y quiero que seas mi jugador 1. 🔥',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p4',
            type: 'image',
            title: 'Pura Lujuria 👅',
            description: 'Cumpliendo mis deudas de la manera más deliciosa. 💦',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p5',
            type: 'image',
            title: 'Secretos Íntimos 💬',
            description: 'Un adelanto de lo que pasa cuando me escribes al privado... 😈',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p6',
            type: 'image',
            title: 'Tocándome Por Ti 🔥',
            description: 'Yo aquí pensando en ti... y tocándome un poquito. 🙈',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p7',
            type: 'image',
            title: 'Solo Para Tus Ojos 😏',
            description: 'Esta pose es solo para tus ojos. ¿Te gusta? ✨',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p8',
            type: 'image',
            title: 'Deseo Incontrolable 💦',
            description: 'No aguanto más las ganas... necesito sentirte ya. 🔥',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p9',
            type: 'image',
            title: 'Sabor Prohibido 🤤',
            description: 'Quiero que me la chupes toda... no dejes ni una gota. 🤤',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        },
        {
            id: 'p10',
            type: 'image',
            title: 'Fuego Colombiano 🔥',
            description: 'Y volví más caliente que nunca. ¿Estás listo? 💕',
            price: 1000,
            originalPrice: 2000,
            isExclusive: true
        }
    ];

    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 20)
    }

    useEffect(() => {
        async function loadImages() {
            try {
                setLoading(true)
                
                // Load free images from Firebase
                const freeImages = await getGalleryImages(STORAGE_PATHS.GALLERY)
                setFreeItems(freeImages.map(img => ({ ...img, isExclusive: false })))
                
                // Load premium photos from Firebase Storage
                const premiumPhotos = await getGalleryImages(STORAGE_PATHS.PHOTOS_PREMIUM)
                
                // Merge Firebase URLs with metadata
                const premiumWithMetadata = premiumPhotosMetadata.map(meta => {
                    // Find matching photo (p1.png, p2.png, etc.)
                    // Use exact match to avoid p1 matching with p10, p11, etc.
                    const firebasePhoto = premiumPhotos.find(p => {
                        const fileName = p.name.toLowerCase()
                        const searchId = meta.id.toLowerCase()
                        // Match exact filename: p1.png, p2.jpg, etc.
                        return fileName === `${searchId}.png` || 
                               fileName === `${searchId}.jpg` ||
                               fileName === `${searchId}.webp` ||
                               fileName.startsWith(`${searchId}.`) ||
                               fileName === searchId
                    })
                    
                    return {
                        ...meta,
                        url: firebasePhoto?.url || meta.url, // Fallback to local if not found
                        type: 'image'
                    }
                })
                
                setPremiumItems(premiumWithMetadata)
            } catch (err) {
                console.error('Error loading gallery:', err)
                // Fallback to metadata if Firebase fails
                setPremiumItems(premiumPhotosMetadata)
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
    }, [selectedItem, currentItems])

    const handleBuy = (e, item) => {
        e?.stopPropagation()
        const message = `Hola Michelle, quiero comprar la foto "${item.title}" por ₡${item.price}. ¿Cómo pago?`
        const url = `https://wa.me/50660539901?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <section id="gallery" className="section-padding relative bg-dark-bg">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-purple/10 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-brand-purple font-medium">Galería</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
                        Mi <span className="text-brand-purple">Contenido</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explora mi contenido gratuito o mira la sección premium para comprar fotos exclusivas sin censura.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('free')}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'free'
                            ? 'bg-gradient-to-r from-brand-purple to-brand-purple/50 text-white shadow-lg shadow-brand-purple/30'
                            : 'glass text-gray-300 hover:text-white'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Gratis ({freeItems.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('premium')}
                        className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'premium'
                            ? 'bg-gradient-to-r from-brand-purple to-brand-purple/50 text-white shadow-lg shadow-brand-purple/30'
                            : 'glass text-gray-300 hover:text-white'
                            }`}
                    >
                        <span className="absolute -top-4 -right-2 text-brand-purple text-xs font-black uppercase tracking-wider animate-pulse z-10 drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]">
                            🔞 FOTOS VIP
                        </span>
                        <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        Premium ({premiumItems.length})
                    </button>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
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
                                <GalleryItem key={item.id} item={item} onClick={() => setSelectedItem(item)} onBuy={handleBuy} />
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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
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

                    <div className="relative w-full h-[85vh] flex flex-col items-center justify-center p-4 md:p-10" onClick={e => e.stopPropagation()}>
                        {/* Content Container */}
                        <div className="relative flex flex-col items-center justify-center max-w-4xl w-full h-full">
                            {selectedItem.url ? (
                                <img
                                    src={selectedItem.url}
                                    alt=""
                                    draggable="false"
                                    onContextMenu={(e) => e.preventDefault()}
                                    className={`protected-media no-drag max-h-[60vh] md:max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl`}
                                />
                            ) : (
                                <div className="aspect-[3/4] max-h-[80vh] rounded-2xl bg-gradient-to-br from-primary-purple to-accent-pink/50 opacity-20"></div>
                            )}

                            {/* Premium Overlay Info - MOBILE OPTIMIZED */}
                            {selectedItem.isExclusive && (
                                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center z-[110] p-4 text-center">
                                    <div className="glass px-6 py-8 rounded-3xl border border-brand-purple/30 bg-black/80 max-w-sm w-full mx-auto relative overflow-hidden group">
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>

                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                                        <p className="text-brand-silver text-sm mb-6">{selectedItem.description}</p>

                                        <div className="flex items-center justify-center gap-3 mb-6">
                                            <span className="text-2xl font-bold text-brand-purple">₡{selectedItem.price}</span>
                                            {selectedItem.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">₡{selectedItem.originalPrice}</span>
                                            )}
                                        </div>

                                        <button
                                            onClick={(e) => handleBuy(e, selectedItem)}
                                            className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-4 animate-pulse"
                                        >
                                            <span>COMPRAR AHORA</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

function GalleryItem({ item, onClick, onBuy }) {
    const [isVisible, setIsVisible] = useState(false)
    const [ref, setRef] = useState(null)

    useEffect(() => {
        if (!ref) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                observer.disconnect()
            }
        }, { 
            threshold: 0.01,
            rootMargin: '50px' // Start loading 50px before entering viewport
        })

        observer.observe(ref)

        return () => observer.disconnect()
    }, [ref])

    return (
        <div
            ref={setRef}
            className={`group flex flex-col bg-brand-darker rounded-xl overflow-hidden border border-white/5 hover:border-brand-purple transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
                {item.url ? (
                    <img
                        src={isVisible ? item.url : undefined}
                        alt=""
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                        className={`protected-media no-drag w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110`}
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="w-full h-full bg-brand-gray flex items-center justify-center">
                        <span className="text-3xl opacity-20">📷</span>
                    </div>
                )}

                {/* Premium Badge */}
                {item.isExclusive && (
                    <div className="absolute top-2 right-2 bg-brand-purple text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg z-10">
                        VIP
                    </div>
                )}
            </div>

            {/* Info Card (Grid Footer) - Only for Premium */}
            {item.isExclusive && (
                <div className="p-4 flex flex-col gap-2 bg-white/5">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white text-sm line-clamp-1">{item.title}</h3>
                        <span className="text-brand-purple font-bold text-sm">₡{item.isExclusive ? 1000 : item.price}</span>
                    </div>
                    {item.description && (
                        <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                    )}

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onBuy(e, item)
                        }}
                        className="mt-2 w-full py-2 bg-brand-purple/10 border border-brand-purple/50 text-brand-purple text-xs font-bold rounded hover:bg-brand-purple hover:text-white transition-colors flex items-center justify-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>COMPRAR</span>
                    </button>
                </div>
            )}
        </div>
    )
}
