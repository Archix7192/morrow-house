export interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  year: string;
  description: string;
  images: string[];
  heroImage: string;
}

export const projects: Project[] = [
  {
    id: 'limestone-house',
    title: 'The Limestone House',
    location: 'Cotswolds, UK',
    type: 'Residential',
    year: '2024',
    description: 'A considered renovation of a Grade II listed limestone cottage, balancing heritage constraints with contemporary living. Natural materials and a muted palette honor the building\'s history while creating spaces that feel both timeless and deeply personal.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  },
  {
    id: 'study-in-stillness',
    title: 'A Study in Stillness',
    location: 'Copenhagen, Denmark',
    type: 'Apartment Renovation',
    year: '2023',
    description: 'Transforming a 1960s apartment into a sanctuary of calm. The design strips back to essentials—oak, stone, linen, light—creating rooms that breathe. Custom joinery and considered lighting choreograph the daily rituals of rest and work.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-63a8b1d0d9c5?w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
  },
  {
    id: 'courtyard-residence',
    title: 'The Courtyard Residence',
    location: 'Melbourne, Australia',
    type: 'Residential',
    year: '2024',
    description: 'A family home organized around a central courtyard, blurring the boundary between inside and out. Rammed earth walls, spotted gum timber, and expansive glazing create a dialogue with the landscape. The plan unfolds slowly, revealing moments of connection and retreat.',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-63a8b1d0d9c5?w=1600&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
  },
  {
    id: 'olive-oak',
    title: 'Olive & Oak',
    location: 'Tuscany, Italy',
    type: 'Boutique Hospitality',
    year: '2022',
    description: 'A restored farmhouse offering six guest suites, a shared dining room, and a library. The interiors draw from the surrounding olive groves and oak forests—terracotta, plaster, aged brass, hand-loomed textiles. A place designed for slowness and gathering.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-63a8b1d0d9c5?w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=80',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154340-63a8b1d0d9c5?w=1600&q=80',
  },
];