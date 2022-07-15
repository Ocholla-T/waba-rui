import { ChangeEventHandler, FC, ReactElement } from 'react'
import './_index.scss'

type Props = {
  className?: string
  label?: string
  type: string
  autoComplete?: string
  id?: string
  handleChange?: ChangeEventHandler<HTMLInputElement>
}

export const CustomInput: FC<Props> = ({
  autoComplete,
  className = '',
  handleChange,
  id,
  label,
  type,
}: Props): ReactElement => {
  return (
    <div className="container">
      <label htmlFor={id}>
        {label}

        <input
          id={id}
          className={`input ${className}`}
          type={type}
          autoComplete={autoComplete}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}
