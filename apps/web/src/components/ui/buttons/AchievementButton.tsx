"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type * as React from "react";

interface AchievementButtonProps {
	hasNewAchievement?: boolean;
}

export function AchievementButton({
	hasNewAchievement = true,
}: AchievementButtonProps) {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.push("/achievements")}
			className={cn(
				"relative h-[40px] sm:h-[45px] md:h-[50px] w-[96vw] max-w-[360px] sm:max-w-[440px] md:max-w-[520px] rounded-[20px] bg-brand-secondary shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-brand-secondary/90",
				"flex items-center justify-center",
				"transform transition-all duration-300 hover:scale-105",
				"mx-auto"
			)}
		>
			<div className="absolute left-4 sm:left-5 md:left-6">
				{hasNewAchievement && (
					<div className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full bg-accent-red" />
				)}
			</div>
			<span className="font-spaceGrotesk text-base sm:text-lg md:text-xl font-medium text-white">
				Logros Recientes
			</span>
		</button>
	);
}
