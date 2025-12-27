import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    {...props}
  >
    <path
      fill="currentColor"
      strokeMiterlimit={10}
      d="M32 3 1 28l.492.654a4 4 0 0 0 5.738.692L32 9l24.77 20.346a4 4 0 0 0 5.738-.692L63 28l-9-7.258V8h-9v5.484zm0 10L8 32v24h48V35zm-6 21h12v18H26z"
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
