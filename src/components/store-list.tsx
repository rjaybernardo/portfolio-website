import Image from "next/image";

import { getStores } from "@/lib/stores";

export async function StoreList() {
  const stores = await getStores();

  if (stores.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line px-6 py-10 text-center text-muted">
        Recent store work is being added.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {stores.map((store) => (
        <li key={store.id}>
          <a
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent"
          >
            {store.image_url && (
              <Image
                src={store.image_url}
                alt={`${store.name} storefront`}
                width={960}
                height={600}
                unoptimized
                className="aspect-[16/10] w-full border-b border-line object-cover object-top"
              />
            )}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium group-hover:text-accent">{store.name} ↗</h3>
                {store.period && <span className="shrink-0 text-sm text-muted">{store.period}</span>}
              </div>
              {store.role && <p className="text-sm text-accent">{store.role}</p>}
              {store.summary && <p className="text-sm leading-relaxed text-muted">{store.summary}</p>}
              {store.tags.length > 0 && (
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {store.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
