import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import TrackPerformance from "./_track-website-performance/trackPerformance";
import { ClerkProvider } from "@clerk/nextjs";
import CartContextProvider from "./_context/CartContext";

const inter = Roboto({ subsets: ["latin"], weight: "700" });

export const metadata = {
	title: "Digital Courses",
	description: "Digital Courses",
};

export default function RootLayout({ children }) {
	return (
		<>
			<TrackPerformance />
			<ClerkProvider>
				<CartContextProvider>
					<html lang="en" className="dark">
						<body
							className={`${inter.className} dark:bg-gray-900 dark:text-white`}
						>
							<div className="min-h-[calc(100vh-99px-80px)]">
								<Header />
								{children}
							</div>
							<Footer />
						</body>
					</html>
				</CartContextProvider>
			</ClerkProvider>
		</>
	);
}
