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
      d="M56.18 16.83c-.55-4.73-4.28-8.46-9.01-9.01C43.38 7.38 38.26 7 32 7s-11.38.38-15.17.82c-4.73.55-8.46 4.28-9.01 9.01C7.38 20.62 7 25.74 7 32s.38 11.38.82 15.17c.55 4.73 4.28 8.46 9.01 9.01 3.79.44 8.91.82 15.17.82s11.38-.38 15.17-.82c4.73-.55 8.46-4.28 9.01-9.01.44-3.79.82-8.91.82-15.17s-.38-11.38-.82-15.17zM47 33.765l-12.353.882L33.765 47h-3.529l-.882-12.353L17 33.765v-3.529l12.353-.882L30.235 17h3.529l.882 12.353L47 30.235z"
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
