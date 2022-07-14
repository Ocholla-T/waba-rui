import { CSSProperties } from 'react'
import { FC, MouseEventHandler, ReactElement } from 'react'
import './_index.scss'

type buttonProps = {
  handleClick?: MouseEventHandler<HTMLInputElement> | undefined
  value: string
  type: string
  className?: string
  style?: CSSProperties | undefined
}

export const CustomButton: FC<buttonProps> = ({
  handleClick,
  value,
  className,
  type,
  style,
}: buttonProps): ReactElement => {
  return (
    <div className={`container ${className}`}>
      <input
        className="button"
        role="button"
        type={type}
        onClick={handleClick}
        value={value}
        style={style}
      />
    </div>
  )
}
