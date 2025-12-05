/**
 * Stellar Loyalty System - Main Page
 RBC 
 */

'use client';

import { useState } from 'react';
import WalletConnection from '@/components/WalletConnection';
import BalanceDisplay from '@/components/BalanceDisplay';
import PaymentForm from '@/components/PaymentForm';
import TransactionHistory from '@/components/TransactionHistory';

export default function Home() {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleConnect = (key: string) => {
    setPublicKey(key);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setPublicKey('');
    setIsConnected(false);
  };

  const handlePaymentSuccess = () => {
    // Refresh balance and transaction history
    setRefreshKey(prev => prev + 1);
  };

  return (
    // Stellar Temalı Arkaplan (Derin Uzay)
    <div className="min-h-screen bg-[url('/bg-stars.png')] bg-cover bg-fixed bg-no-repeat bg-[#0b0c15]">
      <div className="min-h-screen bg-gradient-to-br from-black/80 via-[#1e1035]/80 to-[#0c2444]/80 backdrop-blur-sm">
        
        {/* Header */}
        <header className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-[#0b0c15]/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* LOGO ALANI: Buraya projenin logosunu koyuyoruz */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  {/* ÖNEMLİ: image_a2f639.png dosyasını projenin 'public' klasörüne koymalısın */}
                  <img 
                    src="/logo.png" 
                    alt="Stellar Loyalty Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                    Stellar Sadakat Puanı
                  </h1>
                  <p className="text-purple-300/60 text-xs tracking-wider uppercase">Blockchain Ödül Sistemi</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="https://stellar.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white hover:shadow-[0_0_10px_white] transition-all duration-300 text-sm"
                >
                  Stellar.org
                </a>
                <div className="px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-xs text-purple-300">
                  ● Testnet Aktif
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Welcome Banner - Sadece bağlanmamışsa görünür */}
          {!isConnected && (
            <div className="mb-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl transition-all duration-1000 group-hover:opacity-75"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  Geleceğin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Ödül Sistemine</span> Hoş Geldiniz
                </h2>
                <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed">
                  Cüzdanınızı bağlayarak sadakat puanlarınızı görüntüleyin, mağaza içi harcamalarınızda XLM kullanın ve ödüller kazanın. Hepsi Stellar ağının gücüyle.
                </p>
              </div>
            </div>
          )}

          {/* Wallet Connection Component */}
          <div className="mb-10 flex justify-center">
            <WalletConnection onConnect={handleConnect} onDisconnect={handleDisconnect} />
          </div>

          {/* Dashboard Content - Sadece bağlanınca görünür */}
          {isConnected && publicKey && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Balance Section */}
              <div key={`balance-${refreshKey}`} className="transform hover:scale-[1.01] transition-transform duration-300">
                <BalanceDisplay publicKey={publicKey} />
              </div>

              {/* Grid Layout */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Payment Form */}
                <div className="bg-[#13141f]/60 backdrop-blur-md rounded-2xl border border-white/5 p-1 shadow-lg">
                  <PaymentForm publicKey={publicKey} onSuccess={handlePaymentSuccess} />
                </div>

                {/* Transaction History */}
                <div key={`history-${refreshKey}`} className="bg-[#13141f]/60 backdrop-blur-md rounded-2xl border border-white/5 p-1 shadow-lg">
                  <TransactionHistory publicKey={publicKey} />
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <FeatureCard 
                  icon="⚡" 
                  title="Anında Transfer" 
                  desc="Puanlarınız ve ödemeleriniz Stellar ağında 3-5 saniye içinde onaylanır." 
                />
                <FeatureCard 
                  icon="💎" 
                  title="Düşük Maliyet" 
                  desc="Transfer ücretleri neredeyse sıfır (0.00001 XLM). Kesintisiz alışveriş." 
                />
                <FeatureCard 
                  icon="🛡️" 
                  title="Tam Güvenlik" 
                  desc="Merkeziyetsiz cüzdan teknolojisi ile varlıklarınızın tek sahibi sizsiniz." 
                />
              </div>
            </div>
          )}

          {/* Getting Started Guide - Sadece bağlanmamışsa görünür */}
          {!isConnected && (
            <div className="mt-16">
              <h3 className="text-2xl text-white font-bold mb-8 text-center">Nasıl Başlarım?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StepCard number="1" title="Cüzdan Kur" desc="Freighter, Lobstr veya xBull cüzdanlarından birini tarayıcına yükle." />
                <StepCard number="2" title="Bağlan" desc="Yukarıdaki 'Cüzdanı Bağla' butonuna tıkla ve girişi onayla." />
                <StepCard number="3" title="XLM Yükle" desc="Testnet ağındaysan Friendbot ile ücretsiz test XLM'i al." />
                <StepCard number="4" title="Puan Kazan" desc="Ödemelerini yap, sadakat puanlarını topla ve harca." />
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-white/30 text-sm flex flex-col items-center gap-2">
              <p>Built with Stellar SDK | Powered by Soroban</p>
              <p className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full inline-block border border-yellow-500/20">
                ⚠️ Testnet Ağı - Gerçek para kullanmayınız
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="bg-gradient-to-b from-white/10 to-transparent backdrop-blur-lg rounded-xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-white font-semibold mb-2 text-lg">{title}</h3>
      <p className="text-blue-100/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="bg-[#181924] hover:bg-[#20212e] transition-colors rounded-xl p-6 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl font-black text-white">{number}</div>
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 text-xl font-bold text-white shadow-lg">
        {number}
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
