import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    {...props}
  >
    <path
      fill="#fff"
      strokeMiterlimit={10}
      d="m30.906 32.004 15.72-27h-10L15 32l21.626 27.004h10z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="matrix(0 -4 4 0 -4.764 251.268)"
    />
  </svg>
)
export default SvgComponent
