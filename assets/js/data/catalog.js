export const films = [
  {
    id: 'dark-echoes-1939',
    title: 'The dark echo’s of 1939',
    year: '1939',
    certificate: '15',
    format: 'Feature film',
    status: 'available',
    statusLabel: 'Now streaming',
    artwork: 'assets/images/photos/dark-echoes.jpg',
    description: 'A buried broadcast, a vanished town, and one voice still echoing through the static. Uncover the story that history tried to erase.',
    videoUrl: 'https://clip-kingdom-play.lovable.app/embed/21230af6-5a84-4072-befc-276e5f349145'
  },
  {
    id: 'final-lesson-ap-1',
    title: 'The Final Lesson AP 1',
    year: '2026',
    certificate: '15',
    format: 'Feature film',
    status: 'available',
    statusLabel: 'Now streaming',
    artwork: 'assets/images/photos/final-lesson.jpg',
    description: 'One last class reveals a lesson no one was meant to learn. What begins as an ordinary final session becomes a discovery that cannot be forgotten.',
    videoUrl: 'https://clip-kingdom-play.lovable.app/embed/878b4496-ab7a-47fe-8e0f-0b489311241c'
  }
];

export const comingSoon = [
  {
    id: 'hollow-coast',
    title: 'Hollow Coast',
    year: '2027',
    format: 'Feature film',
    status: 'coming-soon',
    statusLabel: 'In production',
    tone: {
      a: '#202a32',
      b: '#0b1015',
      glow: 'rgba(137, 168, 178, .32)'
    }
  },
  {
    id: 'paper-moths',
    title: 'Paper Moths',
    year: '2027',
    format: 'Short film',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
    tone: {
      a: '#3a2c27',
      b: '#100d0c',
      glow: 'rgba(206, 151, 111, .26)'
    }
  },
  {
    id: 'nightjar',
    title: 'Nightjar',
    year: '2027',
    format: 'Limited series',
    status: 'coming-soon',
    statusLabel: 'In development',
    tone: {
      a: '#22203a',
      b: '#0a0911',
      glow: 'rgba(125, 111, 218, .28)'
    }
  },
  {
    id: 'wraithlight',
    title: 'Wraithlight',
    year: '2028',
    format: 'Feature film',
    status: 'coming-soon',
    statusLabel: 'Announced',
    tone: {
      a: '#26342f',
      b: '#090e0c',
      glow: 'rgba(119, 189, 161, .25)'
    }
  }
];

export const catalogue = [...films, ...comingSoon];
