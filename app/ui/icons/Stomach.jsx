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
      d="M27 4c0 6.961.31 13.608 3.223 16.963.426-3.027 1.485-5.398 2.949-7.197C33.002 11.526 33 8.352 33 4zm17 7c-4.5 0-11 2.5-11 11 0 13-1 20-8 20-5 0-6-2-10.5-2s-8 4-9.5 11c1 2 3 3 6 3 .5-3 1-6 4-6 5 0 7.5 8 18 8 15 0 25-14 25-26 0-14-7.5-19-14-19z"
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
