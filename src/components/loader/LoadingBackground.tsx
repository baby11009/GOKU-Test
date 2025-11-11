import type { ReactNode } from "react";

const LoadingBackground = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center ${className}`}
    >
      <img
        src='/images/bgLoading.jpg'
        alt='bgImage'
        className='object-cover absolute size-full'
      />
      {/* Overlay */}
      <div className='absolute inset-0 bg-[radial-gradient(circle,rgba(96,161,21,0.5)_0%,rgba(6,24,0,0.5)_0%)] backdrop-blur-sm'></div>
      <div className='relative w-fit flex items-center justify-center'>
        <svg
          viewBox='0 0 400 400'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='z-10 animate-spin-slow size-80 md:size-100'
        >
          <g>
            <circle
              stroke='url(#gradient)'
              r='190'
              cy='200'
              cx='200'
              strokeWidth='3'
              fill='transparent'
              className='path'
            ></circle>
            <linearGradient id='gradient'>
              <stop stopOpacity='1' stopColor='#56FD6F' offset='50%'></stop>
              <stop stopOpacity='0.5' stopColor='#ffffff' offset='100%'></stop>
            </linearGradient>
          </g>
        </svg>
        <img
          src='/logos/logo1.png'
          alt='logo'
          className='absolute size-72 md:size-96 object-scale-down'
        />
      </div>
      {children}
    </section>
  );
};
export default LoadingBackground;
