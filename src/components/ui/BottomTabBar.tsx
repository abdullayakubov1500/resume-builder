"use client";

export function BottomTabBar<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <nav
      className="glass-bar lg:hidden fixed bottom-0 inset-x-0 z-20 border-t border-[var(--separator)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Разделы"
    >
      <div className="grid grid-cols-2 h-[49px]">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`text-[10px] font-medium tracking-wide ${
                selected
                  ? "text-[var(--tint)]"
                  : "text-[var(--label-secondary)]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
