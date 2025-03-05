"use client";

import type { LucideIcon } from "lucide-react";
import type * as React from "react";

interface ActionCardProps {
	title: string;
	backgroundColor: string;
	iconBgColor: string;
	Icon: LucideIcon;
	className?: string;
	onClick?: () => void;
	isClickable?: boolean;
}

export function ActionCard({
	title,
	backgroundColor,
	iconBgColor,
	Icon,
	className = "",
	onClick,
	isClickable = false,
}: ActionCardProps) {
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (
			isClickable &&
			onClick &&
			(event.key === "Enter" || event.key === " ")
		) {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<button
			type="button"
			disabled={!isClickable}
			className={`relative w-[180px] h-[167px] md:w-[200px] md:h-[185px] lg:w-[220px] lg:h-[200px] ${className} ${isClickable ? "cursor-pointer" : ""}`}
			onClick={isClickable ? onClick : undefined}
			onKeyDown={handleKeyDown}
		>
			<div
				className="absolute left-0 top-0 w-full h-full rounded-[30px] shadow-lg"
				style={{ backgroundColor }}
			/>
			<div className="absolute left-[18px] top-[20px] md:left-[22px] md:top-[24px] w-[126px] md:w-[140px] lg:w-[160px] h-[54px] text-white text-base md:text-lg lg:text-xl font-bold">
				{title}
			</div>
			<div
				className="absolute right-[18px] bottom-[18px] md:right-[22px] md:bottom-[22px] w-[50px] h-[50px] md:w-[55px] md:h-[55px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center"
				style={{ backgroundColor: `${iconBgColor}60` }}
			>
				<Icon className="text-white" size={28} />
			</div>
		</button>
	);
}