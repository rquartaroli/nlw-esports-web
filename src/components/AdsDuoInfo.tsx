
interface AdsDuoInfoProps {
  label: string
  value: string
  colorValue?: string
}

export function AdsDuoInfo({ label, value, colorValue = 'text-white' }:AdsDuoInfoProps) {
  return (
    <div className="w-full mb-4 flex flex-col items-center">
      <p className="text-sm text-zinc-400">{label}</p>
      <strong className={`text-white ${colorValue}`}>{value}</strong>
    </div>
  )
}