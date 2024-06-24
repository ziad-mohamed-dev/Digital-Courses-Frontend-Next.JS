import Link from "next/link";
import React from "react";

function Hero() {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-32 h-screen">
				<div className="mx-auto max-w-xl text-center">
					<h1 className="text-3xl font-extrabold sm:text-5xl">
						All Your Digital Products
						<strong className="font-extrabold text-primary sm:block">
							Its One Click Away
						</strong>
					</h1>

					<p className="mt-4 sm:text-xl/relaxed">
						Start Exploring State Of The Art Assets Now!
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link
							className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primaryHover focus:outline-none focus:ring active:bg-primaryHover sm:w-auto"
							href="/sign-up"
						>
							Get Started
						</Link>

						<a
							className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow shadow-primary hover:text-primaryHover focus:outline-none focus:ring active:text-primaryHover sm:w-auto"
							href="#"
						>
							Learn More
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
