"use client";

import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import { SvgIconProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

const OverviewLayout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();

  const sideLinks: {
    title: string;
    icon: ReactElement<SvgIconProps>;
    route: string;
  }[] = [
    {
      title: "Profile Overview",
      icon: <HomeIcon className="mr-3" />,
      route: "/overview/account",
    },
    {
      title: "Change Profile",
      icon: <CreateIcon className="mr-3" />,
      route: "/overview/edit",
    },
  ];

  return (
    <div className="pl-20 pr-20">
      <div className="flex">
        <div className="bg-gray-400 w-[20%] p-5">
          {sideLinks.map((link) => (
            <div
              key={link.title}
              className="flex hover:border-l-4 hover:border-green-400 hover:text-gray-600 pt-3 pl-2 cursor-pointer"
              onClick={() => router.push(link.route)}
            >
              {link.icon}
              <div className="text-xl pb-4">{link.title}</div>
            </div>
          ))}
        </div>
        <div className="bg-white w-full">{children}</div>
      </div>
    </div>
  );
};

export default OverviewLayout;
