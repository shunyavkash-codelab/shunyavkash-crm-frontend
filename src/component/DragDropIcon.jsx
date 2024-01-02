import { createSvgIcon } from "@mui/material";
export default function ClockIcon(props) {
  let color = props.color;
  let bg = props.bg;
  let border = props.border;
  const DragDropBgIcon = createSvgIcon(
    <>
      <g clipPath="url(#clip0_2_5694)">
        <rect
          x="1.69375"
          y="1.23399"
          width="452"
          height="329"
          rx="19.5"
          transform="rotate(0.0675237 1.69375 1.23399)"
          fill={bg}
          stroke={border}
        />
        <path
          d="M334.847 -21.6293L327.573 -48.8247L355.136 -79.8496L479.983 31.0654L441.794 74.0518C414.058 79.3742 410.384 55.9563 412.014 43.5821C420.84 5.94352 392.516 7.31035 377.251 12.6986C350.544 16.2601 338.961 -9.94865 334.847 -21.6293Z"
          fill={color}
        />
        <path
          d="M88.0115 324.088L95.2854 351.284L67.7227 382.309L-57.1247 271.394L-18.9354 228.407C8.8004 223.085 12.4746 246.503 10.8447 258.877C2.01879 296.515 30.3425 295.149 45.6075 289.76C72.314 286.199 83.8976 312.408 88.0115 324.088Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2_5694">
          <rect
            x="1.19434"
            y="0.733398"
            width="453"
            height="330"
            rx="15"
            transform="rotate(0.0675237 1.19434 0.733398)"
            fill="white"
          />
        </clipPath>
      </defs>
    </>
  );
  return (
    <DragDropBgIcon
      width="100%"
      height="100%"
      viewBox="0 0 455 332"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ ...props }}
    />
  );
}
