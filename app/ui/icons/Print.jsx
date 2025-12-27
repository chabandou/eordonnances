import * as React from "react";
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
    <path
      fill="currentColor"
      strokeMiterlimit={10}
      d="M14 8v6H9s-4 5-4 9v19a4 4 0 0 0 4 4h4.305c-.557 4.718-1.244 7.516-1.244 7.516L11.438 56h41.124l-.623-2.484s-.71-2.879-1.271-7.516H55a4 4 0 0 0 4-4V23c0-4-4-9-4-9h-5V8zm4 4h28v6H18zm-7 20a2 2 0 1 1 .001 3.999A2 2 0 0 1 11 32zm10 0h22a3 3 0 0 1 3 3c0 8.715 1.041 14.333 1.598 17H16.393c.529-2.564 1.513-8.043 1.591-16.918L18 35a3 3 0 0 1 3-3zm2 4v4h18v-4zm0 8v4h14v-4z"
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
);
export default SvgComponent;
