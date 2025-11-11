import { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingBackground from "./LoadingBackground";
interface Props {
  activePathName: string;
}

const LoadingScreen = ({ activePathName }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeout: number | null = setTimeout(() => {
      setIsLoading(false);
      timeout = null;
    }, 5000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <LoadingBackground className=' z-200!'>
      {activePathName === "/" && (
        <Link
          to={"/overview"}
          className='mt-5 md:mt-10 relative px-16 md:px-20 py-3 md:py-5 bg-primary rounded-2xl
        border-secondary border-3 hover:bg-white/85 hover:border-white drop-shadow-lg drop-shadow-white/0 hover:drop-shadow-white
        transition-all duration-300 group'
          onClick={() => setIsLoading(false)}
        >
          <p className='uppercase group-hover:text-primary font-medium text-sm md:text-base'>
            Bắt đầu
          </p>
        </Link>
      )}
    </LoadingBackground>
  );
};
export default LoadingScreen;
