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
      d="M12 7a2 2 0 0 0-2 2v9H9v3h3v35c0 1.634 1.366 3 3 3h34c1.634 0 3-1.366 3-3V21h3v-3h-1V9a2 2 0 0 0-2-2zm4 3a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm8 0h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zm15 0h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zm9 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zM16 21h32v4H27v26h21v4H16v-4h3V25h-3zm18.408 8h4.227c2.082 0 3.437 1.278 3.437 3.502 0 1.623-.677 2.697-1.986 3.264l2.043 3.757 2.238-3.847h2.225l-3.295 5.629L46.592 47h-2.428l-2.178-3.928L39.795 47h-2.272l3.344-5.709-3.068-5.273H36.44v4.306h-2.033zm2.033 2.004v2.994h2.147c.962 0 1.482-.472 1.482-1.418 0-1.057-.52-1.576-1.482-1.576z"
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
