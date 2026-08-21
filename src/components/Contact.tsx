import { socialLinks } from '../data/site';

type Props = {
  /** The home page left-aligns these; About centres them. */
  align?: 'start' | 'center';
};

export default function Contact({ align = 'start' }: Props) {
  return (
    <section id="contact" className="mx-auto max-w-2xl pb-12 sm:pb-24 lg:pb-40">
      <div className="mx-auto flex max-w-2xl flex-row justify-center">
        <h2 className="mb-6 mt-4 text-2xl">Contact</h2>
      </div>

      <div
        className={`flex flex-row items-center space-x-10 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        {socialLinks.map((link) => {
          const external = link.href.startsWith('http');
          return (
            <a
              key={link.label}
              className="mx-1 flex flex-row items-center justify-center"
              href={link.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <img
                className={`mx-1 transition duration-300 hover:rotate-180 ${link.iconClass}`}
                src={link.icon}
                alt=""
              />
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
