const packages = [
    {
        id: 'welcome',
        name: 'PAQUETE DE BIENVENIDA',
        price: '₡5,000',
        oldPrice: '₡10,000',
        description: (
            <>
                Un videito completo de 9 min<br />
                Tocándome mi panochita rosadita hasta que me veas
                regarme todita (squirt💦).<br />
                me escucharas gemir en mi delicioso acento colombiano<br />
                ¿Podrás aguantar hasta el final? 🔥<br />
                Sin censura + Número de WhatsApp privado.
            </>
        ),
        features: [
            'Video 9 min Sin Censura',
            'Número WhatsApp Personal',
            'Chat Ilimitado',
            'Experiencia muy Intensa',
        ],
        message: 'Quiero comprar el paquete de bienvenida \u2764\uFE0F',
        highlight: false,
    },
    {
        id: 'basic',
        name: 'BÁSICO',
        price: '₡5,000',
        oldPrice: '₡8,000',
        description: (
            <>
                Corazon este paquete tiene:<br />
                30 fotos muy explícitas y muy ricas y de alta calidad<br />
                1 video de 9 min sin censura donde me veras hacer de todo😈<br />
                (estilo TikTok).
            </>
        ),
        features: [
            'Fotos Explícitas de alta calidad',
            'Video 9 min Sin Censura muy explicito',
            'Número WhatsApp Personal',
            'Chat Ilimitado',
            'Experiencia muy Intensa',
        ],
        message: 'Quiero comprar el paquete básico \u2764\uFE0F',
        highlight: false,
    },
    {
        id: 'premium',
        name: 'PREMIUM',
        price: '₡12,000',
        oldPrice: '₡15,000',
        description: (
            <>
                Bebe experiencia completa:<br />
                Dos video MUY explícito donde me mastubo en uno mi panochita y 
                en otro el ano hasta regarme me veras en mi punto mas vulnerable🔥<br />
                + 30 foticos<br />
                Y un video a eleccion de la seccion de los videos PREMIUM
            </>
        ),
        features: [
            'Video MUY Explícito (ANAL)',
            'Video MUY Explícito (Vaginal)',
            '30 Fotos Exclusivas',
            'Acceso a citas personales 💕',
            'Acceso Total',
        ],
        message: 'Quiero comprar el paquete premium \u2764\uFE0F',
        highlight: true, // Uses Diamond styling
    },
]

export default function Packages() {
    const phoneNumber = "50660813117"

    const handleBuy = (message) => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    return (
        <section id="packages" className="section-padding bg-brand-dark relative z-10">
            <div className="max-w-7xl mx-auto">
                {/* Header Subtle */}
                <div className="text-center mb-20">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        MIS <span className="text-brand-purple">PAQUETES</span>
                    </h2>
                    <p className="text-brand-muted uppercase tracking-widest text-sm">
                        Únete a mi círculo íntimo
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`p-10 rounded-sm relative flex flex-col ${pkg.highlight
                                ? 'card-diamond transform md:-translate-y-4'
                                : 'card-premium'
                                }`}
                        >
                            {pkg.highlight && (
                                <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 uppercase tracking-widest shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                                    Mejor Valor
                                </div>
                            )}

                            <h3 className="text-brand-silver font-bold uppercase tracking-widest mb-2 text-sm">{pkg.name}</h3>

                            {/* Pricing with Discount */}
                            <div className="flex items-baseline mb-6 gap-3">
                                <span className={`text-4xl font-display font-bold ${pkg.highlight ? 'text-brand-purple' : 'text-white'}`}>
                                    {pkg.price}
                                </span>
                                <span className="text-brand-muted text-lg line-through decoration-brand-purple decoration-2">
                                    {pkg.oldPrice}
                                </span>
                            </div>

                            <p className="text-brand-muted text-sm mb-8 border-b border-white/5 pb-8 min-h-[80px]">
                                {pkg.description}
                            </p>

                            <ul className="space-y-4 mb-10 flex-1">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-brand-silver">
                                        <span className="text-brand-purple font-bold">✓</span> {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleBuy(pkg.message)}
                                className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all ${pkg.highlight
                                    ? 'bg-brand-purple text-white hover:bg-white hover:text-brand-dark shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]'
                                    : 'border border-white/20 text-white hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple/5'
                                    }`}
                            >
                                COMPRAR PAQUETE
                            </button>
                        </div>
                    ))}
                </div>

                {/* Secure Badge */}
                <div className="text-center mt-16 text-brand-muted text-xs uppercase tracking-widest flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-help">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    Compra Directa y Discreta por WhatsApp
                </div>
            </div>
        </section>
    )
}
