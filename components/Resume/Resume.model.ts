import { IResumeProps } from './Resume.type'

export const model: IResumeProps = {
  heading: 'Teacher Resume',
  educations: [
    {
      _id: '1',
      university_name: 'Test univarsity 1',
      faculty: 'Test faculty 1',
      specialization: 'Test specialization',
      date_month_end: '10',
      date_month_start: '4',
      date_year_start: 2010,
      date_year_end: 2014,
    },
    {
      _id: '2',
      university_name: 'Test univarsity 2',
      faculty: 'Test faculty 2',
      specialization: 'Test specialization',
      date_month_end: '6',
      date_month_start: '2',
      date_year_start: 2014,
      date_year_end: 2018,
    },
  ],
  work_experiences: [
    {
      _id: '1',
      company_name: 'Test company name 1',
      position: 'Test position 1',
      place_destination: 'Test place destination 1',
      date_month_end: '5',
      date_month_start: '7',
      date_year_start: 2018,
      date_year_end: 2020,
    },
    {
      _id: '2',
      company_name: 'Test company name 2',
      position: 'Test position 2',
      place_destination: 'Test place destination 2',
      date_month_end: '2',
      date_month_start: '9',
      date_year_start: 2020,
      date_year_end: 2023,
    },
  ],
}
