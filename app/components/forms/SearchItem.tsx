"use client"

import qs from 'query-string'
import React from 'react'
import Modal from '../shared/Modal'
import useSearch from '@/app/hooks/useSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { countrySelectValueProps } from '@/app/types/types';
import { formatISO } from 'date-fns';
import Heading from '../addons/Heading';
import CountrySelect from '../addons/CountrySelect';
import { Calendar } from '../addons/ListingAddOn';
import Counters from '../addons/Counters';


const SearchItem = () => {
  enum steps {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
  }

  const initialRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }

  const searchListings = useSearch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [location, setLocation] = React.useState<countrySelectValueProps>()
  const [step, setStep] = React.useState(steps.LOCATION);
  const [guestCount, setGuestCount] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [bathroomCount, setBathroomCount] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<Range>(initialRange);

  const Map = React.useMemo(() => dynamic(() => import('../shared/Map'), {ssr: false}), [location]);

  const previousStep = () => {
    setStep((value) => value - 1)
  };

  const nextStep = () => {
    setStep((value) => value + 1)
  };

  const onSubmit = React.useCallback(async() => {
    
    if (step !== steps.INFO) {
      return nextStep();
    }

    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery:any = {...currentQuery, locvationValue: location?.value, guestCount, roomCount, bathroomCount};

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endTime = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({url: '/', query: updatedQuery}, {skipNull: true});

    setStep(steps.LOCATION);
    searchListings.onClose();

    router.push(url)
  }, [step, searchListings, location, router, guestCount, roomCount, bathroomCount, dateRange, nextStep, searchParams]);

  const actionLabel = React.useMemo(() => {
    if (step === steps.INFO) {
      return 'Search'
    }
    return 'Next'
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === steps.LOCATION) {
      return undefined
    }
    return 'Previous'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading
        title='Where do you want to go?'
        subtitle='Find the perfect location'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as countrySelectValueProps)}
      />
      <hr/>
      <Map center={location?.latlng}/>
    </div>
  );

  if (step === steps.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div> 
    )
  }

  if (step === steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title='More information?'
          subtitle='Make sure everyone is free!'
        />
        <Counters
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counters
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counters
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div> 
    )
  }

  return (
    <Modal
      isOpen={searchListings.isOpen}
      onClose={searchListings.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryAction={step === steps.LOCATION ? undefined : previousStep}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  )
}

export default SearchItem;