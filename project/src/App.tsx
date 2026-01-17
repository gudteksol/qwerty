import { useState, useEffect } from 'react';

interface TokenData {
  priceUsd: string;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
}

function App() {
  const contractAddress = 'BjeG4eBpDQJTvuiQmL9dwjegSgykcoqXFpCTioBApump';
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
        const data = await response.json();

        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setTokenData({
            priceUsd: pair.priceUsd,
            priceChange24h: pair.priceChange.h24,
            volume24h: pair.volume.h24,
            marketCap: pair.marketCap,
            liquidity: pair.liquidity.usd
          });
        }
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 30000);
    return () => clearInterval(interval);
  }, [contractAddress]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: string) => {
    const priceNum = parseFloat(price);
    if (priceNum < 0.01) {
      return `$${priceNum.toFixed(6)}`;
    }
    return `$${priceNum.toFixed(4)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 via-transparent to-green-950/20 pointer-events-none"></div>

      <nav className="relative z-50 border-b border-[#00ff41]/20 bg-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <img src="/qwgqg.png" alt="$BACK Logo" className="w-16 h-16" />
            <div className="hidden md:flex items-center space-x-6 font-mono text-sm">
              <a href="#about" className="text-[#00ff41] hover:text-white transition-colors border border-[#00ff41]/30 px-4 py-2 hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.5)]">ABOUT</a>
              <a href="#chart" className="text-[#00ff41] hover:text-white transition-colors border border-[#00ff41]/30 px-4 py-2 hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.5)]">CHART</a>
              <a href="https://x.com/i/communities/2012299378724163831" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:text-white transition-colors border border-[#00ff41]/30 px-4 py-2 hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.5)]">JOIN</a>
            </div>
          </div>
          <a
            href="https://pump.fun/coin/BjeG4eBpDQJTvuiQmL9dwjegSgykcoqXFpCTioBApump"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00ff41] text-black font-black px-8 py-3 hover:bg-white transition-all duration-300 neon-border"
          >
            BUY NOW
          </a>
        </div>
      </nav>

      <div className="bg-black border-b border-[#00ff41]/20 text-[#00ff41] py-2.5 overflow-hidden relative font-mono text-sm">
        <div className="animate-scroll whitespace-nowrap inline-flex">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="inline-flex items-center space-x-12 px-8">
              {tokenData ? (
                <>
                  <span>PRICE: {formatPrice(tokenData.priceUsd)}</span>
                  <span className={tokenData.priceChange24h >= 0 ? 'text-[#00ff41]' : 'text-red-400'}>
                    24H: {tokenData.priceChange24h >= 0 ? '+' : ''}{tokenData.priceChange24h.toFixed(2)}%
                  </span>
                  <span>MCAP: {formatNumber(tokenData.marketCap)}</span>
                  <span>VOLUME: {formatNumber(tokenData.volume24h)}</span>
                  <span>LIQUIDITY: {formatNumber(tokenData.liquidity)}</span>
                </>
              ) : (
                <>
                  <span>LOADING...</span>
                  <span>WE'RE SO BACK</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/back_banner.png)' }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-40 min-h-[700px] flex items-center">
          <div className="flex flex-col items-center text-center w-full">
            <div className="space-y-12 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white neon-text animate-neon-flicker">
                  WE ARE SO <span className="text-[#00ff41]">$BACK</span>.
                </h1>
                <div className="bg-black/80 border-2 border-[#00ff41] px-8 py-4 inline-block font-mono text-[#00ff41] text-lg neon-border">
                  {contractAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-20">
          <div id="about" className="w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-black/60 border-2 border-[#00ff41]/30 p-12 backdrop-blur-sm hover:border-[#00ff41] transition-all duration-500 neon-border">
              <h2 className="text-5xl md:text-6xl font-black mb-12 text-[#00ff41] neon-text">ABOUT $BACK</h2>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-left">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    After years of waiting, grinding, and holding through the darkest days of crypto winter...
                    <span className="text-[#00ff41] font-bold neon-text"> the bull market is finally here</span>.
                  </p>

                  <p className="text-xl text-gray-300 leading-relaxed">
                    We survived the bear. We weathered the FUD. We diamond-handed through it all.
                    And now, as green candles light up the charts and hope returns to the streets...
                  </p>

                  <p className="text-3xl font-black text-[#00ff41] tracking-wide neon-text">
                    WE'RE SO BACK.
                  </p>

                  <p className="text-lg text-gray-400 leading-relaxed">
                    This isn't just a token. It's a celebration. A victory lap for everyone who held strong,
                    believed in the cycle, and never stopped believing. The bull run is here, and we're riding
                    it all the way to the top.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-[#00ff41]/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <img
                    src="/g-0kgnrwiaezoyb.png"
                    alt="Bull Market is Back"
                    className="relative w-full rounded-lg hover:scale-105 transition-all duration-500 border-2 border-[#00ff41]/30 hover:border-[#00ff41]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div id="chart" className="w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-[#00ff41] neon-text">LIVE CHART</h2>
            <div className="bg-black/60 border-2 border-[#00ff41]/30 p-4 backdrop-blur-sm hover:border-[#00ff41] transition-all duration-500 neon-border">
              <iframe
                src={`https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`}
                className="w-full h-[600px] rounded"
                title="DexScreener Chart"
              />
            </div>
          </div>

          <div id="tokenomics" className="w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-black/60 border-2 border-[#00ff41]/30 p-12 backdrop-blur-sm hover:border-[#00ff41] transition-all duration-500 neon-border">
              <h2 className="text-5xl md:text-6xl font-black mb-12 text-[#00ff41] neon-text">MEME GALLERY</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden border-2 border-[#00ff41]/30 hover:border-[#00ff41] transition-all duration-500">
                  <img
                    src="/image.png"
                    alt="We Are So Back"
                    className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                    <span className="text-[#00ff41] font-black text-xl neon-text">WE ARE SO BACK</span>
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,255,65,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                <div className="group relative overflow-hidden border-2 border-[#00ff41]/30 hover:border-[#00ff41] transition-all duration-500">
                  <img
                    src="/bull.png"
                    alt="Bull Run"
                    className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                    <span className="text-[#00ff41] font-black text-xl neon-text">BULL RUN</span>
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,255,65,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                <div className="group relative overflow-hidden border-2 border-[#00ff41]/30 hover:border-[#00ff41] transition-all duration-500">
                  <img
                    src="/image copy copy copy.png"
                    alt="Retardio"
                    className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                    <span className="text-[#00ff41] font-black text-xl neon-text">RETARDIO</span>
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,255,65,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <a
              href="https://pump.fun/coin/BjeG4eBpDQJTvuiQmL9dwjegSgykcoqXFpCTioBApump"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#00ff41] hover:bg-white text-black font-black text-2xl px-12 py-8 transition-all duration-300 hover:scale-105 neon-border w-full text-center"
            >
              BUY NOW
            </a>

            <a
              href="https://x.com/i/communities/2012299378724163831"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-black hover:bg-[#00ff41]/10 border-2 border-[#00ff41] text-[#00ff41] font-black text-2xl px-12 py-8 transition-all duration-300 hover:scale-105 neon-border w-full text-center"
            >
              JOIN COMMUNITY
            </a>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-[#00ff41]/20 bg-black/90 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#00ff41] font-mono text-sm neon-text">
            WE'RE SO BACK. THE BULL RUN IS HERE.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            $BACK - 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
