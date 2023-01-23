const SvgComponent = (props) => (
  <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 8.5h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-14a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2" />
      <path d="M5.5 4.5h10V16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1z" />
      <path d="m8.5 11.5 2 2 2-2M10.5 13.5v-6" />
    </g>
  </svg>
  )
  
  export default SvgComponent
  