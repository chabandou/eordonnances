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
      d="M44.273 10C36.806 10 32 15.4 32 15.4S27.194 10 19.727 10C11.594 10 5 16.594 5 24.727c0 2.734 1.204 6.224 3.012 9.244L15.329 33c.057-.069.115-.144.167-.208.77-.961 2.202-2.751 4.896-2.792l.106-.001c3.131 0 4.458 2.126 5.341 3.539.176.281.322.51.451.695C31.334 21.001 31.945 21 33 21c1.055 0 1.985 1.069 2.566 5.047.291 1.996.651 4.642 1.006 7.237.181 1.325.467 3.582.652 4.919.66-1.119 2.096-4.049 2.948-5.808A2.472 2.472 0 0 1 42.402 31h2.377a2.976 2.976 0 0 1 2.754-.953c1.212.212 2.21 1.203 2.42 2.415A3.002 3.002 0 0 1 47 36c-.885 0-1.672-.39-2.221-1h-1.621C38.2 45.088 36.964 45 36 45c-.964 0-1.968-1.074-2.483-4.633a837.878 837.878 0 0 1-.907-6.542c-.152-1.115-.32-2.347-.487-3.557C31.226 32.55 28.754 39 28.754 39h-1.378c-2.842 0-4.099-2.012-4.93-3.344-.846-1.354-1.098-1.695-1.994-1.656-.732.011-1.121.402-1.833 1.292-.577.721-1.367 1.708-2.725 1.708h-5.817C17.897 47.354 32 56 32 56s27-16.546 27-31.273C59 16.594 52.406 10 44.273 10z"
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