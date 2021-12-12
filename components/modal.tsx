import { FC, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  setOpen: (arg0: boolean) => void;
}

const Modal: FC<ModalProps> = ({ isOpen, setOpen, children }) => {
  const body = document.body;
  const container = document.getElementById("__next") || body;

  useEffect(() => {
    const classNames = ["overflow-hidden", "pr-4"];
    if (isOpen) return body.classList.add(...classNames);
    body.classList.remove(...classNames);
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed w-screen h-screen bg-gray-500 bg-opacity-70 z-10 top-0 left-0 py-20 overflow-y-scroll"
      onClick={() => setOpen(false)}
    >
      <div className="w-96 mx-auto bg-red-400 rounded-lg p-4">{children}</div>
    </div>,
    container
  );
};

export default Modal;
