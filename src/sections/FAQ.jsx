import { useState } from 'react'

const faqs = [
    {
        question: "¿Cómo realizo el pago?",
        answer: "Amor acepto SINPE Móvil y transferencias bancarias directas. Al hacer clic en 'Comprar' te llevaré a mi WhatsApp para darte los datos. Es rápido y seguro."
    },
    {
        question: "¿Es discreto?",
        answer: "Bebe totalmente. En tu estado de cuenta no aparecerá nada relacionado con contenido para adultos. Tu privacidad es mi prioridad."
    },
    {
        question: "¿En cuánto tiempo recibo el acceso?",
        answer: "Amor inmediatamente después de confirmar tu comprobante de pago, te envíare el material o el acceso al paquete que elegiste."
    },
    {
        question: "¿El contenido es real?",
        answer: "Sí amor, todo el contenido es creado por mí y recibirás exactamente lo que ves en las descripciones del paquete."
    },
    {
        question: "¿Haces citas personales?",
        answer: "Amor sí, pero por motivos de SEGURIDAD es requisito haber comprado contenido previamente y demostrar fidelidad para acceder a encuentros presenciales."
    },
    {
        question: "¿De dónde eres?",
        answer: "Soy de Costa Rica . Estoy dispuesta a atenderte y hacerte pasar un momento inolvidable."
    },
    {
        question: "¿Eres amiga de Camila?",
        answer: "Sí, Camila es mi amiga muy especial.",
        hasButton: true,
        buttonText: "Visitar página de Camila",
        buttonUrl: "https://camila2026.netlify.app/"
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <section className="py-20 bg-brand-dark px-6 border-t border-white/5">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">
                    PREGUNTAS <span className="text-brand-purple">FRECUENTES</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-brand-silver">{faq.question}</span>
                                <span className={`text-brand-purple font-bold text-xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-6 pb-6 border-t border-white/5 pt-4">
                                    <p className="text-brand-muted text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                    {faq.hasButton && (
                                        <a
                                            href={faq.buttonUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-4 px-6 py-2 bg-brand-purple text-white text-xs font-bold rounded hover:bg-white hover:text-brand-purple transition-colors"
                                        >
                                            {faq.buttonText}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
