"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";

function Header() {
  const { user, isLoaded } = useUser();
  const pathName = usePathname();
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    user &&
      CartApis.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then(
        (res) => {
          setCart({
            products: res?.data?.data?.[0]?.attributes?.products?.data || [],
            cartId: res?.data?.data?.[0]?.id || undefined,
          });
        }
      );
  }, [user]);

  return (
    !["/sign-in", "/sign-up"].includes(pathName) && (
      <header className="shadow-md dark:shadow-primary dark:shadow-sm">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Image
            src="/logo.svg"
            width={50}
            height={50}
            alt="logo"
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#productSection"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <button
                className="block rounded-md bg-primary px-2 py-2.5 text-sm font-medium text-white transition hover:bg-primaryHover"
                onClick={() => {
                  document.querySelector("html").classList.toggle("dark");
                  if (
                    window.localStorage.theme === "dark" ||
                    window.localStorage.theme === undefined
                  ) {
                    window.localStorage.theme = "light";
                  } else if (window.localStorage.theme === "light") {
                    window.localStorage.theme = "dark";
                  }
                }}
              >
                Theme
              </button>
              {isLoaded && (
                <div className="flex gap-4">
                  {user ? (
                    <>
                      <h2
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => {
                          setOpenCart(!openCart);
                        }}
                      >
                        <ShoppingCart />({cart?.products?.length})
                        {openCart && (
                          <Cart
                            cartState={{
                              openCart,
                              setOpenCart,
                            }}
                          />
                        )}
                      </h2>
                      <UserButton />
                    </>
                  ) : (
                    <>
                      <Link
                        className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primaryHover"
                        href="/sign-in"
                      >
                        Login
                      </Link>
                      <Link
                        className="hidden rounded-md bg-gray-100 dark:bg-gray-800 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-primaryHover sm:block"
                        href="/sign-up"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
