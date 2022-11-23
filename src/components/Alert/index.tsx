import React, { useState } from 'react';

export const Alert: React.FC<{ message: string; onChange: () => void }> = ({
  message,
  onChange,
}) => {
  const [isShow, setIsShow] = useState(true);

  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsShow(false);
    onChange();
  };

  return (
    <>
      {isShow && (
        <div className="w-full flex p-2 text-sm justify-between bg-red-500 text-white rounded">
          <span className="font-medium">{message}</span>
          <span className="cursor-pointer" onClick={handleClose}>
            &times;
          </span>
        </div>
      )}
    </>
  );
};
