import { IconType } from 'react-icons'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { Listing, Reservation } from '@prisma/client'

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

export interface modalControProps {
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

export interface categoryInputProps {
  onClick: (value:string) => void
  icon:IconType
  selected?:boolean
  label:string
}

export interface countrySelectValueProps {
  flag:string
  label:string
  latlng:number[]
  region:string
  value:string
}

export interface countrySelectProps {
  value?:countrySelectValueProps
  onChange: (value:countrySelectValueProps) => void
}

export interface countersProps {
  title:string
  subtitle:string
  value:number
  onChange: (value:number) => void
}

export interface creatListingProps {
  category: string,
  location: countrySelectValueProps, 
  guestCount: number,
  roomCount: number,
  bathroomCount: number,
  image: string,
  price: number,
  title: string,
  description: string
}

export interface emptyStateProps {
  title?:string
  subtitle?:string
  showReset?:boolean
}

export interface listingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any
}