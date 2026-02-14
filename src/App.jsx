import { useState } from 'react'
import FloatingHearts from './tabs/FloatingHearts'
import HeartGalaxy from './tabs/HeartGalaxy'
import LoveExplosion from './tabs/LoveExplosion'
import ParticleField from './tabs/ParticleField'
import UI from './components/UI'

export default function App() {
  const [activeTab, setActiveTab] = useState('FloatingHearts')

  const renderTab = () => {
    switch (activeTab) {
      case 'FloatingHearts': return <FloatingHearts />
      case 'HeartGalaxy': return <HeartGalaxy />
      case 'LoveExplosion': return <LoveExplosion />
      case 'ParticleField': return <ParticleField />
      default: return <FloatingHearts />
    }
  }

  return (
    <div className="w-full h-screen bg-black relative">
      <UI activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full h-full">
        {renderTab()}
      </div>
    </div>
  )
}
