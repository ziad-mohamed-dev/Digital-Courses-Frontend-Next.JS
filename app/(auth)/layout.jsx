import Image from "next/image";

function layout({ children }) {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
				<section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
					<img
						alt=""
						src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
						className="absolute inset-0 h-full w-full object-cover opacity-80"
					/>
					<div className="hidden lg:relative lg:flex gap-4 items-center lg:p-12">
						<span className="block text-white" href="#">
							<Image
								src="/logo.svg"
								width={50}
								height={50}
								alt="logo"
								style={{ width: "auto", height: "auto" }}
								priority
							/>
						</span>
						<h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
							Welcome
						</h2>
					</div>
				</section>
				<main className="flex items-center justify-center px-8 py-4 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
					<div className="max-w-xl lg:max-w-3xl">
						<div className="relative -mt-16 block lg:hidden">
							<span
								className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
								href="#"
							>
								<Image
									src="/logo.svg"
									width={50}
									height={50}
									alt="logo"
									style={{ width: "auto", height: "auto" }}
									priority
								/>
							</span>
							<h1 className="m-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
								Welcome
							</h1>
						</div>
						{children}
					</div>
				</main>
			</div>
		</section>
	);
}

export default layout;
