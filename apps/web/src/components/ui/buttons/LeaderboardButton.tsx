"use client";

import { useRouter } from "next/navigation";

export function LeaderboardButton() {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.push("/leaderboard")}
			className="flex w-[96vw] max-w-[360px] sm:max-w-[440px] md:max-w-[520px] transform items-center justify-between rounded-[20px] bg-brand-tertiary p-3 sm:p-4 md:p-5 text-white transition-all duration-300 hover:scale-105 hover:bg-brand-tertiary/90 mx-auto"
		>
			<div className="flex items-center gap-3 sm:gap-4 md:gap-5">
				<div className="rounded-xl bg-brand-secondary p-2 sm:p-2.5 md:p-3">
					<svg
						viewBox="0 0 24 24"
						className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M16 3H8C7.44772 3 7 3.44772 7 4V7H17V4C17 3.44772 16.5523 3 16 3Z"
							stroke="currentColor"
							strokeWidth="2"
						/>
						<path
							d="M4 8C4 7.44772 4.44772 7 5 7H19C19.5523 7 20 7.44772 20 8V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V8Z"
							stroke="currentColor"
							strokeWidth="2"
						/>
						<path
							d="M12 11L12 17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M8 14L8 17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M16 14L16 17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</div>
				<div className="flex flex-col gap-1 sm:gap-1.5">
					<span className="text-lg sm:text-xl md:text-2xl font-bold">Ver Clasificación</span>
					<span className="text-base sm:text-lg md:text-xl text-slate-200">
						Compara tu posición con otros
					</span>
				</div>
			</div>
			<svg
				className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M9 18L15 12L9 6"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
}
