import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CaretLeft } from 'phosphor-react';

import logoImage from '../assets/logo-nlw-esports.svg';
import { AdsDuoCard } from '../components/AdsDuoCard';
import { KeenSlider } from '../components/KeenSlider';

interface GameProps {
  id: string
  bannerUrl: string
  title: string
}

interface GamesAdsProps {
  id: string,
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number,
}

function ViewAds() {
  const [gameSelected, setGameSelected] = useState<GameProps>({} as GameProps);
  const [gamesAds, setGamesAds] = useState<GamesAdsProps[]>([]);
  const params = useParams<{id: string, gameName: string}>();

  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1)
  }

  useEffect(() => {
    if(params.id) {
      axios(`http://localhost:3333/games/${params.id}/ads`).then(response => {
        setGamesAds(response.data)
      })

      axios('http://localhost:3333/games').then(response => {
        const dataReturned = response.data.find((res: GameProps) => res.id === params.id)
        setGameSelected(dataReturned)
      })
    }
  }, [params.id])

  return (
    <>
      <div className="flex flex-row justify-between items-center px-4 my-12">
        <a onClick={handleGoBack} className="cursor-pointer">
          <CaretLeft className="w-16 h-16 text-white" />
        </a>
        <img src={logoImage} width={100} height={100} className="rounded-lg bg-cover" alt="logo-nlw-esports" />
        <div className="w-16 h-16"></div>
      </div>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center mb-20">
        <img src={gameSelected.bannerUrl} width={285} height={380} className="rounded-lg bg-cover" alt={gameSelected.title} />

        <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-black mt-8">
          Anúncio(s)
        </h1>
        <p className="text-zinc-400">Conecte-se e comece a jogar!</p>
        
        <KeenSlider arrayInUse={gamesAds} maxSlidePerView={gamesAds.length > 4 ? 4 : gamesAds.length}>
          {gamesAds.map(ads => {
            return (
              <div key={ads.id} className="keen-slider__slide rounded-lg">
                <AdsDuoCard 
                  data={ads} 
                />
              </div>
            )
          })}
        </KeenSlider>
      </div>
    </>
  )
}

export default ViewAds