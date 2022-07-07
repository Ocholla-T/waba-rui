import { FC, ReactElement } from 'react'
import './_index.scss'

type Props = {
  className: string
  label: string
  type: string
  autoComplete: string
  id: string
}

export const CustomInput: FC<Props> = ({
  className = '',
  label,
  type,
  autoComplete,
  id,
}: Props): ReactElement => {
  return (
    <div className="container">
      <label htmlFor={id}>
        {label}

        <input id={id} className={`input ${className}`} type={type} autoComplete={autoComplete} />
      </label>
    </div>
  )
}
