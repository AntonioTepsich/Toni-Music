import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
    {
        label: "Playlists",
        href: "/webapp/playlists",
        icon: <FolderIcon className="w-6 h-6" />,
    },
    {
        label: "Albums",
        href: "/webapp/albums",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        label: "Artists",
        href: "/webapp/artists",
        icon: <UserGroupIcon className="w-6 h-6" />,
    },
    {
        label: "Tracks",
        href: "/webapp/tracks",
        icon: <CalendarIcon className="w-6 h-6" />,
    },
];