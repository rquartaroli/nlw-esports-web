import { CaretLeft, CaretRight } from 'phosphor-react';

interface ArrowProps {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}

export function Arrow({ disabled, left = false, onClick }:ArrowProps) {
  return (
    left 
    ?
    <CaretLeft onClick={onClick} className={`w-12 h-12 mr-6 text-zinc-400 ${disabled ? 'opacity-40' : 'cursor-pointer'}`} />
    :
    <CaretRight onClick={onClick} className={`w-12 h-12 ml-6 text-zinc-400 ${disabled ? 'opacity-40' : 'cursor-pointer'}`} />
  )
}