import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({ name: '', email: '', message: '' })
        }, 3000)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <section id="contact" className="section-padding relative bg-dark-bg">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/10 to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-accent-gold font-medium">Contacto</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
                        <span className="gradient-text">Hablemos</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        ¿Tienes alguna pregunta o propuesta? Me encantaría escucharte.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-accent-pink/30 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-primary-purple flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Email</h3>
                                    <p className="text-gray-400">contacto@michelle.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-accent-gold/30 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-gold to-accent-pink flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Horario de respuesta</h3>
                                    <p className="text-gray-400">24-48 horas para suscriptores</p>
                                    <p className="text-accent-pink text-sm">VIP: respuesta prioritaria</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-primary-purple/30 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-purple to-accent-pink flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Colaboraciones</h3>
                                    <p className="text-gray-400">Abierta a propuestas profesionales</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-dark-card rounded-3xl p-8 border border-dark-border">
                        {isSubmitted ? (
                            <div className="h-full flex items-center justify-center text-center">
                                <div>
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-pink to-accent-gold flex items-center justify-center glow-pink">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold gradient-text mb-2">¡Mensaje enviado!</h3>
                                    <p className="text-gray-400">Te responderé lo antes posible 💕</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-accent-pink focus:outline-none focus:ring-1 focus:ring-accent-pink transition-all"
                                        placeholder="Tu nombre"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-accent-pink focus:outline-none focus:ring-1 focus:ring-accent-pink transition-all"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-accent-pink focus:outline-none focus:ring-1 focus:ring-accent-pink transition-all resize-none"
                                        placeholder="Escribe tu mensaje aquí..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-full"
                                >
                                    Enviar mensaje
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
