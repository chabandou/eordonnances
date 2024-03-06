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
      d="M10.5 6C5.5 6 4 11.5 4 15c0 5.886 2.832 11.05 6.705 12.549.105.044.212.085.32.123.075.024.148.05.223.072a5.996 5.996 0 0 0 .887.192c.285.041.575.063.865.064 2.321-.002 4.335-1.282 4.863-3.09 1.436-.183 2.714-.654 3.778-1.38-.39-.93-.781-1.91-1.131-2.9-.795.737-1.904 1.18-3.225 1.311-.903-1.204-2.53-1.94-4.285-1.941-3 0-5-3-5-7 0-1.5.5-3 2-3 2.916 0 6.782 6.595 12.047 6.965C22.53 23.312 27.5 31.097 27.5 33c0 3-2.5 5-2.5 9 0 5 2 12 3 17h2l-1.64-18.02c-.16-1.79.99-3.37 2.63-3.83-.108-10.409-1.24-21.87-5.793-23.095.037-.103.075-.193.11-.301C25.969 13.246 27.982 12 32 12s6.03 1.246 6.693 1.754c.035.108.073.198.11.3-4.553 1.227-5.685 12.687-5.793 23.096 1.64.46 2.79 2.04 2.63 3.83l-.001.02H30v2l5.38.828L35.093 47H31v2l3.848.7-.301 3.3H32v2l2.316.516L34 59h2c1-5 3-12 3-17 0-4-2.5-6-2.5-9 0-1.903 4.97-9.688 5.453-16.035C47.218 16.595 51.083 10 54 10c1.5 0 2 1.5 2 3 0 4-2 7-5 7-1.754.002-3.379.738-4.281 1.941-1.322-.13-2.433-.573-3.229-1.31-.35.99-.74 1.968-1.13 2.898 1.062.726 2.337 1.198 3.77 1.381C46.66 26.72 48.678 28 51 28c.288-.001.574-.022.857-.062l.1-.014c.255-.041.506-.098.75-.17.07-.02.141-.038.211-.06a5.63 5.63 0 0 0 .479-.184C57.217 25.96 60 20.835 60 15c0-3.5-1.5-9-6.5-9-4.704 0-9.85 5.75-14.607 3.1C36.913 7.579 34.303 7 32 7c-2.302 0-4.913.579-6.893 2.1C20.351 11.75 15.204 6 10.5 6z"
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