import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  setOpen: (arg0: boolean) => void;
}

const Modal: FC<ModalProps> = ({ isOpen, setOpen, children }) => {
  const body = document.body;
  const container = document.getElementById("__next") || body;

  function handleShadowClick(e: React.MouseEvent<HTMLElement>) {
    if (e.target !== e.currentTarget) return;

    setOpen(false);
  }

  useEffect(() => {
    const classNames = ["overflow-hidden", "pr-4"];
    if (isOpen) return body.classList.add(...classNames);
    body.classList.remove(...classNames);
  }, [isOpen]); //eslint-disable-line

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed w-screen h-screen bg-gray-500 bg-opacity-70 z-50 top-0 left-0 py-20 overflow-y-scroll"
      onClick={handleShadowClick}
    >
      <div className="w-96 mx-auto element bg-sky-200 rounded-lg p-4">
        {children}
      </div>
    </div>,
    container
  );
};

export default Modal;
