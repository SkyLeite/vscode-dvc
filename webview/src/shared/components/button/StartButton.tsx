import React from 'react'
import { ButtonProps } from './Button'
import { IconButton } from './IconButton'
import { AllIcons } from '../Icon'

export const StartButton: React.FC<ButtonProps> = ({
  appearance,
  onClick,
  isNested,
  text
}: ButtonProps) => {
  return (
    <IconButton
      appearance={appearance}
      isNested={isNested}
      icon={AllIcons.ADD}
      onClick={onClick}
      text={text}
    />
  )
}
