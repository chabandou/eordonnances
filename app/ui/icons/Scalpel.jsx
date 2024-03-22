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
      d="M55.5 7.215a4.13 4.13 0 0 0-2.93 1.215L29.5 31.5l4.72 4.72 24.06-21.8a4.14 4.14 0 0 0-2.78-7.205zM27.44 33.56l-1.47 1.468 5.17 3.98 1.55-1.41zM24.5 36.5 23 38l4.4 4.4 1.57-1.43zm-3.56 3.56L15 46 4 57s6 2 8.5-.5L16 53c0-2 .5-2.5 2-4l1 1 6.82-6.18z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="scale(4)"
    />
  </svg>
)
export default SvgComponent
