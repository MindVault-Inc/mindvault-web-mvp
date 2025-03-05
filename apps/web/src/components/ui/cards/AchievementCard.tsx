"use client";

import type * as React from "react";

interface AchievementCardProps {
	title?: string;
	description?: string;
	date?: string;
}

export function AchievementCard({
	title = "Explorador de Ideologías",
	description = "Completó la Prueba de Ideología",
	date = "[fecha]",
}: AchievementCardProps) {
	return (
		<article className="flex w-full items-center gap-4 md:gap-8 rounded-2xl md:rounded-3xl bg-white p-4 md:p-6 shadow-md transition-all duration-300 hover:shadow-lg">
			<div className="relative flex-shrink-0" aria-hidden="true">
				<div
					className="h-16 w-16 md:h-20 md:w-20 rounded-full"
					style={{ backgroundColor: "#55BCB3" }}
				>
					<div
						className="absolute left-1/2 top-1/2 h-12 w-12 md:h-16 md:w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
						style={{ backgroundColor: "#2D3436" }}
					>
						<div
							className="absolute left-1/2 top-1/2 h-4 w-4 md:h-5 md:w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
							style={{ backgroundColor: "#FF7675" }}
						/>
					</div>
				</div>
			</div>
			<div className="space-y-1">
				<h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
				<p className="text-xs md:text-sm text-gray-600">{description}</p>
				<p className="text-xs text-gray-500">
					{date.toLowerCase() === "locked" || date.toLowerCase() === "[date]" || date.toLowerCase() === "[fecha]" 
						? "Bloqueado" 
						: `Obtenido el ${date}`}
				</p>
			</div>
		</article>
	);
}