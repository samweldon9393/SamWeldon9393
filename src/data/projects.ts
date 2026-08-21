/*
 * Everything on the Projects section of the home page comes from here. Adding a
 * project means adding an entry, not writing markup.
 */

type ProjectBase = {
  id: string;
  title: string;
  /** One line under the title on the card. Keep it to a sentence. */
  blurb: string;
};

/** Embeds a live site in an iframe, scaled down as a thumbnail. */
export type EmbedProject = ProjectBase & {
  kind: 'embed';
  url: string;
};

/** Plays a single clip. */
export type VideoProject = ProjectBase & {
  kind: 'video';
  src: string;
};

/** Cycles through several clips with prev/next arrows. */
export type VideoSeriesProject = ProjectBase & {
  kind: 'video-series';
  sources: string[];
};

/** The D3 sentiment chart, which renders its own component. */
export type ChartProject = ProjectBase & {
  kind: 'chart';
  repoUrl: string;
  /** The longer write-up shown beside the chart on the featured card. */
  description: string;
};

export type Project = EmbedProject | VideoProject | VideoSeriesProject | ChartProject;

export type ProjectSection = {
  id: string;
  heading: string;
  projects: Project[];
};

export const projectSections: ProjectSection[] = [
  {
    id: 'app-projects',
    heading: 'App Projects',
    projects: [
      {
        kind: 'embed',
        id: 'sing-sing-maps',
        title: 'Sing Sing Prison Museum Maps App',
        blurb: 'An interactive maps app built for the Sing Sing Prison Museum.',
        url: 'https://samweldon9393.github.io/SingSingPrisonMuseum-maps/',
      },
      {
        kind: 'embed',
        id: 'safe-works',
        title: 'SafeWorks: Harm Reduction Service Locator',
        blurb: 'A locator that helps people find nearby harm reduction services.',
        url: 'https://samweldon9393.github.io/SafeWorks/',
      },
    ],
  },
  {
    id: 'data-projects',
    heading: 'Data Projects',
    projects: [
      {
        kind: 'chart',
        id: 'coach-graphs',
        title: 'Reddit Hates Coaches',
        blurb: 'Sentiment analysis of roughly 100,000 Reddit comments about NBA head coaches.',
        repoUrl: 'https://github.com/samweldon9393/Reddit-Hates-Coaches',
        description:
          'Sentiment analysis of Reddit comments about NBA head coaches. ' +
          'The graph displays negative comments in red and positive comments in blue, ' +
          'it is sorted by ratio, so for example, the two leftmost coaches are the only ones to ' +
          'receive more positive than negative comments. The difference in bar sizes demonstrates ' +
          'a limitation of the data, but it also provides interesting insights into the impact of ' +
          'market size and tenure on coach popularity. ' +
          'Approximately 100,000 comments were scraped and analyzed for this project. ' +
          'Analysis used a pre-trained model, and the data collection was a bit crude ' +
          'due to technical/time limitations, but the results do track very closely to ' +
          'expected values based on anecdotal knowledge of public sentiment surrounding subjects.',
      },
      {
        kind: 'video-series',
        id: 'sing-sing-animations',
        title: 'Sing Sing Prison Museum Animations',
        blurb: 'Short animated pieces produced for the Sing Sing Prison Museum.',
        sources: ['/images/Alone.mp4', '/images/Forgiveness.mp4', '/images/Love.mp4'],
      },
    ],
  },
  {
    id: 'school-projects',
    heading: 'School Projects',
    projects: [
      {
        kind: 'video',
        id: 'mymake',
        title: 'MyMake: Implement make in C++',
        blurb: 'A working implementation of make, written from scratch in C++.',
        src: '/images/mymake2.mp4',
      },
      {
        kind: 'video',
        id: 'lab7',
        title: 'Webserver: Web Server from scratch in C',
        blurb: 'An HTTP server built from the socket layer up, in C.',
        src: '/images/lab7.mp4',
      },
    ],
  },
];
