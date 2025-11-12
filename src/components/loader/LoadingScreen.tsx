import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import LoadingBackground from "./LoadingBackground";
import PrimaryButton from "../button/PrimaryButton";
interface Props {
  activePathName: string;
}

const LoadingScreen = ({ activePathName }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let timeout: number | null = setTimeout(() => {
      timeout = null;
      if (activePathName === "/") {
        navigate("/overview", { replace: true });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }, 4800);

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
    <LoadingBackground className=' z-500!'>
      {activePathName === "/" && (
        <Link
          to={"/overview"}
          replace={true}
          onClick={() => setIsLoading(false)}
        >
          <PrimaryButton text='Bắt đầu' />
        </Link>
      )}
    </LoadingBackground>
  );
};
export default LoadingScreen;
