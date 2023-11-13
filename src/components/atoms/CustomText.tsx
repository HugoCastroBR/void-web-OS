import React from 'react'


interface CustomTextProps {
  text: string
  className?: string
}
const CustomText = ({
  text,
  className
}:CustomTextProps) => {
  return (
    <span className={`
      text-white
    ${className}
    `}>
      {text}
    </span>
  )
}

export default CustomText