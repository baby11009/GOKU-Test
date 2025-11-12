import { useState, useRef, useCallback } from "react";

const useModal = ({
  openStateDefault,
}: { openStateDefault?: boolean } = {}) => {
  const [isOpen, setIsOpen] = useState(!!openStateDefault);

  const [isShowed, setIsShowed] = useState(!!openStateDefault);

  const timeout = useRef<number | null>(null);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsShowed(true);

    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsShowed(false);
    timeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 450);
  }, []);

  return {
    isOpen,
    isShowed,
    handleOpen,
    handleClose,
  };
};
export default useModal;
