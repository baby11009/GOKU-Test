import type { RefObject } from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import PageLoader from "@/components/loader/PageLoader";
import { toggleNavbar } from "@/components/navbar/Navbar";
type BlobImageList = Record<string, string>;

// tính toán  Hệ số nhạy (tốc độ xoay)
const calculateSen = () => {
  // full screen = 1 vòng
  return 360 / window.innerWidth;
};

// Preload image as Blob URL để cache toàn bộ ảnh

async function preloadImageAsBlob(url: string) {
  const response = await fetch(url);

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

const preloadImages = async (
  imgListRef: RefObject<BlobImageList>,
  setLoadingProgress: (progress: number) => void,
) => {
  const total = 120;
  let loaded = 0;
  const promises = Array.from({ length: total }).map(async (_, index) => {
    try {
      const blobUrl = await preloadImageAsBlob(
        `/images/rotation/${index + 1}.jpg`,
      );
      console.log("🚀 ~ blobUrl:", blobUrl);
      imgListRef.current[index + 1] = blobUrl;
    } catch (err) {
      console.error(`Failed to load image ${index + 1}:`, err);
    } finally {
      loaded++;
      // Cập nhật progress theo phần trăm
      setLoadingProgress(Math.round((loaded / total) * 100));
    }
  });

  await Promise.all(promises);
};

// const preloadImages = async (
//   imgListRef: RefObject<BlobImageList>,
//   setLoadingProgress: (progress: number) => void,
// ) => {
//   const total = 120;
//   let loaded = 0;

//   const promises = Array.from({ length: total }).map((_, index) => {
//     return new Promise<void>((resolve) => {
//       const img = new Image();
//       const imgNum = index + 1;
//       // const src = `/assets/images/rotation/${imgNum}.jpg`;

//       const src = `https://360.eco-retreat.com.vn/assets/images/overview/rotation/${imgNum}.jpg`;

//       img.onload = () => {
//         imgListRef.current[imgNum] = src; // Lưu path
//         loaded++;
//         setLoadingProgress(Math.round((loaded / total) * 100));
//         resolve();
//       };

//       img.onerror = () => {
//         console.error(`Failed to load image ${imgNum}`);
//         loaded++;
//         setLoadingProgress(Math.round((loaded / total) * 100));
//         resolve(); // Vẫn resolve để không block
//       };

//       img.src = src; // Trigger download và cache
//     });
//   });

//   await Promise.all(promises);
// };

const Overview = () => {
  const [isMoving, setIsMoving] = useState(false);

  const [src, setSrc] = useState("1.jpg");

  const [loadingProgress, setLoadingProgress] = useState(0);

  const imgList = useRef<BlobImageList>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // Lưu currentAngle để k bị shift khi user move

  const currentAngle = useRef(0);

  // Lưu vị trí chuột hoặc touch lần trước

  const lastPos = useRef<number>(null);

  const sensitivity = useRef(calculateSen()); // độ nhạy

  const calculateAngle = useCallback((posX: number) => {
    if (typeof lastPos.current === "number") {
      // Tính delta movement
      const deltaX = posX - lastPos.current;

      // Chỉ xoay quanh trục y
      const deltaAngleY = deltaX * sensitivity.current;

      // Cộng vào góc hiện tại do tích lũy
      currentAngle.current += deltaAngleY; // tích lũy, không reset

      // currentAngle.current % 360 để tính góc hiện tại trong vòng (lúc này góc có thể âm lẫn dương)
      // lấy góc trên vòng vừa tình đc + 360 để biến nó thành dương và % 360 để tính lại góc trên vòng
      const normalizedAngle = ((currentAngle.current % 360) + 360) % 360; // tính vị trí của góc hiện tại trên vòng

      // sau đó chia cho 3 là vì 1 vòng tương ứng với 120 ảnh => 360 / 120 = 3 độ tương ứng 1 ảnh
      // giới hạn của ảnh là từ 1 đến 120 nên cần có giới hạn đáy là 1 vì angle có thể = 0
      const imgNum = Math.max(1, Math.ceil(normalizedAngle / 3));

      // Cập nhật lastPos
      lastPos.current = posX;

      const cachedSrc = imgList.current[imgNum];

      if (cachedSrc) {
        setSrc(cachedSrc);
      }
    }
  }, []);

  useEffect(() => {
    preloadImages(imgList, setLoadingProgress).then(() => {
      // Set ảnh đầu tiên sau khi load xong
      const firstImage = imgList.current[1];
      if (firstImage) {
        setSrc(firstImage);
      }
    });
  }, []);

  // useEffect(() => {
  //   preloadImages(imgList, setLoadingProgress).then(() => {
  //     // Set ảnh đầu tiên sau khi load xong
  //     const firstImage = imgList.current["1"];
  //     if (firstImage) {
  //       setSrc(firstImage);
  //     }
  //   });

  //   return () => {
  //     // Clean up image blobs
  //     Object.values(imgList.current).forEach((url) => {
  //       if (url && url.startsWith("blob:")) {
  //         URL.revokeObjectURL(url);
  //       }
  //     });
  //   };
  // }, []);

  useEffect(() => {
    if (loadingProgress === 100 && containerRef.current) {
      const handleMouseDown = (e: MouseEvent) => {
        lastPos.current = e.clientX;
        setIsMoving(true);
      };

      const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        lastPos.current = touch.clientX;
        setIsMoving(true);
      };

      const handleMouseUp = () => {
        setIsMoving(false);
        lastPos.current = null;
        toggleNavbar({ state: false });
      };

      const handleResize = () => {
        sensitivity.current = calculateSen();
      };

      containerRef.current.addEventListener("mousedown", handleMouseDown);
      containerRef.current.addEventListener("mouseup", handleMouseUp);

      // mobile
      containerRef.current.addEventListener("touchstart", handleTouchStart);
      containerRef.current.addEventListener("touchend", handleMouseUp);

      containerRef.current.addEventListener("resize", handleResize);

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener(
            "mousedown",
            handleMouseDown,
          );
          containerRef.current.removeEventListener("mouseup", handleMouseUp);

          containerRef.current.removeEventListener(
            "touchstart",
            handleTouchStart,
          );
          containerRef.current.removeEventListener("touchend", handleMouseUp);

          containerRef.current.removeEventListener("resize", handleResize);
        }
      };
    }
  }, [loadingProgress]);

  useEffect(() => {
    if (isMoving && loadingProgress === 100) {
      const handleMouseMove = (e: MouseEvent) => {
        calculateAngle(e.clientX);
        toggleNavbar({ state: true });
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        calculateAngle(touch.clientX);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);

        window.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isMoving, loadingProgress, calculateAngle]);

  if (loadingProgress < 100) {
    return <PageLoader loadingProgress={loadingProgress} />;
  }

  return (
    <div className='w-dvw h-dvh' ref={containerRef}>
      <img
        src={src}
        alt=''
        className='size-full object-cover select-none'
        draggable='false'
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
      />
    </div>
  );
};
export default Overview;
