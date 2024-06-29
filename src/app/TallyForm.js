"use client"
import React, { useEffect } from 'react';

const TallyForm = () => {
  useEffect(() => {
    window.TallyConfig = {
      formId: '31K1q4',
      popup: {
        emoji: {
          text: '👋',
          animation: 'wave',
        },
        layout: 'modal',
        autoClose: 0,
        showOnce: true,
        doNotShowAfterSubmit: true,
      },
    };
  }, []);

  return null; // No visible content for this component
};

export default TallyForm;
