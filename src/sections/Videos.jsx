import { useState, useEffect, useRef } from 'react'
import { getGalleryImages } from '../services/firebaseStorage'

// Videos premium metadata - URLs will be loaded from Firebase Storage
const premiumVideosMetadata = [
    {
        id: 'premium1',
        firebasePath: 'videos-premium/premium1.mp4',
        posterPath: 'videos-premium/thumbnails/premium1.jpg', // Optional: add thumbnails later
        title: 'Culiada bien rica',
        description: 'Un momento íntimo donde me cojen bien rico y me encanta. Te encantará ver cómo termina conmigo.',
        price: '₡5,000',
        whatsappMessage: 'Hola, quiero comprar el video "Culiada bien rica" ❤️',
        isExclusive: true
    },
    {
        id: 'premium2',
        firebasePath: 'videos-premium/premium2.mp4',
        posterPath: 'videos-premium/thumbnails/premium2.jpg',
        title: 'Monjita pervertida para ti',
        description: 'Cuando estoy aburrida y sola en casa, pasan cosas... Descubre mi lado más travieso.',
        price: '₡5,000',
        whatsappMessage: 'Hola, quiero comprar el video "Monjita pervertida para ti" ❤️',
        isExclusive: true
    },
    {
        id: 'premium3',
        firebasePath: 'videos-premium/premium3.mp4',
        posterPath: 'videos-premium/thumbnails/premium3.jpg',
        title: 'Sin Ropa es Mejor',
        description: 'Video anal donde me riego mucho y disfruto cada momento. Un video explícito sin censura donde no dejo nada a la imaginación.',
        price: '₡7,000',
        whatsappMessage: 'Hola, quiero comprar el video "Anal" ❤️',
        isExclusive: true
    },
    {
        id: 'premium4',
        firebasePath: 'videos-premium/premium4.mp4',
        posterPath: 'videos-premium/thumbnails/premium4.jpg',
        title: 'Final Inesperado',
        description: 'Este video tiene un final que te dejará con la boca abierta. Atrévete a verlo completo.',
        price: '₡7,000',
        whatsappMessage: 'Hola, quiero comprar el video "Final Inesperado" ❤️',
        isExclusive: true
    }
]

export default function Videos() {
    const [freeVideos, setFreeVideos] = useState([])
    const [premiumVideos, setPremiumVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('premium')
    const [visibleItems, setVisibleItems] = useState(6)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [isLocked, setIsLocked] = useState(false)
    const videoRef = useRef(null)

    const currentVideos = activeTab === 'free' ? freeVideos : premiumVideos

    const handleNext = (e) => {
        e?.stopPropagation()
        if (!selectedVideo) return
        const currentIndex = currentVideos.findIndex(v => v.id === selectedVideo.id)
        const nextIndex = (currentIndex + 1) % currentVideos.length
        setSelectedVideo(currentVideos[nextIndex])
        setIsLocked(false)
    }

    const handlePrev = (e) => {
        e?.stopPropagation()
        if (!selectedVideo) return
        const currentIndex = currentVideos.findIndex(v => v.id === selectedVideo.id)
        const prevIndex = (currentIndex - 1 + currentVideos.length) % currentVideos.length
        setSelectedVideo(currentVideos[prevIndex])
        setIsLocked(false)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedVideo) return
            if (e.key === 'ArrowRight') handleNext()
            if (e.key === 'ArrowLeft') handlePrev()
            if (e.key === 'Escape') setSelectedVideo(null)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedVideo, currentVideos])

    useEffect(() => {
        async function loadVideos() {
            try {
                setLoading(true)
                setError(null)
                
                // Load free videos from Firebase
                const free = await getGalleryImages('videos-free')
                setFreeVideos(free.map(v => ({ ...v, isExclusive: false })))
                
                // Load premium videos from Firebase Storage
                const premium = await getGalleryImages('videos-premium')
                
                // Load preview thumbnails from Firebase Storage
                const previews = await getGalleryImages('videos-preview').catch(() => [])
                
                // Merge Firebase URLs with metadata
                const premiumWithMetadata = premiumVideosMetadata.map(meta => {
                    // Find matching video (premium1.mp4, premium2.mp4, etc.)
                    // Use exact match to avoid premium1 matching with premium10, premium11, etc.
                    const firebaseVideo = premium.find(v => {
                        const fileName = v.name.toLowerCase()
                        const searchId = meta.id.toLowerCase()
                        // Match exact filename: premium1.mp4, premium2.mp4, etc.
                        return fileName === `${searchId}.mp4` || 
                               fileName === `${searchId}.webm` ||
                               fileName.startsWith(`${searchId}.`) ||
                               fileName === searchId
                    })
                    
                    // Find matching preview/thumbnail
                    const previewImage = previews.find(p => {
                        const fileName = p.name.toLowerCase()
                        const searchId = meta.id.toLowerCase()
                        // Match exact filename for thumbnails
                        return fileName === `${searchId}.jpg` || 
                               fileName === `${searchId}.png` ||
                               fileName === `${searchId}.webp` ||
                               fileName.startsWith(`${searchId}.`)
                    })
                    
                    return {
                        ...meta,
                        url: firebaseVideo?.url || null,
                        poster: previewImage?.url || null
                    }
                })
                
                setPremiumVideos(premiumWithMetadata)
            } catch (err) {
                console.error('Error loading videos:', err)
                // Fallback to metadata without URLs if Firebase fails
                setPremiumVideos(premiumVideosMetadata)
            } finally {
                setLoading(false)
            }
        }
        loadVideos()
    }, [])

    const handleLoadMore = () => {
        setVisibleItems(prev => prev + 6)
    }

    const handleVideoEnded = () => {
        if (selectedVideo?.isExclusive) {
            setIsLocked(true)
            if (videoRef.current) {
                videoRef.current.currentTime = 0
                videoRef.current.play()
            }
        }
    }

    const handleBuy = () => {
        const phone = "50660288198"
        const message = selectedVideo?.whatsappMessage || "Hola, quiero comprar un video ❤️"
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <section id="videos" className="section-padding bg-black relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="text-brand-red font-medium">Contenido Multimedia</span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        MIS <span className="text-brand-red">VIDEOS</span>
                    </h2>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveTab('free')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'free'
                                ? 'bg-gradient-to-r from-brand-red to-brand-red/50 text-white shadow-lg shadow-brand-red/30'
                                : 'glass text-gray-300 hover:text-white'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Gratis ({freeVideos.length})
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
                            Premium ({premiumVideos.length})
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 border border-red-500/30 bg-red-500/10 rounded-xl">
                        <p className="text-red-200">{error}</p>
                    </div>
                ) : currentVideos.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentVideos.slice(0, visibleItems).map((video) => (
                            <div
                                key={video.id}
                                className="group relative bg-brand-gray aspect-[3/4] overflow-hidden border border-white/5 hover:border-brand-red transition-colors duration-300 rounded-xl cursor-pointer"
                                onClick={() => { setSelectedVideo(video); setIsLocked(false); }}
                            >
                                {/* Video with poster - NO autoplay on hover to save bandwidth */}
                                <video
                                    src={video.url}
                                    poster={video.poster || undefined}
                                    className={`w-full h-full object-cover transition-all duration-500 protected-media no-drag ${video.isExclusive ? 'opacity-80' : 'opacity-80 group-hover:opacity-100'}`}
                                    muted
                                    loop
                                    preload="metadata"
                                    playsInline
                                />
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-brand-red/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                                {video.isExclusive && (
                                    <>
                                        <div className="absolute top-2 right-2 bg-brand-red text-white text-xs font-bold px-2 py-1 uppercase tracking-widest pointer-events-none rounded-sm">
                                            PREMIUM
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                            <p className="text-white text-xs font-bold truncate">{video.title}</p>
                                            <p className="text-brand-red text-xs font-bold">{video.price}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                        <p className="text-brand-muted uppercase tracking-widest">
                            No hay videos disponibles
                        </p>
                    </div>
                )}

                {currentVideos.length > visibleItems && (
                    <div className="text-center mt-12">
                        <button
                            onClick={handleLoadMore}
                            className="btn-outline px-8 py-3 text-xs"
                        >
                            VER MÁS VIDEOS
                        </button>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
                    onClick={() => setSelectedVideo(null)}
                >
                    {/* Background Blur */}
                    <div className="absolute inset-0 z-0 opacity-40 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl"></div>
                    </div>

                    {/* Navigation */}
                    <button onClick={handlePrev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white p-2 md:p-4 transition-all hover:scale-125">
                        <svg className="w-8 h-8 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNext} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white p-2 md:p-4 transition-all hover:scale-125">
                        <svg className="w-8 h-8 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Close */}
                    <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2">
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {/* Video Container */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-0 md:p-4" onClick={e => e.stopPropagation()}>
                        <div className="relative w-full h-full md:h-auto md:max-h-[85vh] md:max-w-5xl md:rounded-xl overflow-hidden shadow-2xl bg-black flex items-center justify-center">
                            <video
                                ref={videoRef}
                                src={selectedVideo.url}
                                className={`w-full h-full md:w-auto md:h-auto md:max-h-[85vh] object-contain transition-all duration-700 ${isLocked ? 'blur-md opacity-40 scale-105' : ''}`}
                                autoPlay
                                controls={!isLocked}
                                controlsList="nodownload nofullscreen noremoteplayback"
                                disablePictureInPicture
                                onContextMenu={(e) => e.preventDefault()}
                                onEnded={handleVideoEnded}
                                loop={isLocked}
                                muted={isLocked}
                                playsInline
                            />

                            {/* Locked Overlay */}
                            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isLocked ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'}`}>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center drop-shadow-lg animate-pulse">
                                    VIDEO FINALIZADO
                                </h3>
                                <p className="text-gray-300 text-center mb-8 max-w-md px-4 drop-shadow-md">
                                    {selectedVideo.description}
                                </p>

                                <div className="bg-black/80 border border-brand-red/50 p-6 rounded-2xl backdrop-blur-md text-center transform hover:scale-105 transition-transform duration-300 mx-4">
                                    <p className="text-brand-muted text-sm uppercase tracking-widest mb-2">Desbloquear Completo</p>
                                    <p className="text-4xl font-bold text-white mb-6 animate-pulse">{selectedVideo.price}</p>
                                    <button
                                        onClick={handleBuy}
                                        className="bg-brand-red text-white py-4 px-10 rounded-full font-bold uppercase hover:bg-white hover:text-brand-red transition-colors shadow-[0_0_20px_rgba(225,29,72,0.5)] flex items-center gap-2 mx-auto"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.48s1.066 2.875 1.215 3.072c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                        COMPRAR AHORA
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Title & Price Below Video (Mobile Friendly) */}
                        {!isLocked && (
                            <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 text-center animate-fade-in z-50 bg-gradient-to-t from-black via-black/80 to-transparent md:static md:bg-none md:mt-4 md:p-0">
                                <h3 className="text-2xl font-bold text-white drop-shadow-md">{selectedVideo.title}</h3>
                                {selectedVideo.isExclusive && <p className="text-brand-red font-bold text-lg drop-shadow-md">{selectedVideo.price}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}
