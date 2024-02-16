"use client"

import React from 'react'
import { modalProps } from '@/app/types/types';
import { IoMdClose } from 'react-icons/io';
import Button from '../addons/Button';

const Modal = ({isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled, secondaryAction, secondaryActionLabel}:modalProps) => {
  const [showModal, setShowModal] = React.useState(isOpen);

  React.useEffect(() => {
    setShowModal(isOpen)
  },[isOpen]);

  const handleClose = React.useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  },[disabled, onClose]);

  const handleSubmit = React.useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = React.useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  },[disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} 
          ${showModal ? 'opacity-100' : 'opacity-0'}`}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="modal-content">
                <button onClick={handleClose} className='p-1 border-0 hover:opacity-70 transition absolute left-9'>
                  <IoMdClose size={18}/>
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className='relative p-6 flex-auto'>{body}</div>
              <div className='flex flex-col gap-2 p-6'>
                <div className="flex flex-row items-center gap-4 w-full">
                  { secondaryAction && secondaryActionLabel && 
                    <Button outline label={secondaryActionLabel} disabled={disabled} onClick={handleSecondaryAction}/>
                  }
                  <Button label={actionLabel} disabled={disabled} onClick={handleSubmit}/>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Modal
