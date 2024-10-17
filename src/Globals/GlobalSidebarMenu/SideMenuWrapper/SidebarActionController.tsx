"use client";
import { useEffect, useState } from "react";
import { Sidebar , SidebarBody , SidebarLink } from "@/Components/Images/External/UI/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUser,
  IconClockUp,
  IconCpu,
  IconFolderSymlink,
  IconJumpRope
} from "@tabler/icons-react";
import ThemeSwitcher from "@/Hooks/useThemeSwitcher"
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { ThemeSchema } from "@/Global/GlobalSiteNavigators/NavigationState/Constants/structure";
import ImageContainer from "@/Components/Images/ImageContainer";



export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Workflows",
      href: "#",
      icon: (
        <IconJumpRope className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Connections",
      href: "#",
      icon: (
        <IconFolderSymlink className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Templates",
      href: "#",
      icon: (
        <IconCpu className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logs",
      href: "#",
      icon: (
        <IconClockUp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const { theme } = useTheme(); 
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);

  useEffect(() => {
    const isLightTheme = theme === 'light';
    setLogoColor(isLightTheme ? '' : ThemeSchema.BLK_CL);
  }, [theme]); 

  const imageContainerProps = {
    src: logoColor ? "/Mavexa.png" : "/MavexaLight.png",
    width: 65,
    height: 65,
    alt: "SaaSy Logo",
    className: "shadow-sm",
  };
  return (
    
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ?   (<div className=" flex items-center text-xl font-bold"><ImageContainer {...imageContainerProps}/> Mavexa
              </div>) : (<ImageContainer {...imageContainerProps}/> )}
         
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
              <ThemeSwitcher/>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "/automation",
                icon: (
                  <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
              }}
            />
          </div>
      
        </SidebarBody>
      </Sidebar>
      <Dashboard />

    </div>
  );
}
export const Logo = () => {
  return (
    
  <Link to={'#'}
      
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to={'#'}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
