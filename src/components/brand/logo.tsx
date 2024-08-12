import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Logo({
  className,
  ...params
}: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="1675"
      height="338"
      viewBox="0 0 1675 338"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-fit", className)}
      {...params}
    >
      <g clipPath="url(#clip0_52_4)">
        <rect
          width="338"
          height="338"
          rx="40"
          fill="url(#paint0_linear_52_4)"
        />
        <path
          d="M209.333 108.5L249.667 249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M169 108.5V249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M128.667 128.667V249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M88.3333 88.3334V249.667"
          stroke="#005F48"
          strokeWidth="30"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1149.58 110.653C1149.58 95.9131 1153.57 84.6167 1161.57 76.77C1169.58 68.9233 1181.03 65 1195.94 65H1223.52V93.5334H1203.79C1197.28 93.5334 1192.52 95.0827 1189.5 98.1701C1186.5 101.263 1185 106.056 1185 112.548V120.64H1222.34V150.11H1185.71V245.452H1149.58V150.11H1124.61V120.64H1149.58V110.653ZM400 245.452V79.0438H465.136C478.612 79.0438 490.265 81.5071 500.09 86.4224C509.909 91.3266 517.555 98.2983 523.028 107.332C528.495 116.371 531.231 126.988 531.231 139.187C531.231 151.224 528.495 161.763 523.028 170.797C517.555 179.836 509.909 186.813 500.09 191.729C490.265 196.633 478.612 199.085 465.136 199.085H437.807V245.452H400ZM437.562 166.517H462.038C471.874 166.517 479.448 164.187 484.753 159.517C490.059 154.836 492.711 148.137 492.711 139.41C492.711 130.705 490.059 123.973 484.753 119.214C479.448 114.46 471.874 112.08 462.038 112.08H437.562V166.517ZM597.796 247.837C583.05 247.837 571.403 244.393 562.843 237.494C554.283 230.6 550.003 221.126 550.003 209.072C550.003 197.513 553.842 188.285 561.527 181.385C569.224 174.492 579.567 171.042 592.557 171.042H637.743V165.335C637.743 159.155 635.519 154.206 631.078 150.489C626.63 146.761 620.846 144.894 613.712 144.894C607.855 144.894 602.862 146.242 598.732 148.929C594.614 151.62 592.006 155.187 590.908 159.629H556.2C558.412 146.003 564.548 135.548 574.613 128.264C584.672 120.969 597.629 117.319 613.489 117.319C632.181 117.319 646.799 122.039 657.337 131.474C667.887 140.898 673.164 153.849 673.164 170.329V245.452H646.303L642.246 230.94C631.306 242.208 616.488 247.837 597.796 247.837ZM585.669 207.645C585.669 211.925 587.525 215.375 591.242 217.988C594.971 220.608 599.925 221.912 606.111 221.912C615.145 221.912 622.635 219.298 628.581 214.065C634.522 208.838 637.654 202.022 637.966 193.623H603.748C598.353 193.623 593.99 194.894 590.663 197.435C587.33 199.965 585.669 203.365 585.669 207.645ZM760.87 245.34C767.524 247.625 774.741 248.773 782.515 248.773C795.043 248.773 806.055 245.964 815.552 240.347C825.059 234.718 832.549 226.95 838.022 217.052C843.489 207.143 846.225 195.763 846.225 182.923C846.225 170.083 843.489 158.754 838.022 148.929C832.549 139.109 825.059 131.385 815.552 125.767C806.055 120.139 795.043 117.319 782.515 117.319C773.476 117.319 765.156 118.868 757.549 121.956C749.936 125.049 743.36 129.368 737.82 134.907L733.786 120.64H706.924V293H743.059V235.71C748.286 239.829 754.227 243.039 760.87 245.34ZM751.24 207.89C744.831 201.398 741.632 193.077 741.632 182.923C741.632 172.792 744.831 164.477 751.24 157.979C757.66 151.47 765.941 148.215 776.095 148.215C786.394 148.215 794.709 151.47 801.04 157.979C807.382 164.477 810.558 172.792 810.558 182.923C810.558 193.077 807.382 201.398 801.04 207.89C794.709 214.388 786.394 217.632 776.095 217.632C765.941 217.632 757.66 214.388 751.24 207.89ZM932.516 248.773C919.214 248.773 907.449 245.998 897.228 240.458C887.002 234.919 879.038 227.195 873.332 217.297C867.625 207.389 864.772 195.931 864.772 182.923C864.772 169.938 867.658 158.531 873.443 148.706C879.222 138.869 887.225 131.179 897.451 125.634C907.672 120.094 919.526 117.319 933.007 117.319C947.273 117.319 959.59 120.495 969.966 126.837C980.354 133.168 988.279 142.04 993.752 153.454C999.219 164.867 1001.55 178.175 1000.75 193.378H900.661C902.411 201.938 906.218 208.481 912.075 212.995C917.943 217.515 924.993 219.772 933.23 219.772C939.259 219.772 944.777 218.629 949.77 216.339C954.763 214.037 958.759 210.827 961.763 206.709H998.388C992.994 219.861 984.506 230.16 972.931 237.605C961.367 245.05 947.898 248.773 932.516 248.773ZM900.907 170.574H965.82C963.753 162.967 959.902 156.987 954.273 152.629C948.655 148.26 941.639 146.075 933.23 146.075C925.305 146.075 918.456 148.26 912.677 152.629C906.892 156.987 902.969 162.967 900.907 170.574ZM1027.87 120.64V245.452H1064V190.302C1064 176.827 1066.97 167.314 1072.9 161.769C1078.84 156.229 1086.97 153.454 1097.28 153.454H1111.06V120.64H1097.51C1088.32 120.64 1080.71 121.95 1074.68 124.564C1068.66 127.183 1063.59 131.418 1059.48 137.27L1054.73 120.64H1027.87ZM1243.97 69.5253V245.452H1280.1V69.5253H1243.97ZM1377.57 248.773C1363.77 248.773 1351.61 245.998 1341.07 240.458C1330.54 234.919 1322.29 227.195 1316.35 217.297C1310.41 207.389 1307.44 195.931 1307.44 182.923C1307.44 169.938 1310.41 158.531 1316.35 148.706C1322.29 138.869 1330.54 131.179 1341.07 125.634C1351.61 120.094 1363.77 117.319 1377.57 117.319C1391.35 117.319 1403.52 120.094 1414.06 125.634C1424.59 131.179 1432.79 138.869 1438.67 148.706C1444.54 158.531 1447.47 169.938 1447.47 182.923C1447.47 195.931 1444.54 207.389 1438.67 217.297C1432.79 227.195 1424.59 234.919 1414.06 240.458C1403.52 245.998 1391.35 248.773 1377.57 248.773ZM1343.1 182.923C1343.1 193.077 1346.31 201.398 1352.73 207.89C1359.15 214.388 1367.43 217.632 1377.57 217.632C1387.71 217.632 1395.96 214.388 1402.29 207.89C1408.63 201.398 1411.81 193.077 1411.81 182.923C1411.81 172.625 1408.63 164.265 1402.29 157.845C1395.96 151.425 1387.71 148.215 1377.57 148.215C1367.43 148.215 1359.15 151.425 1352.73 157.845C1346.31 164.265 1343.1 172.625 1343.1 182.923ZM1458.87 120.64L1504.99 245.452H1538.52L1567.05 169.37L1595.34 245.452H1628.85L1674.97 120.64H1636.94L1622.2 162.014L1609.83 197.19L1596.99 162.014L1581.54 120.64H1552.3L1536.85 162.014L1524.01 196.945L1511.66 162.014L1497.15 120.64H1458.87Z"
          fill="black"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_52_4"
          x1="1.25915e-06"
          y1="169"
          x2="338"
          y2="338"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#69AC63" />
          <stop offset="1" stopColor="#5BE45B" />
        </linearGradient>
        <clipPath id="clip0_52_4">
          <rect width="1675" height="338" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
