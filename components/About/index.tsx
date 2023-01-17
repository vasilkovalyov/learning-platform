import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { AboutProps } from './About.type'

function About({ heading, text }: AboutProps) {
  return (
    <Box className="about">
      <Typography marginBottom={3} variant="h4" className="MuiTypography about__heading font-bold">
        {heading}
      </Typography>
      <Box className="about__body">
        <Box className="about__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="41" height="30" viewBox="0 0 41 30" fill="none">
            <path
              d="M10.2294 2C5.69143 2 2 5.59724 2 10.0195C2 14.2855 5.43549 17.7845 9.75205 18.0262C9.82679 18.8125 9.77072 20.953 7.66593 23.9306C7.50682 24.1552 7.5357 24.4581 7.73331 24.6507C8.59461 25.49 9.12692 26.0186 9.49947 26.3883C9.98706 26.8717 10.2096 27.0924 10.5352 27.3805C10.6456 27.4782 10.7849 27.5273 10.9248 27.5273C11.0607 27.5273 11.196 27.4809 11.3053 27.3888C14.9729 24.2788 19.0472 17.8529 18.4577 9.97861C18.1123 5.35557 14.6519 2 10.2294 2ZM10.9304 26.1902C10.7725 26.0385 10.5924 25.8597 10.3268 25.5965C10.0041 25.2759 9.56122 24.8366 8.88964 24.18C11.444 20.3444 10.9616 17.6124 10.7504 17.2206C10.6501 17.0346 10.4446 16.9093 10.2294 16.9093C6.33129 16.9093 3.1597 13.8187 3.1597 10.0195C3.1597 6.22078 6.33129 3.13011 10.2294 3.13011C14.0268 3.13011 17.0007 6.04477 17.3014 10.0603C17.9639 18.9169 12.5624 24.6672 10.9304 26.1902Z"
              stroke="#E2EEFC"
              strokeWidth="3"
            />
            <path
              d="M39.0526 9.97861V9.97805C38.7061 5.35557 35.2451 2 30.8238 2C26.2858 2 22.5938 5.59724 22.5938 10.0195C22.5938 14.2855 26.0298 17.7845 30.347 18.0262C30.4217 18.812 30.365 20.9513 28.2597 23.9306C28.1006 24.1552 28.1295 24.4581 28.3271 24.6507C29.185 25.4867 29.7161 26.0142 30.0888 26.3834C30.5785 26.87 30.8023 27.0919 31.1295 27.381C31.2399 27.4782 31.3798 27.5273 31.5191 27.5273C31.655 27.5273 31.7904 27.4809 31.8996 27.3882C35.5673 24.2782 39.6415 17.8524 39.0526 9.97861ZM31.5247 26.1902C31.3656 26.0374 31.1839 25.8575 30.916 25.5916C30.5933 25.2714 30.1522 24.8334 29.4834 24.18C32.0378 20.3438 31.5559 17.6124 31.3453 17.2206C31.245 17.0352 31.039 16.9093 30.8238 16.9093C26.925 16.9093 23.7534 13.8187 23.7534 10.0195C23.7534 6.22078 26.925 3.13011 30.8238 3.13011C34.6205 3.13011 37.5951 6.04477 37.8963 10.0608V10.0603C38.5582 18.9157 33.1567 24.6672 31.5247 26.1902Z"
              stroke="#E2EEFC"
              strokeWidth="3"
            />
          </svg>
        </Box>
        <Box className="about__content">
          <Typography variant="body2" className="MuiTypography about__text color-dark-blue-1">
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default About
