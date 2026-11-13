'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [shares, setShares] = useState(50);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const pricePerShare = 50000;
  const fomoValue = shares * pricePerShare * 7.5;

  const handlePayment = async () => {
    setLoadingPayment(true);
    try {
      const res = await fetch('/api/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shares, totalCOP: shares * pricePerShare, userEmail: 'inversor@ejemplo.com' })
      });
      const data = await res.json();
      if(data.preferenceId) {
        // En un entorno real de MercadoPago Checkout Bricks, aquí se inicializaría el SDK de front-end
        alert("ID de pago generado: " + data.preferenceId + "\nAquí se abriría el Checkout Brick de MercadoPago.");
      }
    } catch(e) {
      console.error(e);
    }
    setLoadingPayment(false);
  };

  const NavItem = ({ id, icon, label }: { id: string, icon: string, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 p-2 md:p-3 w-full md:rounded-lg border-t-2 md:border-t-0 md:border md:justify-start transition-colors ${activeTab === id ? 'text-cyan-400 border-cyan-400 md:bg-gray-900/50 font-semibold' : 'text-gray-500 border-transparent hover:text-white'}`}>
      <span className="text-xl md:text-xl">{icon}</span>
      <span className="text-[10px] md:text-base uppercase md:capitalize tracking-wider md:tracking-normal">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#070709] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR PARA DESKTOP/IPAD */}
      <aside className="hidden md:flex w-64 bg-[#14161c]/80 backdrop-blur-xl flex-col h-full border-r border-gray-800 z-20">
        <div className="p-8 border-b border-gray-800">
          <h1 className="text-3xl font-black tracking-widest text-white">CCH<span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">.</span></h1>
          <p className="text-xs text-gray-500 font-mono mt-1 tracking-widest">PRIVATE EXCHANGE</p>
        </div>
        <nav className="flex-1 p-6 space-y-4">
          <NavItem id="dashboard" icon="◱" label="Dashboard" />
          <NavItem id="wallet" icon="◎" label="Wallet" />
          <NavItem id="mercado" icon="◨" label="Secundario" />
          <NavItem id="boveda" icon="◲" label="Bóveda Legal" />
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto relative z-10 pb-24 md:pb-0">
        <div className="p-4 md:p-10 max-w-6xl mx-auto space-y-6 md:space-y-8">
          
          {/* HEADER MOBILE */}
          <div className="md:hidden flex justify-between items-center mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-cyan-500/30 flex items-center justify-center text-sm font-bold">IN</div>
                <div>
                    <p className="text-sm font-bold text-gray-200">Inversor No. 42</p>
                    <p className="text-xs text-green-400 font-mono">KYC Verificado</p>
                </div>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <section className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* FOMO Y PORTAFOLIO */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                <div className="bg-[#14161c]/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-800">
                  <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-1">Tu Portafolio</p>
                  <h2 className="text-4xl md:text-6xl font-black font-mono text-gray-600 mb-4">$0 <span className="text-xl">COP</span></h2>
                </div>
                
                <div className="bg-[#00f0ff]/10 border border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.15)] p-6 md:p-8 rounded-2xl relative">
                  <p className="text-xs md:text-sm text-cyan-400 uppercase tracking-widest mb-1">Valor en 5 años:</p>
                  <h2 className="text-4xl md:text-6xl font-black font-mono text-[#00f0ff] mb-4">${fomoValue.toLocaleString('es-CO')} <span className="text-xl">COP</span></h2>
                </div>
              </div>

              {/* TERMINAL COMPRA Y CHECKOUT */}
              <div className="bg-[#14161c]/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-800">
                <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2"><span className="text-cyan-400">⚡</span> Adquisición</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-xs text-gray-400 uppercase tracking-wider">Cantidad (Acciones)</label>
                      <span className="text-3xl font-black font-mono text-white">{shares}</span>
                    </div>
                    {/* Touch-friendly slider */}
                    <input 
                      type="range" min="10" max="845" value={shares} 
                      onChange={(e) => setShares(Number(e.target.value))}
                      className="w-full accent-cyan-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-800">
                      <div className="flex justify-between text-cyan-400 font-bold">
                        <span>Total:</span>
                        <span className="text-xl font-mono">${(shares * pricePerShare).toLocaleString('es-CO')} COP</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between space-y-4">
                     <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={contractAccepted}
                            onChange={(e) => setContractAccepted(e.target.checked)}
                            className="mt-1 w-5 h-5 accent-cyan-500 bg-gray-800 border-gray-600 rounded cursor-pointer" 
                          />
                          <span className="text-xs text-gray-400">Acepto el <strong>Lock-up Period de 365 días</strong> y el contrato de usufructo.</span>
                        </label>
                    </div>
                    <button 
                      disabled={!contractAccepted || loadingPayment}
                      onClick={handlePayment}
                      className={`w-full font-bold py-4 transition-all uppercase tracking-widest text-sm rounded ${
                        contractAccepted 
                          ? 'bg-cyan-500 text-gray-900 hover:shadow-[0_0_20px_#00f0ff]' 
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}>
                      {loadingPayment ? 'Procesando...' : (contractAccepted ? 'Pagar con Mercado Pago' : 'Aceptar Contrato')}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab !== 'dashboard' && (
             <section className="bg-[#14161c]/80 p-8 rounded-2xl border border-gray-800 text-center py-20 text-gray-500">
                <span className="text-4xl block mb-4">🚧</span>
                <p>La sección <strong>{activeTab}</strong> está en construcción para la Fase 2.</p>
             </section>
          )}
        </div>
      </main>

      {/* BOTTOM NAV PARA MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#070709]/95 backdrop-blur-xl border-t border-gray-800 flex justify-between px-2 pb-safe z-50">
          <NavItem id="dashboard" icon="◱" label="Panel" />
          <NavItem id="wallet" icon="◎" label="Wallet" />
          <NavItem id="mercado" icon="◨" label="Mercado" />
          <NavItem id="boveda" icon="◲" label="Bóveda" />
      </nav>
    </div>
  );
}
