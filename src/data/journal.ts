export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

export const journalArticles: JournalArticle[] = [
  {
    id: 'thoughtful-natural-materials',
    title: 'A More Thoughtful Approach to Natural Materials',
    excerpt: 'Why the provenance of stone, the ageing of timber, and the hand of the maker matter more than the label on the sample.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    date: 'March 2024',
    category: 'Materials',
    readTime: '8 min read',
  },
  {
    id: 'what-makes-space-feel-like-home',
    title: 'What Makes a Space Feel Like Home?',
    excerpt: 'An exploration of the intangible qualities—light, proportion, texture, memory—that transform a house into a place of belonging.',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    date: 'February 2024',
    category: 'Philosophy',
    readTime: '6 min read',
  },
  {
    id: 'designing-around-light-texture',
    title: 'Designing Around Light and Texture',
    excerpt: 'How we choreograph natural light and material texture to shape the atmosphere of a room throughout the day and seasons.',
    image: 'https://images.unsplash.com/photo-1600585154340-63a8b1d0d9c5?w=800&q=80',
    date: 'January 2024',
    category: 'Process',
    readTime: '7 min read',
  },
];