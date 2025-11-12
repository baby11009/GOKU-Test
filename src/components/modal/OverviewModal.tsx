import Modal from "@/utils/Modal";
import useModal from "@/hooks/useModal";
import PrimaryButton from "../button/PrimaryButton";
const OverviewModal = () => {
  const { isOpen, isShowed, handleClose } = useModal({
    openStateDefault: true,
  });

  if (!isOpen) return;

  return (
    <Modal isExited={isShowed}>
      <div
        className='w-[90%] md:w-[520px] h-[300px] md:h-[400px] xl:w-[580px] xl:h-[450px] p-5 md:p-8 xl:p-10 
        flex flex-col justify-center items-center gap-5 md:gap-10  border-2 backdrop-blur-sm
        border-secondary rounded-2xl overflow-hidden'
      >
        <h1 className='text-2xl md:text-2xl xl:text-3xl font-bold text-primary text-center uppercase'>
          hướng dẫn thao tác
        </h1>
        <div className='flex w-full justify-center items-center gap-5'>
          <img
            className='size-16 xl:size-20 object-contain'
            alt='hand_icon'
            src='/icons/hand_icon.png'
          />
          <p className='text-white text-sm md:text-base'>hoặc</p>
          <img
            className='size-16 xl:size-20 object-contain'
            alt='mouse_icon'
            src='/icons/mouse_icon.png'
          />
        </div>
        <p className='text-white text-sm md:text-xl px-10 md:px-16 text-center'>
          Kéo sang trái hoặc phải để trải nghiệm toàn cảnh dự án
        </p>
        <PrimaryButton text='Đã hiểu' onClick={handleClose} />
      </div>
    </Modal>
  );
};
export default OverviewModal;
