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
      d="M40.877 0 37.41.035 37.803 7h2.445zm6.789 2.344-3.828 4.672 1.558 1.431 4.502-4.093zM29.531 3.7l-1.416 2.647 5.451 2.6 1.018-1.858zM36 10v4h8l-.621-2.484A2.002 2.002 0 0 0 41.437 10zM5 16v36h4a7 7 0 1 1 14 0h19a7 7 0 0 1 7-7c3.77 0 6.836 2.984 6.986 6.717L61 51v-5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1v-4.43L48 35V24h9.143l-3.372-5.244A6 6 0 0 0 48.725 16zm18.5 9h3l.389 4.111L31 29.5v3l-4.111.389L26.5 37h-3l-.389-4.111L19 32.5v-3l4.111-.389zM16 47a5 5 0 1 0 .001 10.001A5 5 0 0 0 16 47zm33 0a5 5 0 1 0 .001 10.001A5 5 0 0 0 49 47zm-33 3a2 2 0 1 1 .001 3.999A2 2 0 0 1 16 50zm33 0a2 2 0 1 1 .001 3.999A2 2 0 0 1 49 50z"
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

