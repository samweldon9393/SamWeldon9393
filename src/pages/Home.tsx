import Contact from '../components/Contact';
import Layout from '../components/Layout';
import ProjectCard from '../components/projects/ProjectCard';
import { projectSections } from '../data/projects';
import { site } from '../data/site';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta('Sam Weldon', 'Portfolio of Sam Weldon: app, data, and school projects.');

  return (
    <Layout>
      <article className="mb-8 px-4 text-blue-100 sm:px-6 lg:px-0">
        <div className="mx-auto">
          <div className="mx-auto mb-24 mt-12 max-w-xl sm:my-24 lg:my-40 xl:my-48 2xl:my-56 2xl:max-w-2xl">
            <h1 className="mb-4 font-sans text-2xl leading-snug sm:text-3xl md:mb-6 2xl:text-4xl">
              {site.tagline}
            </h1>
          </div>

          <div id="projects" className="flex flex-col items-center justify-center pb-24 text-blue-100">
            {projectSections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <div className="flex flex-col items-center justify-center">
                  <h2 id={section.id} className="mb-6 text-2xl sm:mb-8 lg:mb-10">
                    {section.heading}
                  </h2>
                </div>

                <div className="flex min-h-60 flex-row flex-wrap items-center justify-center pb-16 md:space-x-6 lg:space-x-12">
                  {section.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            ))}

            <Contact />
          </div>
        </div>
      </article>
    </Layout>
  );
}
