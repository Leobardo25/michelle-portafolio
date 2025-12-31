export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-bg border-t border-primary-purple/20 py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="font-display text-2xl font-bold gradient-text">
                        Camila
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Camila. Todos los derechos reservados.
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-primary-purple/10 text-center">
                    <p className="text-gray-600 text-xs">
                        Contenido exclusivo para mayores de 18 años. Al acceder, confirmas que tienes la edad legal.
                    </p>
                </div>
            </div>
        </footer>
    )
}
