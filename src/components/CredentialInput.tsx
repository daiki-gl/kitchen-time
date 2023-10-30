import { CredentialFormData } from './CredentialForm'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type CredentialInputProps = {
    title: string
    register: UseFormRegister<CredentialFormData>
    errors: FieldErrors<CredentialFormData>
    type?: string
    label: "username" | "email" | "password" | "confirmPassword"
    registerOptions?: any
}

const CredentialInput = ({title, register, errors, type = "text", label, registerOptions = null, }:CredentialInputProps) => {
  return (
        <div className='mb-4'>
          <label className='block mb-1' htmlFor={label}>{title}</label>
          <input 
                 type={type}
                 id={label}
                 className='rounded-full w-full p-2 bg-white text-font-color'
                //  autoComplete="new-username"
                 {...register(label, registerOptions ? registerOptions : {required: true}) }
          />
            {errors[label] && <p className='text-error'>{errors[label]?.message}</p>}
        </div>
  )
}

export default CredentialInput