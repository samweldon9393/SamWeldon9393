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

/** A published piece, linked out to wherever it lives. */
export type WritingProject = ProjectBase & {
  kind: 'writing';
  /** Drives the call to action: "Read the post" vs "Read the paper". */
  form: 'post' | 'paper';
  url: string;
  /** Where it was published, shown as the card's eyebrow. */
  publication: string;
  /** ISO date; formatted for display by the card. */
  date: string;
  /** Every author, in published order, including Sam - the card highlights him. */
  authors: string[];
  /** Optional citation line, e.g. an arXiv identifier. */
  identifier?: string;
};

/** The D3 sentiment chart, which renders its own component. */
export type ChartProject = ProjectBase & {
  kind: 'chart';
  repoUrl: string;
  /** The longer write-up shown beside the chart on the featured card. */
  description: string;
};

export type Project =
  | EmbedProject
  | VideoProject
  | VideoSeriesProject
  | ChartProject
  | WritingProject;

/** Kinds that are given the full width of the grid rather than one column. */
export function isWideProject(project: Project) {
  return project.kind === 'chart' || project.kind === 'writing';
}

export type ProjectSection = {
  id: string;
  heading: string;
  projects: Project[];
};

export const projectSections: ProjectSection[] = [
  {
    id: 'writing',
    heading: 'Writing',
    projects: [
      {
        kind: 'writing',
        form: 'post',
        id: 'agents-want-branches',
        title: 'Agents Just Want To Have\u2026 Branches',
        blurb:
          'Benchmarking how lakehouse platforms handle database branching, and what that means ' +
          'for agent workflows that branch constantly. Part 1 of a series on the state of OLAP branching.',
        url: 'https://bauplanlabs.com/post/agents-just-want-to-have-branches',
        publication: 'Bauplan Labs',
        date: '2026-06-23',
        authors: ['Jacopo Tagliabue', 'Giacomo Piccinini', 'Elaine Ang', 'Sam Weldon'],
      },
      {
        kind: 'writing',
        form: 'paper',
        id: 'branchbench',
        title: 'BranchBench: Aligning Database Branching with Agentic Demands',
        blurb:
          'A benchmark for branching relational databases under agent workloads. Across five ' +
          'production systems it finds a hard trade-off: the ones that branch fastest read far ' +
          'more slowly as branches deepen, and the ones with fast data operations pay heavily ' +
          'to create and switch branches.',
        url: 'https://arxiv.org/abs/2604.17180',
        publication: 'arXiv preprint',
        date: '2026-04-19',
        authors: [
          'Elaine Ang',
          'Sam Weldon',
          'In Keun Kim',
          'Kevin Durand',
          'Kostis Kaffes',
          'Eugene Wu',
        ],
        identifier: 'arXiv:2604.17180 [cs.DB]',
      },
    ],
  },
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
