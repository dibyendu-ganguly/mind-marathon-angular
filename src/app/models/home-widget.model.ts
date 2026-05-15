export interface HomeWidget {
  text: string;
  secondaryText: string;
  color: string;
  image: string;
  icon: string;
}

export interface HomeQuote {
  quote: string;
  author: string;
}

export type OnThisDayEventAPIResponse = {
  wikipedia: string;
  date: string;
  events?: OnThisDayEvents[];
  births?: OnThisDayEvents[];
  deaths?: OnThisDayEvents[];
}

export interface OnThisDayEvents {
  year: string
  description: string
  wikipedia: WikipediaLinks[]
}
export interface WikipediaLinks {
  title: string
  wikipedia: string
}
export interface OnThisDayEventData {
  Events: OnThisDayEvents[]
  Births: OnThisDayEvents[]
  Deaths: OnThisDayEvents[]
}