import { NavigationBar } from '@ui/navigationBar'
import { FC, ReactElement } from 'react'

type DashboardProps = {}

export const Dashboard: FC<DashboardProps> = ({}): ReactElement => {
  return (
    <>
      <NavigationBar />
      <main></main>
    </>
  )
}
