'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      // Simula colocar una cookie y redireccionar
      document.cookie = "cch_session=kyc_pending; path=/";
      router.push('/dashboard'); 
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans overflow-x-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-900 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <nav className="flex justify-between items-center p-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl font-black tracking-widest">CCH<span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">.</span></h1>
        <button 
          onClick={() => setShowOnboarding(true)}
          className="bg-transparent border border-[#00f0ff] text-[#00f0ff] px-6 py-2 rounded font-bold uppercase tracking-widest text-sm hover:bg-[#00f0ff]/10 transition-all">
          Acceso Privado
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center text-center px-6 mt-24 max-w-4xl mx-auto relative z-10">
        <div className="inline-block px-4 py-1 border border-gray-700 bg-gray-900/50 rounded-full text-xs text-gray-400 font-mono tracking-widest mb-6 uppercase">
          Ronda Semilla F&F Abierta
        </div>
        <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
          El Primer Exchange Privado <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-green-400">Respaldo en Activos Reales</span>
        </h2>
        <p className="text-gray-400 text-base md:text-xl max-w-2xl mb-10">
          Digitalización de capital respaldado por producción agrícola y forestal en la Sierra Nevada. Adquiere participaciones exclusivas hoy.
        </p>
        <button 
          onClick={() => setShowOnboarding(true)}
          className="bg-cyan-500 text-gray-900 px-8 py-4 rounded font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-105 transition-transform">
          Aplicar como Inversor
        </button>
      </main>

      {showOnboarding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl w-full max-w-md relative">
            <button onClick={() => setShowOnboarding(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
            
            <h3 className="text-2xl font-bold mb-2">
              {step === 1 ? 'Crear Credenciales' : 'Verificación KYC'}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {step === 1 ? 'Acceso seguro al portal.' : 'Sube tu documento para habilitar compras.'}
            </p>

            <form onSubmit={handleNextStep} className="space-y-4">
              {step === 1 ? (
                <>
                  <input type="text" placeholder="Nombre Legal Completo" required className="w-full bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none" />
                  <input type="email" placeholder="Correo Electrónico" required className="w-full bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none" />
                  <input type="password" placeholder="Contraseña Segura" required className="w-full bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-cyan-500 outline-none" />
                </>
              ) : (
                <>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer bg-gray-800/50">
                    <span className="text-3xl mb-2 block">📸</span>
                    <p className="text-sm text-gray-400 font-bold">Subir Foto de Cédula (Frente y Reverso)</p>
                    <p className="text-xs text-gray-500 mt-1">PNG o JPG máx 5MB</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer bg-gray-800/50">
                    <span className="text-3xl mb-2 block">🤳</span>
                    <p className="text-sm text-gray-400 font-bold">Subir Selfie con Documento</p>
                  </div>
                </>
              )}
              <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3 rounded uppercase tracking-widest text-sm hover:bg-cyan-500 hover:text-gray-900 transition-colors mt-4">
                {step === 1 ? 'Continuar ➔' : 'Enviar a Revisión y Entrar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
