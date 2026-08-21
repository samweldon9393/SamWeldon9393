import ContactSection from '../components/ContactSection';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import ProjectCard from '../components/projects/ProjectCard';
import { isWideProject, projectSections } from '../data/projects';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta('Sam Weldon', 'Portfolio of Sam Weldon: app, data, and school projects.');

  return (
    <Layout>
      <Hero />

      <Section
        id="work"
        eyebrow="Selected work"
        title="Things I've built or written"
        description="Publications, web apps, data projects, and a few things that started as coursework and got away from me."
      >
        <div className="space-y-16">
          {projectSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {section.heading}
              </h3>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:gap-8">
                {section.projects.map((project, index) => (
                  <Reveal
                    key={project.id}
                    delay={index * 80}
                    className={`h-full ${isWideProject(project) ? 'sm:col-span-2' : ''}`}
                  >
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <ContactSection />
    </Layout>
  );
}
