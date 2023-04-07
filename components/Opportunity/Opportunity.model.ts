import { IOpportunityProps } from './Opportunity.type'

export const model: IOpportunityProps = {
  heading: 'Teacher opportunity',
  opportunities: [
    {
      heading: 'Lang speaking',
      items: ['english', 'ukrainian'],
    },
    {
      heading: 'Lang teaching',
      items: ['english', 'ukrainian'],
    },
    {
      heading: 'Subjects',
      items: ['english'],
    },
    {
      heading: 'Students ages',
      items: ['15-20', '20-25'],
    },
  ],
}
