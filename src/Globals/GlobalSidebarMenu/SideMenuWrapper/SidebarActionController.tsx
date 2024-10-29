"use client";
import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/Components/Images/External/UI/sidebar";
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
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ThemeSchema } from "@/Global/GlobalSiteNavigators/NavigationState/Constants/structure";
import ImageContainer from "@/Components/Images/ImageContainer";
import { RoutesConfiguration } from "@/Constants/structure";
import { APP_CONFIG } from "@/index";

export function SidebarDemo() {
  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler /> },
    { label: "Workflows", href: "#", icon: <IconJumpRope /> },
    { label: "Connections", href: "#", icon: <IconFolderSymlink /> },
    { label: "Templates", href: "#", icon: <IconCpu /> },
    { label: "Settings", href: "#", icon: <IconSettings /> },
    { label: "Logs", href: "#", icon: <IconClockUp /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft /> },
  ];

  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [logoColor, setLogoColor] = useState<string>(ThemeSchema.BLK_CL);
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  useEffect(() => {
    const isLightTheme = theme === "light";
    setLogoColor(isLightTheme ? "" : ThemeSchema.BLK_CL);
  }, [theme]);

  const imageContainerProps = {
    src: logoColor ? "/test2.png" : "/test.png",
    width: 45,
    height: 65,
    alt: "SaaSy Logo",
  };
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const renderContent = () => {
    switch (selectedOption) {
      case capitalizeFirst(RoutesConfiguration.DASHBOARD.substring(1)):
        return <APP_CONFIG.DOC_TN/>;
      case capitalizeFirst(RoutesConfiguration.WORKFLOWS.substring(1)):
        return <APP_CONFIG.CL_N/>;
      case capitalizeFirst(RoutesConfiguration.CONNECTIONS.substring(1)):
        return <APP_CONFIG.PR_S/>;
      case capitalizeFirst(RoutesConfiguration.TEMPLATES.substring(1)):
        return <APP_CONFIG.PR_C/>;
      case capitalizeFirst(RoutesConfiguration.ENTERPRISE.substring(1)):
        return <APP_CONFIG.EN_TP/>;
      case capitalizeFirst(RoutesConfiguration.LOGS.substring(1)):
        return <APP_CONFIG.RC_S/>;
      case "Logout":
        return <APP_CONFIG.DSH/>;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? (
              <div className="flex items-center text-xl font-bold">
                <ImageContainer {...imageContainerProps} /> Mavexa
              </div>
            ) : (
              <ImageContainer {...imageContainerProps} />
            )}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => setSelectedOption(link.label)}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1 w-full p-4 bg-white dark:bg-neutral-900">
        {renderContent()}
      </div>
    </div>
  );
}
