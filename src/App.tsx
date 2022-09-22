import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css';

import logoImage from './assets/logo-nlw-esports.svg';
import { GamerBanner } from './components/GamerBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { KeenSlider } from './components/KeenSlider';

interface GameProps {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const[games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="logo-nlw-esports" />

      <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <KeenSlider arrayInUse={games} maxSlidePerView={games.length >= 6 ? 6 : games.length}>
        {games.map(game => {
            return (
              <div key={game.id} className="keen-slider__slide rounded-lg">
                <GamerBanner 
                  idGame={game.id}
                  title={game.title} 
                  bannerUrl={game.bannerUrl} 
                  adsCount={game._count.ads} 
                />
              </div>
            )
          })}
      </KeenSlider>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
