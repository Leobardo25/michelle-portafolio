import { useState } from 'react'

const ACCESS_CODE = 'MICHELLE2026'

export default function PasswordGate({ onSuccess }) {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [isShaking, setIsShaking] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (code === ACCESS_CODE) {
            onSuccess()
        } else {
            setError('Código incorrecto')
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 500)
            setCode('')
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary-purple/30 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent-pink/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Main card */}
            <div
                className={`glass rounded-3xl p-8 md:p-12 max-w-md w-full text-center relative z-10 animate-fade-in ${isShaking ? 'animate-shake' : ''}`}
                style={{
                    animation: isShaking ? 'shake 0.5s ease-in-out' : undefined
                }}
            >
                {/* Logo/Icon */}
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent-pink to-primary-purple flex items-center justify-center glow-pink">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-text-wave">
                    Contenido Exclusivo
                </h1>

                <p className="text-gray-300 mb-8">
                    Ingresa el código de acceso para continuar
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="password"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value)
                                setError('')
                            }}
                            placeholder="Código de acceso"
                            className="w-full px-6 py-4 bg-black/50 border-2 border-primary-purple/50 rounded-xl text-white placeholder-gray-500 focus:border-accent-pink focus:outline-none transition-all duration-300 text-center text-lg tracking-widest"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-accent-pink text-sm animate-fade-in">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="btn-primary w-full"
                    >
                        Acceder
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-gray-400 text-sm mb-4">
                        ¿No tienes el código? Escríbeme:
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="https://www.instagram.com/camiramirezcr_?igsh=MTZxeDAzOGhjamQyMQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/share/1AUzJQCupf/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
        </div>
    )
}
