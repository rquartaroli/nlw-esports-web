import { Link } from 'react-router-dom';

interface GameBannerProps {
  idGame: string
  bannerUrl: string
  title: string
  adsCount: number
}

export function GamerBanner({ idGame, title, bannerUrl, adsCount }:GameBannerProps) {
  return (
    <Link to={`/viewads/${idGame}`} className="relative overflow-hidden cursor-pointer">
      <img src={bannerUrl} alt={title} className="w-full" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} anúncio(s)</span>
      </div>
    </Link>
  )
}