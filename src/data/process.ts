export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  shortDescription: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    shortDescription: 'Understand the people, place, and requirements.',
    description: 'We begin by listening. Extended conversations with you reveal how you live, what you value, and what the space must hold. We visit the site at different times of day, studying light, orientation, views, and the language of the existing architecture. We research the context—neighbourhood, history, climate, material vernacular. This phase produces a detailed brief, a site analysis, and a shared understanding of the project\'s ambition.',
  },
  {
    id: 'define',
    number: '02',
    title: 'Define',
    shortDescription: 'Establish direction, materials, and spatial priorities.',
    description: 'With the brief as our compass, we develop the conceptual framework. Mood boards, material boards, and spatial diagrams translate abstract ideas into tangible direction. We establish the material palette—stone, timber, plaster, metal, textile—sourced from quarries, mills, and makers we trust. Spatial priorities are set: where to invest, where to restrain, where to surprise. This phase concludes with a presented design direction for your approval.',
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    shortDescription: 'Develop the layout, details, and selected finishes.',
    description: 'The approved direction becomes working drawings. We resolve plans, elevations, sections, and details—custom joinery, lighting layouts, power and data schedules, reflected ceiling plans, finish schedules. We prototype critical details at scale: a section through the kitchen island, the junction of stone and timber, the reveal of a concealed door. We coordinate with structural, mechanical, and hydraulic engineers. Samples are reviewed in situ under project light. This phase delivers a complete documentation package for construction.',
  },
  {
    id: 'deliver',
    number: '04',
    title: 'Deliver',
    shortDescription: 'Coordinate the final selections and implementation.',
    description: 'Construction begins and our role shifts to guardianship. We administer the contract, review shop drawings, approve samples on site, and make the countless decisions that keep the design intent alive. We curate the final styling—furniture placement, art hanging, textile layering, object arrangement. We walk the completed project with you, ensuring every touchpoint meets the standard. The project closes with a handover document: as-built drawings, maintenance guides, supplier contacts, and a warranty schedule.',
  },
];