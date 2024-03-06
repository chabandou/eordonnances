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
      d="M44 4C31.091 9.071 26.816 23.755 26.113 37.531A6 6 0 0 0 31 47a6 6 0 0 0 4.096-10.38C32.72 22.71 36.294 11.705 44 4zM8 34v22h48V34H36.8c.068.333.124.663.2 1 3 2.5 3 5.5 3 7 0 4-4.037 8-9 8s-9-4-9-8c0-1.557 0-3.5 2-6 .067-.689.163-1.343.256-2z"
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
