import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';
import { Input } from './Form/Input';
import { Check, GameController, CaretDown, CaretUp } from 'phosphor-react';

interface GameProps {
  id: string
  title: string
}

interface DataValidate {
  name: string
  yearsPlaying: string
  discord: string
  hourStart: string
  hourEnd: string
}

export function CreateAdModal() {
  const { register, handleSubmit, formState: {errors} } = useForm<DataValidate>();
  const [games, setGames] = useState<GameProps[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [weekDaysEmpty, setWeekDaysEmpty] = useState(false);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [idGameSelected, setIdGameSelected] = useState('vazio');

  async function handleCreateAd(data: DataValidate) {
    if(idGameSelected === 'vazio' || idGameSelected === '') {
      setIdGameSelected('')
      return;
    }
    
    if(weekDays.map(Number).length <= 0) {
      setWeekDaysEmpty(true)
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${idGameSelected}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!')
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert('Erro ao criar o anúncio!')
    }
  }
  
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl text-white font-black">Publique um anúncio</Dialog.Title>

          <form onSubmit={handleSubmit((data) => handleCreateAd(data))} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">Qual o game?</label>

              <Select.Root
                onValueChange={setIdGameSelected}
              >
                <Select.SelectTrigger 
                  className={`bg-zinc-900 ${!idGameSelected && 'border-2 border-rose-400'} ${idGameSelected.length <= 5 && 'text-zinc-500'} py-3 px-4 rounded text-sm inline-flex justify-between`}
                  aria-label="games"
                >
                  <Select.Value 
                    placeholder="Selecione o game que deseja jogar" 
                  />
                  <Select.Icon>
                    <CaretDown className="w-6 h-6 text-zinc-400" />
                  </Select.Icon>
                </Select.SelectTrigger>
                {!idGameSelected && <p className="text-sm text-red-400">Selecione o game que deseja jogar</p>}

                <Select.Portal>
                  <Select.Content 
                    className="overflow-hidden rounded bg-zinc-900 py-4"
                  >
                    <Select.SelectScrollUpButton className="flex items-center justify-center h-6 cursor-default">
                      <CaretUp className="w-6 h-6 text-zinc-400" />
                    </Select.SelectScrollUpButton>
                    <Select.Viewport className="p-1">
                      <Select.SelectGroup>
                        <Select.SelectLabel className="text-zinc-500 px-9 leading-8">Games</Select.SelectLabel>
                        {games.map(game => {
                          return (
                            <Select.Item 
                              key={game.id} 
                              value={game.id}
                              className="text-white relative flex items-center leading-10 px-9 cursor-pointer focus:bg-violet-500"
                            >
                              <Select.SelectItemText>{game.title}</Select.SelectItemText>
                              <Select.SelectItemIndicator
                                className="absolute inline-flex items-center justify-center left-0"
                              >
                                <Check className="w-6 h-6 text-emerald-400" />
                              </Select.SelectItemIndicator>
                            </Select.Item>
                          )
                        })}
                      </Select.SelectGroup>
                    </Select.Viewport>
                    <Select.SelectScrollDownButton className="flex items-center justify-center h-6 cursor-default">
                      <CaretDown className="w-6 h-6 text-zinc-400" />
                    </Select.SelectScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input 
                nameValidate="name" 
                register={register} 
                required 
                errorMsg={errors.name?.message ? true : false}
                id="name" 
                placeholder="Como te chamam dentro do game?" 
              />
              <p className="text-sm text-red-400">{errors.name?.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input 
                  nameValidate="yearsPlaying" 
                  register={register} 
                  required 
                  errorMsg={errors.yearsPlaying?.message ? true : false}
                  id="yearsPlaying" 
                  type="number" 
                  placeholder="Tudo bem ser ZERO" 
                />
                <p className="text-sm text-red-400">{errors.yearsPlaying?.message}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input 
                  nameValidate="discord" 
                  register={register} 
                  required 
                  errorMsg={errors.discord?.message ? true : false}
                  id="discord" 
                  placeholder="Usuario#0000" 
                />
                <p className="text-sm text-red-400">{errors.discord?.message}</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className={`flex flex-col gap-2 ${weekDaysEmpty && 'border-2 border-rose-400'}`}>
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <ToggleGroup.Root 
                    type="multiple" 
                    className="grid grid-cols-4 gap-2"
                    value={weekDays}
                    onValueChange={(value) => {
                      setWeekDays(value)
                      setWeekDaysEmpty(false)
                    }}
                  >
                    <ToggleGroup.Item 
                      value="0"
                      title="Domingo"
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="1"
                      title="Segunda"
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="2"
                      title="Terça"
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="3"
                      title="Quarta"
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="4"
                      title="Quinta"
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="5"
                      title="Sexta"
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="6"
                      title="Sábado"
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                  {weekDaysEmpty && <p className="text-sm text-red-400">Selecione ao menos 1 dia.</p>}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input 
                      nameValidate="hourStart" 
                      register={register} 
                      required 
                      errorMsg={errors.hourStart?.message ? true : false}
                      id="hourStart" 
                      type="time" 
                      placeholder="De" 
                    />
                    <p className="text-sm text-red-400">{errors.hourStart?.message}</p>
                  </div>
                  <div>
                    <Input 
                      nameValidate="hourEnd" 
                      register={register} 
                      required 
                      errorMsg={errors.hourEnd?.message ? true : false} 
                      id="hourEnd" 
                      type="time" 
                      placeholder="Até" 
                    />
                    <p className="text-sm text-red-400">{errors.hourEnd?.message}</p>
                  </div>
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root 
                className="w-6 h-6 p-1 bg-zinc-900"
                onCheckedChange={(checked) => {
                  if(checked === true) {
                    setUseVoiceChannel(true)
                  } else {
                    setUseVoiceChannel(false)
                  }
                }}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button 
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController className="w-6 h-6" />
                Encontrar duo
              </button>
            </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}