import { useState } from 'react';
import axios from 'axios';
import { GameController, X, CheckCircle } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'

import { AdsDuoInfo } from './AdsDuoInfo';

interface AdsDuoCardProps {
  id: string,
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number,
}

interface Props {
  data: AdsDuoCardProps
}

export function AdsDuoCard({ data }:Props) {
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  const [discordCopy, setDiscordCopy] = useState(false);

  async function getDiscordUser(adsId: string) {
    axios(`http://localhost:3333/ads/${adsId}/discord`).then(response => {
      setDiscordDuoSelected(response.data.discord)
    })
  }

  function getClipBoard() {
    navigator.clipboard.writeText(discordDuoSelected)
    setDiscordCopy(true)
  }

  return (
    <div className="bg-[#2A2634] rounded-lg p-5 gap-4 flex flex-col justify-center items-center">
      <AdsDuoInfo 
        label="Nome"
        value={data.name}
      />
      <AdsDuoInfo 
        label="Tempo de jogo"
        value={`${data.yearsPlaying} ano(s)`}
      />
      <AdsDuoInfo 
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <AdsDuoInfo 
        label="Chamada de áudio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={`${data.useVoiceChannel ? 'text-emerald-400' : 'text-red-400'}`}
      />

      <Dialog.Root>
        <Dialog.Trigger onClick={() => getDiscordUser(data.id)} className="mt-4 sm:mt-0 py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
          <GameController className="w-6 h-6" />
          Conectar
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-6 px-10 flex flex-col items-center justify-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Close
              type="button"
              className="w-full flex justify-end items-end"
            >
              <X className="w-6 h-6 text-zinc-400 hover:text-zinc-500" />
            </Dialog.Close>

            <CheckCircle className="w-16 h-16 text-emerald-400 font-bold" />

            <Dialog.Title className="text-3xl text-white font-black mt-6 mb-2">Let's play!</Dialog.Title>
            <p className="text-sm text-zinc-400">Agora é só começar a jogar!</p>
            <strong className="text-white mt-6 mb-2">Adicione no Discord</strong>

            <div onClick={getClipBoard} className="flex flex-col p-5 bg-zinc-900 rounded-lg gap-2 select-all cursor-pointer">
              <strong className="text-white">{discordDuoSelected}</strong>
            </div>
            {discordCopy
            &&
            <p className="text-sm text-emerald-400 mt-2">Discord copiado!</p>
            }
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}