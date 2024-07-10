"use client"
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';

const ModalWithIframe = ({ title, iframeSrc, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <iframe src={iframeSrc} width="100%" height="400" frameBorder="0" />
        </ModalBody>
        <ModalFooter>
          <button onClick={onClose}>Close</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalWithIframe;
