export default function About() {
    return (
        <section id="about" className="section-padding bg-brand-dark relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gray/20 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Video Container - Noir Style */}
                <div className="relative group">
                    <div className="aspect-[9/16] md:aspect-[3/4] bg-brand-gray relative flex items-center justify-center overflow-hidden border border-brand-red group-hover:border-brand-red/80 transition-colors duration-300">
                        <video
                            src="/videos/about_cover.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>

                        {/* Overlay text ensuring user knows it's a video */}
                        <div className="absolute bottom-6 left-6 text-brand-muted text-xs uppercase tracking-widest border border-white/10 px-4 py-2 bg-black/50 backdrop-blur-sm pointer-events-none">
                            <span className="text-brand-red animate-pulse">●</span> PREVIEW
                        </div>
                    </div>
                    {/* Red Frame Accent */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-brand-red"></div>
                </div>

                {/* Content */}
                <div className="text-left">
                    <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-4 block">Sobre mí</span>
                    <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        MÁS ALLÁ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-muted">DE LAS CÁMARAS</span>
                    </h2>

                    <p className="text-brand-silver text-lg mb-8 font-light leading-relaxed">
                        Bienvenido a mi espacio más íntimo.
                        Aquí no hay filtros ni censura, solo yo,
                        en mi versión más divertida y pervertida lugar donde las fantasías
                        se encuentran con la realidad.
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-12">
                        <div className="border-l border-brand-red/30 pl-6">
                            <h4 className="text-white font-bold uppercase tracking-widest mb-2">Pasión</h4>
                            <p className="text-brand-muted text-sm">Contenido creado con intensidad y dedicación.</p>
                        </div>
                        <div className="border-l border-brand-red/30 pl-6">
                            <h4 className="text-white font-bold uppercase tracking-widest mb-2">Exclusividad</h4>
                            <p className="text-brand-muted text-sm">Material que nunca verás en redes sociales explicito donde podras verme tocandome hasta regarme todita.</p>
                        </div>
                    </div>

                    <a
                        href="#gallery"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block text-brand-red font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-brand-red pb-1 cursor-pointer"
                    >
                        Conóceme mejor
                    </a>
                </div>
            </div>
        </section>
    )
}
