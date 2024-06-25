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
			CartApis.getUserCartItems(
				user?.primaryEmailAddress?.emailAddress
			).then((res) => {
				setCart({
					products:
						res?.data?.data?.[0]?.attributes?.products?.data || [],
					cartId: res?.data?.data?.[0]?.id || undefined,
				});
			});
	}, [user]);

	const navLinksClass =
		"text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 max-sm:block max-sm:p-8 max-sm:border-b max-sm:border-b-primary max-sm:hover:border-b-primaryHover max-sm:bg-gray-50 dark:max-sm:bg-gray-900 dark:max-sm:bg-opacity-80 max-sm:bg-opacity-80 dark:max-sm:hover:bg-opacity-100 max-sm:hover:bg-opacity-100 max-sm:text-center";

	return (
		!["/sign-in", "/sign-up"].includes(pathName) && (
			<header className="shadow-md dark:shadow-primary dark:shadow-sm max-sm:relative">
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
						<nav
							aria-label="Global"
							className="hidden md:block max-sm:absolute max-sm:top-full max-sm:left-0 max-sm:w-full max-sm:p-2 max-sm:h-[calc(100vh-140px)]"
							id="myNav"
							onClick={() => {
								const nav = document.getElementById("myNav");
								if (nav.classList.contains("hidden")) {
									nav.classList.replace("hidden", "block");
								} else if (nav.classList.contains("block")) {
									nav.classList.replace("block", "hidden");
								}
							}}
						>
							<ul className="md:flex items-center gap-6 text-sm">
								<li>
									<Link className={navLinksClass} href="/">
										Home
									</Link>
								</li>
								<li>
									<Link
										className={navLinksClass}
										href="#productSection"
									>
										Explore
									</Link>
								</li>
								<li>
									<Link
										className={navLinksClass}
										href="#productSection"
									>
										Projects
									</Link>
								</li>
								<li>
									<Link className={navLinksClass} href="#">
										About Us
									</Link>
								</li>
								<li>
									<Link className={navLinksClass} href="#">
										Contact Us
									</Link>
								</li>
							</ul>
						</nav>
						<div className="flex items-center gap-4">
							<button
								className="block rounded-md bg-primary px-2 py-2.5 text-sm font-medium text-white transition hover:bg-primaryHover"
								onClick={() => {
									document
										.querySelector("html")
										.classList.toggle("dark");
									if (
										window.localStorage.theme === "dark" ||
										window.localStorage.theme === undefined
									) {
										window.localStorage.theme = "light";
									} else if (
										window.localStorage.theme === "light"
									) {
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
												<ShoppingCart />(
												{cart?.products?.length})
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
							<button
								className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
								onClick={() => {
									const nav =
										document.getElementById("myNav");
									if (nav.classList.contains("hidden")) {
										nav.classList.replace(
											"hidden",
											"block"
										);
									} else if (
										nav.classList.contains("block")
									) {
										nav.classList.replace(
											"block",
											"hidden"
										);
									}
								}}
							>
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
