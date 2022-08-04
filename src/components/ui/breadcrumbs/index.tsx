import { NavigateNextOutlined } from '@mui/icons-material'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import React, { FC, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export const CustomBreadcrumbs: FC = (): ReactElement => {
  const navigate = useNavigate()

  const goToDashboard = () => navigate('/')

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextOutlined fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ letterSpacing: '.0125em' }}
      >
        <Link
          underline="none"
          color="#00aaa7"
          sx={{ cursor: 'pointer', fontSize: 14 }}
          onClick={goToDashboard}
        >
          Dashboard
        </Link>
        <Typography sx={{ fontSize: 14 }}>Houses</Typography>
      </Breadcrumbs>
    </>
  )
}
