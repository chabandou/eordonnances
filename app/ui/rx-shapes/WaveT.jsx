import * as React from "react"

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
    style={{ width: "100%", height: "auto" }}
    viewBox="0 0 209 128"
  >
    <path
      fill="url(#a)"
      fillOpacity={0.14}
      d="M0 127.746c23.86-48.52 72.215-74.6 122.643-101.797l1.357-.732C71.857 44.889 27.826 63.75 0 97.68v30.066Z"
    />
    <path
      fill="url(#b)"
      fillOpacity={0.67}
      d="m207.59.235.542.418S55.737 32.152 0 98.02V69.2C39.021 29.352 116.525 9.225 163.638.234h43.952Z"
    />
    <path
      fill="#0D6761"
      d="M172.794.236C124.672 7.966 38.989 27.237 0 70.022v-22.7C0 6 4.5.236 58 .236h114.794Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={-33.679}
        x2={344.497}
        y1={69.986}
        y2={-7.29}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4B5F5E" />
        <stop offset={0.345} stopColor="#9DC5C2" stopOpacity={0.74} />
      </linearGradient>
      <linearGradient
        id="b"
        x1={209.199}
        x2={-1.076}
        y1={63.383}
        y2={67.035}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D6761" />
        <stop offset={0.48} stopColor="#149B93" />
        <stop offset={1} stopColor="#1BCDC2" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgComponent
