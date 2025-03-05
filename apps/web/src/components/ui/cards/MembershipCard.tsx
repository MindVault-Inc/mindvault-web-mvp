"use client";

interface MembershipCardProps {
  expiryDate: string;
  isActive: boolean;
  cost: number;
}

export function MembershipCard({
  expiryDate,
  isActive,
  cost,
}: MembershipCardProps) {
  return (
    <div className="w-full rounded-[30px] bg-brand-secondary p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] sm:p-7 md:p-8">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Awaken Pro
        </h2>
        <div className="rounded-[20px] bg-brand-primary px-4 py-1 shadow sm:px-5 sm:py-2">
          <span className="text-base font-bold text-white sm:text-lg">
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      <p className="mb-4 text-sm font-bold text-white/80 sm:text-base md:mb-6">
        Tu próximo pago de membresía está programado para {expiryDate}
      </p>

      <div className="flex justify-end">
      </div>
    </div>
  );
}