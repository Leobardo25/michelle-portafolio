import { useState } from 'react'

const faqs = [
    {
        question: "¿Cómo realizo el pago?",
        answer: "Aceptamos SINPE Móvil y transferencias bancarias directas. Al hacer clic en 'Comprar' te llevaré a mi WhatsApp para darte los datos. Es rápido y seguro."
    },
    {
        question: "¿Es discreto?",
        answer: "Totalmente. En tu estado de cuenta no aparecerá nada relacionado con contenido para adultos. Tu privacidad es mi prioridad."
    },
    {
        question: "¿En cuánto tiempo recibo el acceso?",
        answer: "Inmediatamente después de confirmar tu comprobante de pago, te envío el material o el acceso al paquete que elegiste."
    },
    {
        question: "¿El contenido es real?",
        answer: "Sí, todo el contenido es creado por mí y recibirás exactamente lo que ves en las descripciones del paquete."
    },
    {
        question: "¿Haces citas personales?",
        answer: "Sí, pero por motivos de seguridad es requisito haber comprado contenido previamente y demostrar fidelidad para acceder a encuentros presenciales."
    },
    {
        question: "¿De dónde eres?",
        answer: "Soy de Costa Rica 🇨🇷. Estoy dispuesta a atenderte y hacerte pasar un momento inolvidable."
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <section className="py-20 bg-brand-dark px-6 border-t border-white/5">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">
                    PREGUNTAS <span className="text-brand-red">FRECUENTES</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-bold text-brand-silver">{faq.question}</span>
                                <span className={`text-brand-red font-bold text-xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="px-6 pb-6 text-brand-muted text-sm leading-relaxed border-t border-white/5 pt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
