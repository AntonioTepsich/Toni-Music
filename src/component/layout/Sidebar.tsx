import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { defaultNavItems, NavItem, defaultNavItems2 ,NavItem2 } from "./defaultNavItems";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import { api } from "~/utils/api";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

// add NavItem prop to component prop
type Props = {
  collapsed: boolean;
  navItems?: NavItem[];
  navItems2?: NavItem2[];
  setCollapsed(collapsed: boolean): void;
  shown: boolean;
};

//TODO: backend DELETE
const getReturnedParamsFromSpotifyAuth = (hash: string) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater: any, currentValue) => {
    console.log(`currentValue: ${currentValue}`)
    const [key, value] = currentValue.split("=");
    if(key === undefined) return console.log(`key is undefined`);
    accumulater[key] = value;
    return accumulater;
  }, {});
  return paramsSplitUp;
}

const Sidebar = ({
  collapsed,
  navItems = defaultNavItems,
  navItems2 = defaultNavItems2,
  shown,
  setCollapsed,
}: Props) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

  const providers = api.appsConnected.getProviders.useQuery();

  const session = useSession();
  const isLoggedIn = !session.data;

  const handleLogin = (url: string) => {
    window.location.href = url;
    // console.log(`login spotify: ${url}`)
  };

  // TODO: HOW TO SAVE IT IN THE DATABASE?
  useEffect(() => {
    if(window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
    }
  }
  ,[])

  return (
    <div
      className={classNames({
        "bg-indigo-700 text-zinc-50 fixed md:static md:translate-x-0 z-20":
          true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between h-screen sticky inset-0 w-full": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-b-indigo-800 transition-none":
              true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && <span className="whitespace-nowrap">Toni Music</span>}
          <button
            className="grid place-content-center hover:bg-indigo-800 w-10 h-10 rounded-full opacity-0 md:opacity-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    "text-indigo-100 hover:bg-indigo-900 flex": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                  >
                  <Link href={item.href} className="flex gap-2">
                    {item.icon} <span>{!collapsed && item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col">
            {navItems2.map((item, index) => {
              return (
                providers.data?.map((provider) => {
                  if(provider.provider === item.label) {
                    <button
                      key={index}
                      className={classNames({
                        "mb-4  rounded text-xl bg-red-200 px-4 py-2 text-gray-800 hover:bg-red-600 hover:text-gray-100": true, //colors
                        "transition-colors duration-300": true, //animation
                        "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                        "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                      })}
                      onClick={()=>handleLogin(item.href)}
                      >
                      <span>{!collapsed && item.label}</span>
                    </button>
                  }
                  
                  
                }),
                <button
                  key={index}
                  className={classNames({
                    "mb-4  rounded text-xl bg-green-200 px-4 py-2 text-gray-800 hover:bg-green-600 hover:text-gray-100": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                  onClick={()=>handleLogin(item.href)}
                  >
                  <span>{!collapsed && item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        <div
          className={classNames({
            "grid place-content-stretch p-4 ": true,
          })}
        >
          {isLoggedIn && (
            <button className="mb-4  rounded text-xl bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-gray-100" onClick={()=>{signIn()}}>LogIn</button>
            )  
          }
          {!isLoggedIn && (
            <button className="mb-4  rounded text-xl bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-gray-100" onClick={()=>{signOut()}}>SignOut</button>
            )  
          }
          <div className="flex gap-4 items-center h-11 overflow-hidden">
            <Image
              src={
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              height={36}
              width={36}
              alt="profile image"
              className="rounded-full"
            />
            {!collapsed && (
              <div className="flex flex-col ">
                <span className="text-indigo-50 my-0">Tom Cook</span>
                <Link href="/" className="text-indigo-200 text-sm">
                  View Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;