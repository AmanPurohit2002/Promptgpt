"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [providers, setProviders] = useState(null);

  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const getSignIn = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    getSignIn();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assests/images/logo.svg"
          alt="PromptGpt Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptGPT</p>
      </Link>

      {/* Desktop Application */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <>
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src="/assests/images/logo.svg"
                  alt="profile-image"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Application */}

      <div className="sm:hidden flex relative ">
        {isUserLoggedIn ? (
          <>
            <div className="flex">
              <Image
                src="/assests/images/logo.svg"
                alt="profile-image"
                width={30}
                height={30}
                className="rounded-full cursor-pointer"
                onClick={() => {
                  setToggleDropDown((prev) => !prev);
                }}
              />
              {toggleDropDown ? (
                <>
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      Create prompt
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setToggleDropDown(false);
                        signOut();
                      }}
                      className="mt-5 w-full black_btn"
                    >Sign Out</button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;