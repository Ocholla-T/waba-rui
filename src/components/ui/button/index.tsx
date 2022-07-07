import { FC, MouseEventHandler, ReactElement } from 'react'
import './_index.scss'

type buttonProps = {
  handleClick?: MouseEventHandler<HTMLInputElement> | undefined
  value: string
  type: string
}

export const CustomButton: FC<buttonProps> = ({
  handleClick,
  value,
  type,
}: buttonProps): ReactElement => {
  return (
    <div className="container">
      <input className="button" role="button" type={type} onClick={handleClick} value={value} />
    </div>
  )
}
