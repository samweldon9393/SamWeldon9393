export type GalleryItem =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; label: string };

/* Add to this list to add a tile to the photos page. */
export const gallery: GalleryItem[] = [
  { kind: 'image', src: '/images/Seafood.jpg', alt: 'Sanjeev, Chris, Marty, me' },
  { kind: 'image', src: '/images/Mom.jpg', alt: 'Mom and me' },
  { kind: 'image', src: '/images/Winnie2.jpg', alt: 'Winnie' },
  { kind: 'image', src: '/images/Outside.jpg', alt: 'Jake, Paul, me' },
  { kind: 'image', src: '/images/Headshot.jpg', alt: 'Me' },
  { kind: 'image', src: '/images/Graduation.jpg', alt: 'Graduation with Corina' },
  { kind: 'image', src: '/images/Me_Josh_Luci.PNG', alt: 'Friends' },
  { kind: 'image', src: '/images/Tree.jpeg', alt: 'Christmas tree' },
  { kind: 'image', src: '/images/Me_Julia_KOR.JPG', alt: 'Julia and me in Korea' },
  { kind: 'video', src: '/images/Video.mov', label: 'Winnie' },
];
