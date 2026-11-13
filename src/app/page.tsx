import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { StoreList } from "@/components/store-list";
import { processSteps, skills, toolkit } from "@/lib/process";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { getStores } from "@/lib/stores";

const summaries: Record<string, string> = {
  "smart-discount-manager": "From campaign rules to native Shopify discounts, with customer targeting and offer comparisons.",
  "inventory-forecasting": "Turn order history and inventory data into a clearer picture of what to reorder next.",
  "shipping-cost-optimizer": "Compare carrier rates, route by location, and keep checkout moving with timeout fallbacks.",
  "returns-management": "Connect a customer return portal to approvals, shipping labels, refunds, and restocking.",
  "bulk-product-editor": "Make catalog changes with a before-and-after preview, background processing, and one-click undo.",
};

async function StoreWork() {
  const stores = await getStores();
  if (!stores.length) return null;
  return (
    <section className="page-width section-space border-t border-line" aria-labelledby="stores-title">
      <p className="eyebrow">Storefront experience</p>
      <h2 id="stores-title" className="section-title mb-8">Beyond the admin.</h2>
      <StoreList />
    </section>
  );
}

export default function Home() {
  const featured = projects[0];
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header page-width">
        <a href="#" className="wordmark" aria-label={`${site.name}, home`}>rjb<span>.</span></a>
        <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-9">
          <a className="nav-link" href="#work">Work</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href={site.github}>GitHub <span aria-hidden>↗</span></a>
          <a className="nav-contact" href="#contact">Let&apos;s talk <span aria-hidden>↗</span></a>
        </nav>
      </header>

      <main id="main">
        <section className="page-width hero">
          <div className="rise">
            <p className="availability"><span /> Available for Shopify roles & projects</p>
            <p className="eyebrow mt-9">{site.name} / {site.role}</p>
            <h1 className="hero-title">Better commerce.<br />Less <span className="serif-accent">busywork.</span></h1>
            <p className="hero-description">I build Shopify apps and storefronts that turn complicated merchant workflows into simple, useful experiences.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="button-primary">Explore my work <span aria-hidden>↓</span></a>
              <a href={`mailto:${site.email}`} className="button-secondary">Get in touch <span aria-hidden>↗</span></a>
            </div>
            <p className="hero-note">Shopify ecosystem. Full-stack thinking. Merchant-first decisions.</p>
          </div>
          <Link href={`/projects/${featured.slug}`} className="hero-project group rise" aria-label={`Read the ${featured.name} case study`}>
            <div className="flex items-center justify-between gap-4 px-6 pt-6">
              <span className="eyebrow">A closer look at my work</span>
              <span className="project-arrow" aria-hidden>↗</span>
            </div>
            <div className="hero-window">
              <div className="window-bar"><span /><span /><span /><p>Shopify / Smart Discount Manager</p></div>
              <ProjectVisual project={featured} priority sizes="(min-width: 1024px) 580px, 90vw" />
            </div>
            <div className="hero-project-caption">
              <div><p className="font-semibold">Discounts, without the manual setup.</p><p className="mt-1 text-sm text-muted">Rules → campaigns → native Shopify discounts</p></div>
              <span className="text-accent" aria-hidden>→</span>
            </div>
          </Link>
        </section>

        <div className="page-width expertise-strip" aria-label="Core expertise">
          <p>Built around<br /><strong>the Shopify ecosystem</strong></p>
          <span>Custom apps</span><span>Liquid & themes</span><span>APIs & integrations</span><span>Headless storefronts</span>
        </div>

        <section id="work" className="page-width section-space">
          <div className="section-heading">
            <div><p className="eyebrow">01 / Selected work</p><h2 className="section-title">Real problems.<br /><span className="serif-accent">Thoughtful solutions.</span></h2></div>
            <p className="section-intro">A collection of Shopify app projects. Explore the interfaces, the implementation, and the decisions behind each one.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <article key={project.slug} className={`work-card work-card-${i}`}>
                <Link href={`/projects/${project.slug}`} className="work-link group">
                  <div className="work-image">
                    <div className="flex items-center justify-between mb-5"><span className="project-index">PROJECT / {String(i + 1).padStart(2, "0")}</span><span className="project-arrow" aria-hidden>↗</span></div>
                    <div className="project-screen"><ProjectVisual project={project} sizes="(min-width: 768px) 560px, 90vw" />{!project.screenshots.length && <p className="sample-label">Illustrative preview · sample data</p>}</div>
                  </div>
                  <div className="pt-6"><p className="eyebrow text-muted mb-2">Embedded Shopify app</p><h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{project.name}</h3><p className="mt-3 text-muted leading-relaxed max-w-lg">{summaries[project.slug]}</p></div>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Project highlights">{project.highlights.map(h => <li key={h} className="tag">{h}</li>)}</ul>
                  <span className="case-link">Read case study <span aria-hidden>↗</span></span>
                </Link>
              </article>
            ))}
            <div className="project-invitation"><p className="eyebrow">What&apos;s next?</p><h3>Good work starts with<br /><span className="serif-accent">a conversation.</span></h3><p>Building a Shopify team or solving a merchant problem? I&apos;d love to hear about it.</p><a className="button-primary" href={`mailto:${site.email}`}>Let&apos;s connect <span aria-hidden>↗</span></a></div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="page-width section-space">
            <div className="about-intro"><div><p className="eyebrow">02 / The developer behind the work</p><h2 className="section-title">Built with care.<br /><span className="serif-accent">For the people using it.</span></h2></div><div><p className="text-lg leading-relaxed text-white/75">I&apos;m Raphael Jay Bernardo, a Shopify developer connecting the storefront, the admin, and the systems behind them.</p><p className="mt-5 leading-relaxed text-white/60">{site.intro}</p><a className="case-link" href={site.github}>Explore my code <span aria-hidden>↗</span></a></div></div>
            <div className="capability-list">{skills.map((skill, i) => <div key={skill.title}><span className="font-mono text-xs text-white/45">0{i + 1}</span><h3>{skill.title}</h3><p>{skill.body}</p></div>)}</div>
            <div className="toolkit"><p className="eyebrow">My working toolkit</p><div>{toolkit.map(group => <div key={group.group}><h3>{group.group}</h3><p>{group.items.join(" · ")}</p></div>)}</div></div>
          </div>
        </section>

        <section className="page-width section-space" aria-labelledby="approach-title">
          <div className="section-heading"><div><p className="eyebrow">03 / My approach</p><h2 id="approach-title" className="section-title">The details make<br /><span className="serif-accent">the difference.</span></h2></div><p className="section-intro">Useful interfaces are only half the job. The work underneath should be safe, understandable, and resilient.</p></div>
          <ol className="approach-grid">{processSteps.map(step => <li key={step.step}><span className="eyebrow text-accent">{step.step} /</span><h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{step.body}</p></li>)}</ol>
        </section>
        <StoreWork />
        <section id="contact" className="contact-section">
          <div className="page-width section-space"><p className="eyebrow">04 / Let&apos;s build something useful</p><div className="contact-layout"><h2 className="section-title">Your next Shopify<br /><span className="serif-accent">developer?</span></h2><div><p className="text-lg text-muted leading-relaxed max-w-sm">I&apos;m open to Shopify development roles and project collaborations. Tell me about your team and what you&apos;re building.</p><a className="contact-email" href={`mailto:${site.email}`}>{site.email} <span aria-hidden>↗</span></a><div className="mt-6 flex gap-6 text-sm"><a href={site.github}>GitHub ↗</a>{site.linkedin && <a href={site.linkedin}>LinkedIn ↗</a>}</div></div></div></div>
        </section>
      </main>
      <footer className="page-width site-footer"><p>© {site.name}</p><p>Thoughtfully built with Next.js.</p><a href="#">Back to top ↑</a></footer>
    </>
  );
}
