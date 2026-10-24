"use client";

const MAX_SIZE = 2 * 1024 * 1024;

export function PhotoUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Выберите изображение");
      return;
    }
    if (file.size > MAX_SIZE) {
      alert("Размер фото — не более 2 МБ");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4 p-4">
      {value ? (
        <img
          src={value}
          alt="Фото профиля"
          className="h-20 w-20 rounded-full object-cover ring-2 ring-[var(--separator)]"
        />
      ) : (
        <div
          className="h-20 w-20 rounded-full bg-[var(--fill-tertiary)] flex items-center justify-center text-[var(--label-tertiary)] text-[13px] text-center px-2"
        >
          Фото
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="cursor-pointer">
          <span className="text-[15px] font-medium text-[var(--tint)]">
            Выбрать фото
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {value && (
          <button
            type="button"
            className="text-[15px] text-[var(--destructive)] text-left"
            onClick={() => onChange("")}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}
