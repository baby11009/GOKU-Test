import "@/styles/modal.css";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  onClose,
  className,
  isExited,
}: {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  isExited: boolean;
}) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const container = document.getElementById("modal") || document.body;

  return createPortal(
    <div
      className={`modal-mask ${isExited ? "modal-enter" : "modal-leave"}`}
      {...(isExited ? {} : { tabIndex: 0 })}
    >
      <div
        className={`modal-wrapper ${
          isExited ? "modal-wrapper-enter" : "modal-wrapper-leave"
        }`}
      >
        <div className='absolute inset-0' onClick={onClose}></div>
        <div className={`relative  modal-container ${className}`}>
          {children}
        </div>
      </div>
    </div>,
    container,
  );
};
export default Modal;
