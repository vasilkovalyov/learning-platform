import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'

import { IOpportunityProps } from './Opportunity.type'

function Opportunity({ heading, opportunities }: IOpportunityProps) {
  return (
    <Box className="opportunity">
      <Typography marginBottom={3} variant="h4" className="MuiTypography font-bold">
        {heading}
      </Typography>
      <Box className="opportunity__body">
        {opportunities.length ? (
          <Box className="opportunity__list">
            {opportunities.map((opportunity, index) => (
              <Box className="opportunity__item" key={index} mb={index !== opportunities.length - 1 ? 2 : 0}>
                <Typography mb={1} className="MuiTypography font-semibold">
                  {opportunity.heading}
                </Typography>
                {opportunity.items.length ? (
                  <Stack flexWrap="wrap" direction="row" spacing={2} className="opportunity-variants">
                    {opportunity.items.map((item, index) => (
                      <span className="opportunity-variants__item font-meduim" key={index}>
                        {item}
                      </span>
                    ))}
                  </Stack>
                ) : null}
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default Opportunity
