import { IconType } from 'react-icons'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

export interface modalProps {
  isOpen?:boolean
  onClose: () => void
  onSubmit: () => void
  title?:string
  body?:React.ReactElement
  footer?:React.ReactElement
  actionLabel:string
  disabled?:boolean
  secondaryAction?: () => void
  secondaryActionLabel?:string
}

export interface menuItemProps {
  onClick: () => void
  label:string
}

export interface buttonProps {
  label:string
  onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
  disabled?:boolean
  outline?:boolean
  small?:boolean
  icon?:IconType
}

export interface useSignUpProps {
  isOpen:boolean
  onOpen: () => void
  onClose: () => void
}

export interface inputProps {
  id:string
  label:string
  type?:string
  disabled?:boolean
  formatPrice?:boolean
  required?:boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

export interface createUserProps {
  email:string
  password: string
  name:string
}