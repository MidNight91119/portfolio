import { useEffect, useState, type ReactNode } from 'react'
import { about, achievements, education, experience, profile, projects, skills, type Project } from './content'

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // storage can be blocked; the theme still applies for this visit
    }
  }, [theme])
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')] as const
}

function ThemeToggle() {
  const [theme, toggle] = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="rounded-md border border-line p-2 text-muted transition hover:text-ink"
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}

function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-14">
      <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</h2>
      {children}
    </section>
  )
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-md border border-dashed border-line bg-bg px-3 py-2.5 font-mono text-[11px] text-muted">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-accent">→</span>}
          <span className="text-ink">{s}</span>
        </span>
      ))}
    </div>
  )
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-[15px] leading-relaxed">
      {items.map((pt) => (
        <li key={pt} className="flex gap-3">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
        <a href={p.repo} target="_blank" rel="noreferrer" className="font-mono text-xs text-accent hover:underline">
          GitHub ↗
        </a>
      </div>
      <p className="mt-1 text-sm text-muted">{p.tagline}</p>
      <div className="mt-4">
        <Flow steps={p.flow} />
      </div>
      <div className="mt-4">
        <Points items={p.points} />
      </div>
      <div className="mt-5">
        <Tags items={p.stack} />
      </div>
    </article>
  )
}

const nav = [
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

export default function App() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <header className="sticky top-0 z-10 -mx-4 flex items-center justify-between border-b border-line bg-bg/85 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <a href="#top" className="font-mono text-sm font-semibold">
          ayush<span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-4 text-sm text-muted">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="hidden hover:text-ink sm:inline">
              {label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <section className="py-16 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{profile.role}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{profile.pitch}</p>
          <p className="mt-4 font-mono text-xs text-muted">{profile.location}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition hover:opacity-90"
            >
              Resume (PDF)
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md border border-line px-4 py-2 text-sm font-medium transition hover:border-accent"
            >
              Email me
            </a>
            {profile.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-2 text-sm text-muted transition hover:text-ink"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
          <div className="mt-12 space-y-4 text-[15px] leading-relaxed sm:text-base">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <Section id="experience" label="Experience">
          {experience.map((e) => (
            <div key={e.company} className="mb-12 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {e.role} · <span className="text-accent">{e.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted">
                  {e.period} · {e.place}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{e.context}</p>
              <div className="mt-5">
                <Points items={e.points} />
              </div>
              <div className="mt-5">
                <Tags items={e.stack} />
              </div>
            </div>
          ))}
        </Section>

        <Section id="projects" label="Projects">
          <div className="space-y-6">
            {projects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </Section>

        <Section id="skills" label="Skills">
          <dl className="grid gap-5 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group}>
                <dt className="mb-2 text-sm font-semibold">{s.group}</dt>
                <dd>
                  <Tags items={s.items} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold">Education</h3>
              <p className="text-[15px]">{education.degree}</p>
              <p className="text-sm text-muted">
                {education.school} · {education.period} · {education.note}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold">Achievements</h3>
              <ul className="space-y-1 text-sm text-muted">
                {achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="contact" label="Contact">
          <p className="max-w-xl text-lg leading-relaxed">
            I'm looking for backend and backend-AI roles, remote or in India. Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-block break-all font-mono text-base text-accent hover:underline sm:text-lg"
          >
            {profile.email}
          </a>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-ink">
                {l.label} ↗
              </a>
            ))}
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8 font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · React, TypeScript, Tailwind
      </footer>
    </div>
  )
}
