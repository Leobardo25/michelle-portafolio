import { useState, useEffect } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../config/firebase'
import STORAGE_PATHS from '../config/storage.config'

export default function About() {
    const [showTapHint, setShowTapHint] = useState(true)
    const [videoUrl, setVideoUrl] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadVideo = async () => {
            try {
                const videoRef = ref(storage, `${STORAGE_PATHS.VIDEOS_PREVIEW}/about_cover.mp4`)
                const url = await getDownloadURL(videoRef)
                setVideoUrl(url)
            } catch (error) {
                console.error('Error loading preview video:', error)
            } finally {
                setLoading(false)
            }
        }
        loadVideo()
    }, [])

    return (
        <section id="about" className="section-padding bg-brand-dark relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gray/20 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Video Container - Noir Style */}
                <div className="relative group">
                    <div 
                        className="aspect-[9/16] md:aspect-[3/4] bg-brand-gray relative flex items-center justify-center overflow-hidden border border-brand-purple group-hover:border-brand-purple/80 transition-colors duration-300"
                        onClick={() => setShowTapHint(false)}
                    >
                        {!loading && videoUrl && (
                            <video
                                src={videoUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                            />
                        )}
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-brand-gray">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>

                        {/* Tap hint for mobile - subtle animation */}
                        {showTapHint && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden pointer-events-none transition-opacity duration-300">
                                <div className="flex flex-col items-center gap-2">
                                    {/* Text "Tócame" */}
                                    <span className="text-brand-purple text-xs font-bold uppercase tracking-wider animate-pulse">
                                        Tócame
                                    </span>
                                    {/* Hand icon */}
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-ping opacity-20">
                                            <svg className="w-12 h-12 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                            </svg>
                                        </div>
                                        <svg className="w-12 h-12 text-brand-purple opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Overlay text ensuring user knows it's a video */}
                        <div className="absolute bottom-6 left-6 text-brand-muted text-xs uppercase tracking-widest border border-white/10 px-4 py-2 bg-black/50 backdrop-blur-sm pointer-events-none">
                            <span className="text-brand-purple animate-pulse">●</span> PREVIEW
                        </div>
                    </div>
                    {/* Red Frame Accent */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-brand-purple"></div>
                </div>

                {/* Content */}
                <div className="text-left">
                    <span className="text-brand-purple font-bold uppercase tracking-widest text-sm mb-4 block">Sobre mí</span>
                    <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        MÁS ALLÁ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-muted">DE LAS CÁMARAS</span>
                    </h2>

                    <p className="text-brand-silver text-lg mb-8 font-light leading-relaxed">
                        Bienvenido a mi rincón más íntimo.
                        Aquí no hay filtros ni censura, solo yo,
                        tu colombiana favorita en su versión más traviesa y pervertida,
                        donde tus fantasías se vuelven realidad.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-12">
                        <div className="border-l border-brand-purple/30 pl-6">
                            <h4 className="text-white font-bold uppercase tracking-widest mb-2">Pasión Latina</h4>
                            <p className="text-brand-muted text-sm">Contenido caliente creado con toda la intensidad colombiana.</p>
                        </div>
                        <div className="border-l border-brand-purple/30 pl-6">
                            <h4 className="text-white font-bold uppercase tracking-widest mb-2">Sin Límites</h4>
                            <p className="text-brand-muted text-sm">Material explícito que jamás verás en redes, donde me verás tocándome hasta acabar completita.</p>
                        </div>
                    </div>

                    <a
                        href="#gallery"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block text-brand-purple font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-brand-purple pb-1 cursor-pointer"
                    >
                        Conóceme mejor
                    </a>
                </div>
            </div>
        </section>
    )
}
