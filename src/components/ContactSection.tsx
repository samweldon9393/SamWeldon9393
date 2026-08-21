import { site, socialLinks } from '../data/site';
import Reveal from './Reveal';

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="card overflow-hidden p-8 sm:p-12">
            <div className="max-w-2xl">
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title" className="heading-lg mt-3">
                Get in touch
              </h2>
              <p className="body-muted mt-4">
                Always happy to talk about a project, a role, or anything I have built.
              </p>

              <a className="btn-primary mt-8" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10
                             bg-white/5 px-4 py-2 text-sm text-muted transition duration-200
                             ease-soft hover:border-white/25 hover:text-white"
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <img src={link.icon} alt="" className="h-4 w-4 object-contain" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
