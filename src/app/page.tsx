import { CommerceScene } from "@/components/commerce-scene";
import { CopyEmail, PortfolioControls } from "@/components/portfolio-controls";
import { WorkExplorer } from "@/components/work-explorer";
import { StoreList } from "@/components/store-list";
import { processSteps, skills, toolkit } from "@/lib/process";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { getStores } from "@/lib/stores";

async function StoreWork() {
  const stores = await getStores();
  if (!stores.length) return null;
  return <section className="page-width section-space border-t border-line" aria-labelledby="stores-title"><p className="eyebrow">Storefront experience</p><h2 id="stores-title" className="section-title mb-8">Beyond the admin.</h2><StoreList /></section>;
}

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header page-width">
        <a href="#" className="name-mark" aria-label={`${site.name}, home`}>Raphael Jay Bernardo<span>Shopify Developer / Apps & storefronts</span></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact <span aria-hidden>↗</span></a></nav>
        <PortfolioControls email={site.email} />
      </header>
      <main id="main">
        <section className="hero page-width">
          <div className="hero-copy"><p className="availability"><span className="status-dot" /> Open to roles & collaborations</p><p className="eyebrow hero-kicker">Shopify development / Full-stack thinking</p><h1>Commerce<span className="hero-period">.</span><br /><span className="hero-outline">Engineered</span><span className="hero-period">.</span></h1><p className="hero-description">Complex behind the scenes.<br /><strong>Effortless for the merchant.</strong></p><p className="hero-support">I&apos;m Raphael. I build Shopify apps, storefronts, and integrations that turn everyday friction into better ways to work.</p><div className="hero-actions"><a href="#work" className="button-primary">Explore the work <span aria-hidden>↗</span></a><a href={site.linkedin} className="text-link">Meet the developer <span aria-hidden>↗</span></a></div></div>
          <CommerceScene />
          <div className="hero-bottom"><p><span className="status-dot" /> Designed for merchants. Built for the details.</p><a href="#work">SCROLL TO EXPLORE <span aria-hidden>↓</span></a></div>
        </section>
        <div className="expertise-strip"><div className="page-width"><span>THE ECOSYSTEM</span><p>Shopify <i>✳</i> TypeScript <i>✳</i> React <i>✳</i> GraphQL <i>✳</i> Liquid <i>✳</i> Node.js</p></div></div>
        <section id="work" className="page-width section-space">
          <div className="section-heading"><div><p className="eyebrow">01 / Selected engineering</p><h2 className="section-title">Less repetition.<br /><span className="muted-heading">More possibility.</span></h2></div><div className="section-intro"><p>Five app projects. Five merchant problems.<br />Explore the interface, then go under the hood.</p><span className="mini-label">SELECT A PROJECT TO EXPLORE ↓</span></div></div>
          <WorkExplorer projects={projects} />
        </section>
        <section id="about" className="about-section"><div className="page-width section-space">
          <div className="about-intro"><div><p className="eyebrow">02 / Behind the build</p><h2 className="section-title">A developer who<br />sees the <span className="accent-text">whole system.</span></h2></div><div><p className="about-lead">Good commerce software connects the dots.</p><p className="about-description">{site.intro}</p><p className="about-description">My focus is making those pieces work together: useful interfaces, deliberate API choices, and safeguards where they matter.</p><a href={site.github} className="text-link">See how I think in code <span aria-hidden>↗</span></a></div></div>
          <div className="capability-grid">{skills.map((s,i)=><div className="capability-card" key={s.title}><span className="eyebrow">0{i+1} /</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden><path d={s.icon}/></svg><h3>{s.title}</h3><p>{s.body}</p></div>)}</div>
          <div className="toolkit"><div><p className="eyebrow">Tools of the trade</p><p>A practical stack.<br />Chosen for the job.</p></div><div className="toolkit-groups">{toolkit.map(t=><div key={t.group}><h3>{t.group}</h3><p>{t.items.join(" / ")}</p></div>)}</div></div>
        </div></section>
        <section className="page-width section-space" aria-labelledby="approach-title"><div className="section-heading"><div><p className="eyebrow">03 / Engineering principles</p><h2 id="approach-title" className="section-title">The invisible work.<br /><span className="muted-heading">The visible difference.</span></h2></div><p className="section-intro">The details that rarely make the screenshot.<br />The ones that make the software dependable.</p></div><ol className="approach-grid">{processSteps.map(s=><li key={s.step}><span className="eyebrow">{s.step} /</span><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol></section>
        <StoreWork />
        <section id="contact" className="contact-section"><div className="page-width section-space"><div className="contact-top"><p className="eyebrow">04 / The next chapter</p><p className="availability"><span className="status-dot" /> Open to the right opportunity</p></div><h2>Let&apos;s build<br /><span>what&apos;s next.</span><a href={`mailto:${site.email}`} aria-label="Email Raphael Jay Bernardo">↗</a></h2><div className="contact-bottom"><p>Hiring for your Shopify team?<br />Have a merchant problem worth solving?</p><div><a href={`mailto:${site.email}`} className="contact-email">{site.email} <span aria-hidden>↗</span></a><CopyEmail email={site.email}/></div></div></div></section>
      </main>
      <footer className="site-footer page-width"><p>© {site.name}<span>Commerce, engineered.</span></p><div><a href={site.github}>GitHub ↗</a><a href={site.linkedin}>LinkedIn ↗</a><a href="#">Back to top ↑</a></div></footer>
    </>
  );
}
