import React from 'react'
import { IconType } from 'react-icons'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { Listing, Reservation, User } from '@prisma/client'
import { Range, RangeKeyDict } from 'react-date-range'

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

export interface listingHeadProps {
  title:string 
  image:string 
  locvationValue:string
  id:string
  currentUser:User | null
}

export interface listingInfoProps {
  user:any
  category: {
    icon: IconType
    label:string
    description:string
  } | undefined
  description:string
  roomCount:number
  guestCount:number
  bathroomCount:number
  locvationValue:string
}

export interface listingCategoryProps {
  icon:IconType
  label:string
  description:string
}

export interface listingClientProps {
  listing:Listing & {user: User}
  currentUser:User | null
  reservations?:Reservation[]
}

export interface createReservationProps {
  totalPrice: number
  startDate: Date
  endTime: Date
  listingId: string
}

export interface tripClientProps {
  currentUser:User
  reservations:(Reservation & {listing: Listing})[]
}

export interface propertyClientProps {
  currentUser:User
  listings:Listing[]
}

export interface IListingsParams {
  userId?:string;
  guestCount?:number;
  roomCount?:number;
  bathroomCount?:number;
  startDate?: string;
  endTime?:string;
  locvationValue?:string;
  category?:string;
}

export interface homeProps {
  searchParams: IListingsParams;
}

export interface avatarProps {
  imageSrc: string
}

export interface categoryBoxProps {
  icon:IconType
  label:string
  selected?:boolean
}

export interface containerProps {
  children: React.ReactNode
}

export interface headingProps {
  title:string
  subtitle?:string
  center?:boolean
}

export interface imageUploadsProps {
  onChange: (value:string) => void
  value: string
}

export interface likeButtonProps {
  listingId:string
  currentUser:any
}

export interface listingReservationProps {
  price:number
  totalPrice:number
  onChangeDate: (value: any) => void
  dateRange:Range
  onSubmit: () => void
  disabled?:boolean
  disableDates:Date[]
}

export interface calendarProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disableDates?: Date[]
}

export interface userMenuProps {
  currentUser: User
}

export interface favouriteClientProps {
  currentUser: User | null
  listings: Listing[]
}

export interface mapProps {
  center?:number[]
}

export interface navBarProps {
  currentUser: User
}

export interface reservationClientProps {
  currentUser:User
  reservations:(Reservation & {listing: Listing})[]
}

export interface errorStateProps {
  error: Error
}