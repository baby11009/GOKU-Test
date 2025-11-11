import LoadingBackground from "./LoadingBackground";

const PageLoader = ({ loadingProgress }: { loadingProgress: number }) => {
  return (
    <LoadingBackground className={"bg-primary2/80"}>
      <div className='absolute bottom-36 w-full h-10 flex flex-col justify-center items-center gap-3'>
        <div className='w-1/2 flex items-center justify-center'>
          <div className='w-full h-2 bg-secondary/50'>
            <div
              className='h-2 bg-[#8EB901]'
              style={{
                width: `${loadingProgress}%`,
              }}
            ></div>
          </div>
          <span className='ml-2 text-white'>{loadingProgress}%</span>
        </div>
        <div className='text-white text-center text-2xl'>Đang tải dữ liệu</div>
        <div className='text-white text-center text-xl'>
          Xin vui lòng chờ...
        </div>
      </div>
    </LoadingBackground>
  );
};
export default PageLoader;
