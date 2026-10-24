import type { Contacts } from "@/types/resume";

export function ContactsBlock({ contacts }: { contacts: Contacts }) {
  const rows = [
    contacts.email && { label: "Email", value: contacts.email },
    contacts.phone && { label: "Телефон", value: contacts.phone },
    contacts.city && { label: "Город", value: contacts.city },
    contacts.telegram && { label: "Telegram", value: contacts.telegram },
    contacts.linkedin && { label: "LinkedIn", value: contacts.linkedin },
  ].filter(Boolean) as { label: string; value: string }[];

  if (!rows.length) return null;

  return (
    <ul className="space-y-1 text-sm text-[var(--resume-muted)]">
      {rows.map((row) => (
        <li key={row.label}>
          <span className="text-[var(--resume-text)] font-medium">
            {row.label}:
          </span>{" "}
          {row.value}
        </li>
      ))}
    </ul>
  );
}
