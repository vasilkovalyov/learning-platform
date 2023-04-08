import React from 'react'
import Image from 'next/image'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import BadgeTime from '../../components/Badges/BadgeTime'
import BadgeExperience from '../../components/Badges/BadgeExperience'

import { ITeacherProfileProps } from './TeacherProfile.type'

import imageDefault from '../../public/images/avatar-default.jpg'

function TeacherProfile({
  country,
  time,
  experience,
  fullname,
  image,
  lang_speaking,
  lang_teaching,
  countOfStudents,
  countOfLessons,
  videoPreviewSrc,
  hasShadow,
}: ITeacherProfileProps) {
  return (
    <Box className={cn('teacher-profile', { 'teacher-profile--has-shadow': hasShadow ? hasShadow === true : null })}>
      <Box className="teacher-profile__video-preview">
        {videoPreviewSrc ? (
          <video controls>
            <source src={videoPreviewSrc} type="video/mp4" />
          </video>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/vk9ZVKfZNJ0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </Box>
      <Box className="teacher-profile__body">
        <Box className="teacher-profile__body-left">
          <Box className="teacher-profile__image">
            {image ? <Image src={image.src} alt={fullname} /> : <Image src={imageDefault} alt={fullname} />}
          </Box>
        </Box>
        <Box className="teacher-profile__right">
          <Stack flexWrap="wrap" direction="row" mb={2} spacing={2}>
            <BadgeTime time={time} />
            <BadgeExperience years={experience} />
          </Stack>
          <Box mb={3}>
            <Typography variant="h4" className="MuiTypography font-bold">
              {fullname}
            </Typography>
            <Typography variant="subtitle2" className="MuiTypography color-grey-3">
              {country}
            </Typography>
          </Box>
          <Box className="teacher-profile__services">
            <Box className="teacher-profile__service-col">
              <Typography variant="subtitle2" className="MuiTypography teacher-profile__service-heading color-grey-3">
                Languages speaking
              </Typography>
              <Stack className="teacher-profile__service-list" flexWrap="wrap" direction="row" mb={2}>
                {lang_speaking.map((item, index) => (
                  <span className="font-semibold" key={index}>
                    {item}
                  </span>
                ))}
              </Stack>
            </Box>
            <Box className="teacher-profile__service-col">
              <Typography variant="subtitle2" className="MuiTypography teacher-profile__service-heading color-grey-3">
                Languages teaching
              </Typography>
              <Stack className="teacher-profile__service-list" flexWrap="wrap" direction="row" mb={2}>
                {lang_teaching.map((item, index) => (
                  <span className="font-semibold" key={index}>
                    {item}
                  </span>
                ))}
              </Stack>
            </Box>
            <Box className="teacher-profile__service-col">
              <Typography variant="subtitle2" className="MuiTypography teacher-profile__service-heading color-grey-3">
                Count of students
              </Typography>
              <Typography className="MuiTypography font-semibold">{countOfStudents}</Typography>
            </Box>
            <Box className="teacher-profile__service-col">
              <Typography variant="subtitle2" className="MuiTypography teacher-profile__service-heading color-grey-3">
                Count of Lessons
              </Typography>
              <Typography className="MuiTypography font-semibold">{countOfLessons}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TeacherProfile
