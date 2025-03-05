"use client";

import { FilledButton } from "@/components/ui/buttons/FilledButton";
import { cn } from "@/lib/utils";
import { Flame, LockIcon } from "lucide-react";
import type * as React from "react";

export function QuizCard() {
	return (
		<div
			className={cn(
				"mx-auto h-[160px] sm:h-[180px] md:h-[200px] w-[96vw] max-w-[360px] sm:max-w-[440px] md:max-w-[520px] relative overflow-hidden flex flex-col rounded-[20px] bg-gradient-to-br from-[#DA9540] via-[#E5AB5C] to-[#F1C17A]",
				"transform hover:scale-105 hover:-translate-y-1 hover:rotate-1",
				"shadow-[0_10px_20px_rgba(0,0,0,0.2),_0_6px_6px_rgba(0,0,0,0.25)]",
				"hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)]",
				"transition-all duration-300",
			)}
		>
			<div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 md:p-6">
				<div className="mb-3 sm:mb-4 md:mb-5 text-center font-spaceGrotesk text-lg sm:text-xl md:text-2xl font-medium leading-tight text-white">
					<div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 mb-2">
						<span>Racha Diaria</span>
					</div>
					<span className="text-base sm:text-lg md:text-xl">
						Construye tu camino de aprendizaje
					</span>
				</div>
				<div className="space-y-3 sm:space-y-4">
					<div className="w-full rounded-[12px] bg-white/20 p-3 sm:p-4 md:p-5 backdrop-blur-md">
						<div className="flex items-center justify-between">
							<div className="ml-1.5 font-spaceGrotesk text-base sm:text-lg md:text-xl font-medium leading-tight text-white">
								DESAFÍOS DIARIOS
							</div>
							<Flame
								className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-accent-red animate-pulse"
								aria-hidden="true"
							/>
						</div>
					</div>
					<FilledButton
						variant="primary"
						size="sm"
						icon={LockIcon}
						className="h-9 sm:h-10 md:h-11 w-full transform text-base sm:text-lg md:text-xl transition-all duration-300 cursor-not-allowed opacity-80 bg-gradient-to-r from-accent-red to-[#FF8066]"
						disabled
					>
						Próximamente
					</FilledButton>
				</div>
			</div>
		</div>
	);
}
