import React, { useState } from 'react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Icon from '../../components/Generic/Icon'
import { IconEnum } from '../../components/Generic/Icon/Icon.type'

// import { TeacherCardProps } from './TeacherCard.type'

import colors from '../../constants/colors'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      marginBottom={2}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

function getListItems(list: string[]) {
  return (
    <Stack className="teacher-card__info-list" spacing={1} direction="row">
      {list.map((item, index) => (
        <Typography key={index} className="MuiTypography font-semibold" variant="subtitle2">
          {item}
          {index !== list.length - 1 ? ',' : ''}
        </Typography>
      ))}
    </Stack>
  )
}

function getRaiting(raiting: number) {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      {[...Array(5).keys()].map((_, index) => (
        <Box key={index}>
          {index < raiting ? (
            <Icon icon={IconEnum.STAR_EMPTY} size={14} color={colors.yellow_color} />
          ) : (
            <Icon icon={IconEnum.STAR_EMPTY} size={14} color={colors.grey_color3} />
          )}
        </Box>
      ))}
    </Stack>
  )
}

function TeacherCard({
  id,
  image,
  raiting,
  country,
  fullname,
  lang_speaking,
  lang_teaching,
  description,
  onClickTrialLesson,
}: any & {
  onClickTrialLesson?: (id: string) => void
}) {
  const [activeTab, setActiveTab] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, tabNumber: number) => {
    setActiveTab(tabNumber)
  }

  return (
    <Box className="teacher-card">
      <Box className="teacher-card__left">
        <Box className="teacher-card__image-wrapper">
          <Box className="teacher-card__image" marginBottom={1} marginLeft="auto" marginRight="auto">
            <Image src={image.src} alt={image.alt} />
          </Box>
          <Box paddingTop={1} paddingBottom={1} marginBottom={1}>
            {getRaiting(raiting)}
          </Box>
          <Box paddingTop={1} paddingBottom={1} justifyContent="center" className="ta-c">
            {raiting > 3 ? (
              <Button color="success" variant="contained">
                Recommended
              </Button>
            ) : null}
          </Box>
        </Box>
        <Box className="teacher-card__info">
          <Typography variant="h4" className="MuiTypography">
            {fullname}
          </Typography>
          <Box className="teacher-card__info-item" marginBottom={2}>
            <Typography variant="body2" className="MuiTypography color-grey-3 font-semibold">
              {country}
            </Typography>
          </Box>
          <Box className="teacher-card__info-item" marginBottom={2}>
            <Typography variant="body2" className="MuiTypography color-grey-3 font-semibold">
              Language teaching
            </Typography>
            {getListItems(lang_teaching)}
          </Box>
          <Box className="teacher-card__info-item" marginBottom={2}>
            <Typography variant="body2" className="MuiTypography color-grey-3 font-semibold">
              Language speaking
            </Typography>
            {getListItems(lang_speaking)}
          </Box>
        </Box>
      </Box>
      <Box className="teacher-card__right" display="flex" flexDirection="column">
        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example" className="teacher-card__tabs">
          <Tab label="Video greeting" {...a11yProps(0)} />
          <Tab label="Description" {...a11yProps(1)} />
          <Tab label="The calendar" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Typography variant="body2" className="MuiTypography color-dark-blue-1">
            {description}
          </Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          Item Three
        </TabPanel>
        <Stack direction="row" spacing={2} marginTop="auto" flexWrap="wrap">
          <Button
            className="teacher-card__button"
            variant="contained"
            onClick={() => onClickTrialLesson && onClickTrialLesson(id)}
          >
            Trial lesson
          </Button>
          <Button className="teacher-card__button" variant="outlined">
            Teacher profile
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default TeacherCard
