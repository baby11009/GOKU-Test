import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  OverviewIcon,
  LocationIcon,
  SubdivisionIcon,
  UtilityIcon,
  GalleryIcon,
  EBrochureIcon,
} from "@/assets/icons";
interface Props {
  activePathName: string;
}

type EventDetails = { state: boolean };

type ToggleEventHandler = (e: CustomEvent<EventDetails>) => void;

export const toggleNavbar = ({ state }: EventDetails) => {
  document.dispatchEvent(
    new CustomEvent("toggleNavbar", {
      detail: {
        state,
      },
    }),
  );
};

const navbarMap = [
  {
    path: "/overview",
    label: "Toàn cảnh",
    icon: <OverviewIcon />,
  },
  {
    path: "/location",
    label: "Vị trí",
    icon: <LocationIcon />,
  },
  {
    path: "/subdivision",
    label: "Phân khu",
    icon: <SubdivisionIcon />,
  },
  {
    path: "/utilities",
    label: "Tiện ích",
    icon: <UtilityIcon />,
  },
  {
    path: "/gallery",
    label: "Gallery",
    icon: <GalleryIcon />,
  },
  {
    path: "/ebrochure",
    label: "E-Brochure",
    icon: <EBrochureIcon />,
  },
];

const Navbar = ({ activePathName }: Props) => {
  const [isHidden, setIsHidden] = useState(false);

  const defaultHidden = useRef(isHidden);

  useEffect(() => {
    const handleToggle: ToggleEventHandler = (e) => {
      if (defaultHidden.current) return;
      setIsHidden(e.detail.state);
    };

    document.addEventListener("toggleNavbar", handleToggle as EventListener);

    return () => {
      document.removeEventListener(
        "toggleNavbar",
        handleToggle as EventListener,
      );
    };
  }, []);

  return (
    <div className='fixed w-full bottom-0'>
      <div className='max-w-full md:max-w-[90%]  mx-auto'>
        <nav
          className={`bg-primary backdrop-blur-xs rounded-2xl h-10 md:h-14 transition-all duration-300 ${
            isHidden ? "translate-y-[150%]" : "translate-y-0"
          }`}
        >
          <div className='grid grid-cols-7 h-full'>
            <Link
              to={"/overview"}
              className={`col-span-1 h-full block overflow-hidden   ${
                activePathName === "/overview" ? "pointer-events-none" : ""
              }`}
            >
              <img
                src='/logos/logo.png'
                alt='logo'
                className='size-full object-contain'
              />
            </Link>

            <div className='col-span-6 flex h-full'>
              {navbarMap.map((nav) => {
                const isActive = nav.path === activePathName;
                return (
                  <Link
                    key={nav.path}
                    to={nav.path}
                    className={`flex-1 relative flex items-center justify-center gap-2 transition-all duration-500 border-3 rounded-2xl group
                      ${
                        !isActive
                          ? "border-transparent hover:bg-white/50"
                          : "bg-white/85 border-white pointer-events-none"
                      }`}
                  >
                    <div
                      className={`size-5 lg:size-8 ${
                        isActive
                          ? "text-primary"
                          : "text-white group-hover:text-primary"
                      }`}
                    >
                      {nav.icon}
                    </div>
                    <p
                      className={`hidden md:block text-[8px] lg:text-xs uppercase font-semibold transition-all duration-500 ${
                        isActive
                          ? "text-primary"
                          : "text-white group-hover:text-primary"
                      } `}
                    >
                      {nav.label}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
      <button
        className={`h-4 md:h-6 px-10 md:px-16 bg-primary/85 hover:bg-primary flex justify-center items-center 
        transition-all duration-300 mx-auto relative ${
          isHidden
            ? "rounded-t-xl md:rounded-t-2xl"
            : "rounded-b-xl md:rounded-b-2xl"
        }`}
        onClick={() =>
          setIsHidden((prev) => {
            defaultHidden.current = !prev;
            return !prev;
          })
        }
      >
        <svg
          width='19'
          height='12'
          viewBox='0 0 19 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`transition-all duration-300  ${
            isHidden ? "rotate-180" : ""
          }`}
        >
          <path
            d='M10.9285 11.3331C10.1443 12.1334 8.85568 12.1334 8.07147 11.3331L1.22616 4.34702C-0.0140293 3.08133 0.88268 0.947273 2.65469 0.947273L16.3453 0.947272C18.1173 0.947272 19.014 3.08133 17.7738 4.34702L10.9285 11.3331Z'
            className='fill-white/85'
          ></path>
        </svg>
      </button>
    </div>
  );
};
export default Navbar;
