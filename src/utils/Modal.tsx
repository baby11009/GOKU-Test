import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  onClose,
  isExited,
}: {
  children: ReactNode;
  onClose?: () => void;
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
      <div className='size-full flex items-center justify-center'>
        {onClose && <div className='absolute inset-0' onClick={onClose}></div>}

        {children}
      </div>
    </div>,
    container,
  );
};
export default Modal;
