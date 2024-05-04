// ModalButton.jsx
import React, { useRef } from 'react';
import Button from './Button';
import { useState, useEffect } from 'react';
import './Modal.css'; // Adjust the path as necessary

const Modal = ({ isOpen, onClose, initialValue }) => {
  
  


  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="modal-backdrop" onClick={handleBackdropClick}></div>
          <dialog className="modal" open>
            <div className="modal__form"> 
             
              <span   type="text"
                id="username"
                name="username"
               
                
                className="modal__input">{initialValue}
              
              </span>
              <div className='modal__button'>
                
                <button type="button" onClick={onClose} className="modal__button modal__button--cancel">
                  Close
                </button>
              </div>
              </div> 
          </dialog>
        </>
      )}
    </>
  );
};

export default Modal;