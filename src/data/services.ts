export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'interior-design',
    number: '01',
    title: 'Interior Design',
    description: 'Full-scope interior design for residential and boutique hospitality projects. From concept through to final installation.',
    longDescription: 'We approach each project as a dialogue between architecture, landscape, and the lives lived within. Our process begins with deep listening—understanding how you inhabit space, how light moves through your days, what materials speak to you. From there we develop a cohesive design narrative: spatial planning, material palettes, custom joinery, lighting schemes, and furniture specification. Every detail is considered, every junction resolved. We manage the full project arc—design development, documentation, procurement, and site coordination—so the vision arrives intact.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
  {
    id: 'spatial-planning',
    number: '02',
    title: 'Spatial Planning',
    description: 'Strategic space planning and layout optimisation for new builds, renovations, and adaptive reuse projects.',
    longDescription: 'Good spatial planning is invisible—it simply works. We analyse flow, sightlines, proportions, and the relationship between rooms. Whether reconfiguring a single floor or masterplanning a new residence, we test layouts against real life: morning routines, entertaining, working from home, growing families. We consider storage as architecture, circulation as choreography, and thresholds as moments of transition. The result is a plan that feels inevitable, not imposed.',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
  },
  {
    id: 'furniture-styling',
    number: '03',
    title: 'Furniture & Styling',
    description: 'Curated furniture selection, custom piece design, and interior styling for completed spaces.',
    longDescription: 'The right furniture anchors a room; the right styling gives it soul. We source from makers and ateliers across Europe and Australia—pieces chosen for provenance, craft, and longevity. Where the market falls short, we design custom: a dining table in reclaimed oak, a sofa in Belgian linen, a sideboard in American walnut. Styling is the final layer: ceramics, textiles, objects collected over time, art that holds meaning. We style for living, not for photographs.',
    image: 'https://images.unsplash.com/photo-1600585154340-63a8b1d0d9c5?w=800&q=80',
  },
  {
    id: 'boutique-hospitality',
    number: '04',
    title: 'Boutique Hospitality',
    description: 'Design direction for small-scale hotels, guest houses, and retreat spaces where atmosphere is the product.',
    longDescription: 'Hospitality design demands a different rigour: durability without sterility, intimacy without clutter, brand expression without spectacle. We design the guest journey from arrival to departure—the scent in the lobby, the weight of the door handle, the linen on the bed, the light at 6am. We work with operators who understand that atmosphere cannot be outsourced. Projects range from coastal retreats to urban guesthouses, each rooted in its place and its people.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
];