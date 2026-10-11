import Image from "next/image";

import { getStores } from "@/lib/stores";

export async function StoreList() {
  const stores = await getStores();

  if (stores.length === 0) {
    return (
      <p className="grid h-full min-h-28 place-items-center rounded-xl border border-dashed border-line px-4 text-center text-sm text-muted">
        Recent store work is being added.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-1">
      {stores.map((store) => (
        <li key={store.id}>
          <a
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            title={store.summary ?? undefined}
            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2"
          >
            {store.image_url ? (
              <Image
                src={store.image_url}
                alt=""
                width={96}
                height={60}
                unoptimized
                className="h-10 w-16 shrink-0 rounded-md border border-line object-cover object-top"
              />
            ) : (
              <span className="grid h-10 w-16 shrink-0 place-items-center rounded-md bg-accent-soft font-semibold text-accent">
                {store.name.charAt(0)}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-sm font-medium group-hover:text-accent">{store.name} ↗</span>
                {store.period && <span className="shrink-0 font-mono text-[11px] text-muted">{store.period}</span>}
              </span>
              <span className="block truncate text-xs text-muted">
                {[store.role, ...store.tags].filter(Boolean).join(" · ")}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
