import React from "react";
import querystring from "querystring";
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

export type NavItem2 = {
  label: string;
  href: string;
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

// BACKEND
const CLIENT_ID = "2949107dd12e4dfa81cacd2240d6430d"; // Your client id
const SPOTIFY_AUTHORIZE = 'https://accounts.spotify.com/authorize?';
const REDIRECT_URL = 'http://localhost:3000/webapp/playlists';
const SCOPES = ["user-read-currently-playing", "user-read-playback-state", "user-modify-playback-state"]
const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URL,
    show_dialog: true,
});



export const defaultNavItems2: NavItem2[] = [
    {
        label: "spotify",
        href : `https://accounts.spotify.com/authorize?${queryParams}`,
    },
    {
        label: "Youtube Music",
        href: "https://open.spotify.com/",
    }
];