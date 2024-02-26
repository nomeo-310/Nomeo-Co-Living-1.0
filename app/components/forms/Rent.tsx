"use client"

import React from 'react'
import useRent from '@/app/hooks/useRent'
import Modal from '../shared/Modal'
import Heading from '../addons/Heading'
import { categories } from '@/app/constant'
import CategoryInput from '../addons/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Map from '../shared/Map'
import CountrySelect from '../addons/CountrySelect'
import Counters from '../addons/Counters'
import ImageUploads from '../addons/ImageUploads'
import Input from '../shared/Input'
import { createListing } from '@/app/libs/actions/listing.actions'
import { toast } from "sonner";
import { useRouter } from 'next/navigation'


enum steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
 }


const Rent = () => {
  const router = useRouter();
  const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null, 
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      image: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const image = watch('image');

  const setCustomValue = (id:string, value:any) => {
    setValue(id, value, {shouldValidate: true, shouldDirty: true, shouldTouch: true})
  }
  const rentOut = useRent();
  const [step, setStep] = React.useState(steps.CATEGORY);
  const [isLoading, setIsLoading] = React.useState(false)

  const previousStep = () => {
    setStep((value) => value - 1)
  };

  const nextStep = () => {
    setStep((value) => value + 1)
  };

  const onSubmit:SubmitHandler<FieldValues> = async(data) => {
    const { category, location, guestCount, roomCount, bathroomCount, image, price , title, description } = data;
    const listData = { category: category, location: location, guestCount: guestCount, roomCount: roomCount, bathroomCount: bathroomCount,image: image, price: parseInt(price, 10), title: title, description: description};
    
    if (step !== steps.PRICE) {
      return nextStep();
    }

    setIsLoading(true);
    try {
      await createListing(listData)
      toast.success('Listing successfully created')
      router.refresh();
      reset()
      setStep(steps.CATEGORY)
      rentOut.onClose();
    } catch (error) {
      toast.error('Something went wrong, try again later')
    }
    setIsLoading(true);
  }

  const actionLabel = React.useMemo(() => {
    if (step === steps.PRICE) {
      return 'Create'
    }
    return 'Next'
  },[step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === steps.CATEGORY) {
      return undefined;
    }
    return 'Previous'
  },[step]);

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading 
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        { categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => {setCustomValue('category', category)}}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
          ))
        }
      </div>
    </div>
  );

  if (step === steps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading 
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(value) => {setCustomValue('location', value)}}
        />
        <Map center={location?.latlng}/>
      </div>
    )
  }

  if (step === steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading 
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
        />
        <Counters
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
         <hr/>
        <Counters
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
         <hr/>
        <Counters
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === steps.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='Add a Photo of your place'
          subtitle='Show guests what your place looks like'
        />
        <ImageUploads value={image} onChange={(value) => setCustomValue('image', value)} />
      </div>
    )
  }

  if (step === steps.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='How would you describe your place'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          register={register}
          required
          errors={errors}
        />
        <hr/>
        <Input
          id='description'
          label='Description'
          register={register}
          required
          errors={errors}
        />
      </div>
    )
  }

  if (step === steps.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='Now set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          type='number'
          register={register}
          required
          errors={errors}
          formatPrice
        />
      </div>
    )
  }



  return (
    <Modal
      isOpen={rentOut.isOpen}
      onClose={rentOut.onClose}
      title='Rentout Your Home'
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === steps.CATEGORY ? undefined : previousStep}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  )
}

export default Rent;