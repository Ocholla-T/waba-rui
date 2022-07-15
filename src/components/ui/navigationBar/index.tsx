import { FC, ReactElement } from 'react'
import LogoutIcon from '@images/logout.svg'
import './_styles.scss'

type navigationBarProps = {}

export const NavigationBar: FC<navigationBarProps> = ({}: navigationBarProps): ReactElement => {
  return (
    <nav className="nav">
      <h1 className="nav--logo">Waba</h1>
      <div>
        <div className="nav--icon">D</div>
        <img className="nav--logout" src={LogoutIcon} alt="logout" />
      </div>
    </nav>
  )
}
