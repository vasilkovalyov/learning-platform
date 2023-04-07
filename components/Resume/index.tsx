import React from 'react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { IResumeProps } from './Resume.type'

import educationImage from '../../public/svg/book-2.svg'
import workExperienceImage from '../../public/svg/company-1.svg'

function Resume({ heading, educations, work_experiences }: IResumeProps) {
  return (
    <Box className="resume">
      <Typography marginBottom={3} variant="h4" className="MuiTypography font-bold">
        {heading}
      </Typography>
      <Box className="resume__body">
        <Box className="resume__categories-list">
          <Box className="resume__category-item" mb={2}>
            <Box className="resume__category-heading-wrapper" mb={2}>
              <Box className="resume__category-image resume__category-image--education" mr={2}>
                <Image src={educationImage} alt="educationImage" />
              </Box>
              <Typography mb={1} className="MuiTypography resume__category-heading font-bold">
                Education
              </Typography>
            </Box>
            {educations.map((education, index) => (
              <Box key={index} className="resume__category-content" mb={2}>
                <Box className="resume__category-content-left">
                  <Box className="resume__category-years ta-c">
                    {education.date_year_start} - {education.date_year_end}
                  </Box>
                </Box>
                <Box className="resume__category-content-right">
                  <Typography variant="h6" className="MuiTypography font-bold" mb={1}>
                    {education.university_name}
                  </Typography>
                  <Typography variant="body2" className="MuiTypography font-medium" mb={0.5}>
                    {education.faculty}
                  </Typography>
                  <Typography variant="body2" className="MuiTypography font-medium" mb={0.5}>
                    {education.specialization}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className="resume__category-item">
            <Box className="resume__category-heading-wrapper" mb={2}>
              <Box className="resume__category-image resume__category-image--work-experience" mr={2}>
                <Image src={workExperienceImage} alt="workExperienceImage" />
              </Box>
              <Typography mb={1} className="MuiTypography resume__category-heading font-bold">
                Work Experiences
              </Typography>
            </Box>
            {work_experiences.map((workItem, index) => (
              <Box key={index} className="resume__category-content" mb={2}>
                <Box className="resume__category-content-left">
                  <Box className="resume__category-years ta-c">
                    {workItem.date_year_start} - {workItem.date_year_end}
                  </Box>
                </Box>
                <Box className="resume__category-content-right">
                  <Typography variant="h6" className="MuiTypography font-bold" mb={1}>
                    {workItem.company_name}
                  </Typography>
                  <Typography variant="body2" className="MuiTypography font-medium" mb={0.5}>
                    {workItem.position}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Resume
