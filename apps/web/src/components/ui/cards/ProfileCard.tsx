"use client";

import type * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/base/avatar";
import { motivationalQuotes } from "@/data/motivationalQuotes";
import { cn } from "@/lib/utils";

interface User {
	name: string;
	last_name: string;
	level: string;
	points: number;
	maxPoints: number;
}

interface ProfileCardProps {
	className?: string;
	user?: User;
}

interface ProfileAvatarProps {
	name: string;
	lastName: string;
}

interface LevelProgressProps {
	points: number;
	maxPoints: number;
}

function ProfileAvatar({ name, lastName }: ProfileAvatarProps) {
	const initials = useMemo(() => {
		return `${name[0]}${lastName[0]}`.toUpperCase();
	}, [name, lastName]);

	return (
		<Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-2 border-white shadow-lg">
			<AvatarFallback className="bg-white text-base sm:text-lg md:text-xl font-bold text-brand-secondary">
				{initials}
			</AvatarFallback>
		</Avatar>
	);
}

function LevelProgress({ points, maxPoints }: LevelProgressProps) {
	const progress = (points / maxPoints) * 100;

	return (
		<div className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px]" aria-label="Level progress">
			<div className="relative h-2 sm:h-2.5 md:h-3 rounded-full bg-white/30">
				<div
					className="absolute left-0 top-0 h-full rounded-full bg-[#E36C59] transition-all duration-300"
					style={{ width: `${progress}%` }}
				/>
			</div>
			<p className="mt-1.5 text-xs sm:text-sm md:text-base font-medium text-white text-center">
				{points}/{maxPoints} puntos para subir de nivel
			</p>
		</div>
	);
}

export function ProfileCard({
	className,
	user = {
		name: "John",
		last_name: "Doe",
		level: "Explorador Consciente",
		points: 45,
		maxPoints: 100,
	},
}: ProfileCardProps) {
	const [quote, setQuote] = useState<string>(motivationalQuotes[0]);

	useEffect(() => {
		const getRandomQuote = (): string => {
			const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
			return motivationalQuotes[randomIndex];
		};

		setQuote(getRandomQuote());

		const intervalId = setInterval(() => {
			setQuote((prevQuote) => {
				let newQuote: string;
				do {
					newQuote = getRandomQuote();
				} while (newQuote === prevQuote);
				return newQuote;
			});
		}, 10000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div
			className={cn(
				"w-[96vw] max-w-[360px] sm:max-w-[440px] md:max-w-[520px] rounded-[24px] bg-gradient-to-br from-[#387478] to-[#2C5154] shadow-lg",
				"transform hover:scale-105 hover:-translate-y-1 hover:rotate-1",
				"shadow-[0_10px_20px_rgba(0,0,0,0.2),_0_6px_6px_rgba(0,0,0,0.25)]",
				"hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)]",
				"transition-all duration-300 mx-auto overflow-hidden md:overflow-visible",
				className,
			)}
		>
			<div className="absolute inset-0 translate-y-2 transform rounded-[24px] bg-black opacity-20 blur-md" />
			<div 
				className={cn(
					"relative z-10 flex flex-col items-center p-4 sm:p-5 md:p-6",
					"max-h-[500px] md:max-h-none overflow-y-auto md:overflow-visible",
					"[&::-webkit-scrollbar]:w-2",
					"[&::-webkit-scrollbar-track]:bg-white/10",
					"[&::-webkit-scrollbar-thumb]:bg-white/20",
					"[&::-webkit-scrollbar-thumb]:rounded-full",
					"[&::-webkit-scrollbar-thumb]:hover:bg-white/30"
				)}
				style={{
					scrollbarWidth: 'thin',
					scrollbarColor: 'rgba(255,255,255,0.2) rgba(255,255,255,0.1)'
				}}
			>
				<ProfileAvatar name={user.name} lastName={user.last_name} />

				<div className="mt-5 sm:mt-6 md:mt-7 text-center w-full">
					<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
						{user.name} {user.last_name}
					</h3>
					<p className="mt-2 sm:mt-2.5 text-lg sm:text-xl md:text-2xl font-medium text-white">
						Nivel: {user.level}
					</p>
				</div>

				<div className="mt-5 sm:mt-6 md:mt-7 w-full flex justify-center">
					<LevelProgress points={user.points} maxPoints={user.maxPoints} />
				</div>

				<div className="mt-5 sm:mt-6 md:mt-7 w-full">
					<p className="mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl font-medium text-white">
						Tu motivación diaria:
					</p>
					<h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight text-accent-red">
						{quote}
					</h2>
				</div>
			</div>
		</div>
	);
}
