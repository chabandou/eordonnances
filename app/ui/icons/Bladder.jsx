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
      d="M24.289 3.162c-2.203-1.92-5.544-3.148-9.28-3.148-3.736 0-7.077 1.228-9.279 3.148-1.107-.964-1.72-2.07-1.72-3.148h-4c0 2.46 1.269 4.686 3.404 6.41a6.273 6.273 0 0 0-.404 2.17c0 3.814 3.261 8.359 7.423 10.345.355.17.577.515.577.898v1.177h2v-1.177a3.015 3.015 0 0 0-1.715-2.703c-2.487-1.187-4.428-3.369-5.461-5.485 5.085 2.915 7.212-.635 11.176-.635 2.747 0 5.022 1.415 6.178 2.301-1.096 1.53-2.632 2.945-4.464 3.819a3.015 3.015 0 0 0-1.714 2.703v1.177h2v-1.177c0-.384.221-.729.576-.898 4.163-1.985 7.424-6.53 7.424-10.345 0-.751-.149-1.475-.404-2.17C28.74 4.7 30.01 2.474 30.01.014h-4c0 1.078-.614 2.183-1.721 3.148zM13 28a2 2 0 1 0 4 0c0-1.333-2-4-2-4s-2 2.667-2 4z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="scale(8.53333)"
    />
  </svg>
)
export default SvgComponent
