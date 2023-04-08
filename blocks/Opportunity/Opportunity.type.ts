export interface IOpportunityProps {
  heading: string
  opportunities: IOpportunityItemProps[] | []
}

export interface IOpportunityItemProps {
  heading: string
  items: string[] | []
}
