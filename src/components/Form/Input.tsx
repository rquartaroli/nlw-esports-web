import { InputHTMLAttributes } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface IFormValues {
  name: string
  yearsPlaying: string
  discord: string
  hourStart: string
  hourEnd: string
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  nameValidate: Path<IFormValues>
  register: UseFormRegister<IFormValues>
  required: boolean
  errorMsg: boolean
}

export function Input({nameValidate, register, required, errorMsg = false, ...props}: InputProps) {
  return (
    <input 
      {...register(nameValidate, 
        nameValidate === 'yearsPlaying' 
        ? {required: 'Não pode ser vazio!', min: {value: 0, message: 'Não pode ser menor que 0.'}, max: {value: 99, message: 'Não pode ser maior que 99.'}} 
        : {required: 'Não pode ser vazio!'}
      )}
      {...props} 
      className={`bg-zinc-900 ${errorMsg && 'border-2 border-rose-400'} py-3 ${nameValidate === 'hourStart' || nameValidate === 'hourEnd' ? 'pl-4 pr-0' : 'px-4' } rounded text-sm placeholder:text-zinc-500`}
    />
)
}