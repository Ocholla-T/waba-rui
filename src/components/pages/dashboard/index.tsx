import { NavigationBar } from '@ui/navigationBar'
import { FC, ReactElement } from 'react'
import { Houses } from './houses'

type DashboardProps = {}

export const Dashboard: FC<DashboardProps> = ({}): ReactElement => {
  return (
    <>
      <NavigationBar />
      <Houses />
    </>
  )
}
