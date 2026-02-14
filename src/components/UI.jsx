
export default function UI({ activeTab, setActiveTab }) {
    const tabs = ['FloatingHearts', 'HeartGalaxy', 'LoveExplosion', 'ParticleField']

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                >
                    {tab.replace(/([A-Z])/g, ' $1').trim()}
                </button>
            ))}
        </div>
    )
}
