/** Text link with an arrow that nudges on hover. */
export default function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 text-sm text-white transition-colors
                 duration-200 hover:text-accent"
    >
      {children}
      <svg
        className="h-3.5 w-3.5 transition-transform duration-200 ease-soft
                   group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
    </a>
  );
}
