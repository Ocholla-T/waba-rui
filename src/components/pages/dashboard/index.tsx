import { FC, ReactElement } from 'react'
import { NavigationBar } from '@ui/navigationBar'
import { CustomButton } from '@ui/button'
import './_styles.scss'

type dashboardProps = {}

export const Dashboard: FC<dashboardProps> = ({}: dashboardProps): ReactElement => {
  return (
    <main>
      <NavigationBar />
      <section className="dashboard">
        <div className="dashboard--header">
          <h1>Houses (Rooms)</h1>
          <CustomButton
            type="button"
            value="Add a house"
            style={{ width: 'fit-content', textTransform: 'none' }}
            className="container-override"
          />
        </div>
        <div className="dashboard--content">
          <table className="dashboard--content--table">
            <thead>
              <tr className="dashboard--content--table--header">
                <th>#</th>
                <th>House number</th>
                <th>Tenant name</th>
                <th>Tenant phone</th>
                <th>Meter reading</th>
                <th>Lease(Move-In)</th>
                <th>Evict(Move-Out)</th>
              </tr>
            </thead>
          </table>
        </div>
      </section>
    </main>
  )
}
