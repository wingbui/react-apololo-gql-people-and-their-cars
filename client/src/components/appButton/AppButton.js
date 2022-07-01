import React from 'react';

export const AppButton = ({ type = 'button', styles, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full border-1 py-1 px-2 cursor-pointer ${styles}`}
    >
      {children}
    </button>
  );
};
