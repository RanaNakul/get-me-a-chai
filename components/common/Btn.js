

import React from "react";

const Btn = ({ text, onclick, children, disabled, type, customClass }) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onclick}
        type={type}
        className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center }`}
      >
        {
            children ? (
            <>
                <span className={`${customClass}`}>{text}</span>
                {children}
            </>
            ) : (
                <div className={`${customClass}`}>{text}</div> 
            )
        }
      </button>
    </>
  );
};

export default Btn;
