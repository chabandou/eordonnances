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
      d="M24 2.889C12.366 2.889 2.889 12.366 2.889 24S12.366 45.111 24 45.111a21 21 0 0 0 13.299-4.738l14.832 18.58s3.248.483 5.265-1.619c2.031-2.118 1.555-5.2 1.555-5.2L40.373 37.3A21 21 0 0 0 45.111 24c0-11.634-9.477-21.111-21.111-21.111zm0 4.222A16.857 16.857 0 0 1 40.889 24 16.857 16.857 0 0 1 24 40.889 16.857 16.857 0 0 1 7.111 24 16.857 16.857 0 0 1 24 7.111z"
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
