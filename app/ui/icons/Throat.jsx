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
      d="M30 108.7V121c0 3.3 2.7 6 6 6h8c1.7 0 3-1.3 3-3V99.6C47 81.6 61.6 67 79.6 67h9.2c1.6 0 3.1 1.2 3.2 2.8.1 1.7-1.3 3.2-3 3.2h-9.4c-13 0-23.9 9.4-26.2 21.8-.3 1.7 1.7 3 3.1 2C60.3 94 65 92.4 70 92.4h13.8c1.6 0 3.1 1.2 3.2 2.8.1 1.7-1.3 3.2-3 3.2H70c-9.4 0-17 7.6-17 17v8.6c0 1.7 1.3 3 3 3h12c3.3 0 6-2.7 6-6v-4h14c7.2 0 13-5.8 13-13V87.5c0-.8.3-1.6.9-2.1l4-4c2.5-2.5 3.3-6.2 2.1-9.4L94 33.4C87.1 14.5 69 1.9 49 1.9c-5.8 0-11.5 1-16.9 3.1-17.6 6.5-29.4 22.9-31 41.6l-.2 2.1h.2c-1.3 31.7 19.1 52 28.9 60z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="scale(2)"
    />
  </svg>
)
export default SvgComponent
