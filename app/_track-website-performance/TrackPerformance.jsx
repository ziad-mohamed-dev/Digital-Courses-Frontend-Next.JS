"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

function TrackPerformance() {
	return (window &&
		<>
			<SpeedInsights />
			<Analytics />
		</>
	);
}

export default TrackPerformance;
