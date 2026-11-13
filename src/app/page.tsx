import { ProjectShowcase } from "@/components/project-showcase";
import { CopyEmail } from "@/components/portfolio-controls";
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
      </header>
      <main id="main">
        <section className="hero page-width">
          <div className="hero-heading">
            <div className="hero-intro-line"><p className="eyebrow">Raphael Jay Bernardo / Shopify Developer</p><p className="availability"><span className="status-dot" /> Open to work</p></div>
            <h1>Hi, I&apos;m <span>Raphael.</span><sup aria-hidden="true">✳</sup></h1>
          </div>
          <div className="hero-layout">
            <div className="hero-copy"><span className="hero-hello" aria-hidden="true">↳</span><h2>Shopify developer.<br />Apps, themes & storefronts.</h2><p className="hero-support">I build Shopify apps and work on themes, storefronts, and integrations. I&apos;m looking for a role where I can contribute, keep learning, and build useful things.</p><div className="hero-actions"><a href="#work" className="button-primary">Explore my work <span aria-hidden="true">↗</span></a><a href={`mailto:${site.email}`} className="text-link">Let&apos;s talk <span aria-hidden="true">↗</span></a></div><div className="hero-socials"><a href={site.github}>GitHub ↗</a><a href={site.linkedin}>LinkedIn ↗</a></div><a className="hero-scroll" href="#work"><span aria-hidden="true">↓</span> SCROLL TO SEE THE WORK</a></div>
            <ProjectShowcase projects={projects.filter(p => p.screenshots.length > 0)} />
          </div>
        </section>
        <div className="expertise-strip"><div className="page-width"><span>MY TOOLKIT</span><p>Shopify <i>✳</i> TypeScript <i>✳</i> React <i>✳</i> GraphQL <i>✳</i> Liquid <i>✳</i> Node.js</p></div></div>
        <section id="work" className="page-width section-space">
          <div className="section-heading"><div><p className="eyebrow">01 / Projects</p><h2 className="section-title">Selected <span className="editorial-word">work.</span></h2></div><div className="section-intro"><p>Shopify app projects, with screenshots, source code, and notes on how they work.</p><span className="mini-label">SELECT A PROJECT TO EXPLORE ↓</span></div></div>
          <WorkExplorer projects={projects} />
        </section>
        <section id="about" className="about-section"><div className="page-width section-space">
          <div className="about-intro"><div><p className="eyebrow">02 / About</p><h2 className="section-title">A little<br /><span className="editorial-word">about me.</span></h2></div><div><p className="about-lead">I&apos;m Raphael Jay Bernardo.</p><p className="about-description">{site.intro}</p><p className="about-description">My focus is making those pieces work together: useful interfaces, deliberate API choices, and safeguards where they matter.</p><a href={site.github} className="text-link">Find me on GitHub <span aria-hidden>↗</span></a></div></div>
          <div className="capability-grid">{skills.map((s,i)=><div className="capability-card" key={s.title}><span className="eyebrow">0{i+1} /</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden><path d={s.icon}/></svg><h3>{s.title}</h3><p>{s.body}</p></div>)}</div>
          <div className="toolkit"><div><p className="eyebrow">Tools of the trade</p><p>A practical stack.<br />Chosen for the job.</p></div><div className="toolkit-groups">{toolkit.map(t=><div key={t.group}><h3>{t.group}</h3><p>{t.items.join(" / ")}</p></div>)}</div></div>
        </div></section>
        <section className="page-width section-space" aria-labelledby="approach-title"><div className="section-heading"><div><p className="eyebrow">03 / Approach</p><h2 id="approach-title" className="section-title">How I <span className="editorial-word">work.</span></h2></div><p className="section-intro">A few things I pay attention to when building apps.</p></div><ol className="approach-grid">{processSteps.map(s=><li key={s.step}><span className="eyebrow">{s.step} /</span><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol></section>
        <StoreWork />
        <section id="contact" className="contact-section"><div className="page-width section-space"><div className="contact-top"><p className="eyebrow">04 / Contact</p><p className="availability"><span className="status-dot" /> Open to Shopify development roles</p></div><h2>Let&apos;s work<br /><span>together.</span><a href={`mailto:${site.email}`} aria-label="Email Raphael Jay Bernardo">↗</a></h2><div className="contact-bottom"><p>Have a Shopify role or project in mind?<br />I&apos;d be happy to hear about it.</p><div><a href={`mailto:${site.email}`} className="contact-email">{site.email} <span aria-hidden>↗</span></a><CopyEmail email={site.email}/></div></div></div></section>
      </main>
      <footer className="site-footer page-width"><p>© {site.name}<span>Shopify Developer</span></p><div><a href={site.github}>GitHub ↗</a><a href={site.linkedin}>LinkedIn ↗</a><a href="#">Back to top ↑</a></div></footer>
    </>
  );
}
