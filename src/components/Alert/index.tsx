import React, { useState } from 'react';

export enum AlertType {
  error = 'error',
  info = 'info',
}

interface Props {
  message: string;
  type: AlertType;
  onChange: () => void;
}

export const Alert: React.FC<Props> = ({ type, message, onChange }) => {
  const [isShow, setIsShow] = useState(true);
  const classAlerts = {
    error: 'bg-red-500 text-white',
    info: 'bg-gray-400',
  };

  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsShow(false);
    onChange();
  };

  return (
    <>
      {isShow && (
        <div
          className={
            'w-full flex p-2 text-sm justify-betwen rounded' + classAlerts[type]
          }
        >
          <span className="font-medium">{message}</span>
          <span className="cursor-pointer" onClick={handleClose}>
            &times;
          </span>
        </div>
      )}
    </>
  );
};
