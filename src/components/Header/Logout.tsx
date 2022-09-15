import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const LogoutIcon = (props: SvgProps) => (
  <Svg width={62} height={56} fill="none" {...props}>
    <Path
      d="M61.404 26.628 47.349 15.034c-.241-.199-.465-.304-.725-.304-.564 0-1.093.505-1.093 1.468v6.892H27.529c-.846 0-1.609.837-1.609 1.833v5.973c0 .997.763 1.831 1.61 1.831h18v6.896c0 .963.53 1.537 1.095 1.537h-.02c.26 0 .514-.14.755-.338l14.048-11.61c.378-.312.592-.788.592-1.292s-.219-.98-.596-1.292Z"
      fill={props.fill || "#000"}
    />
    <Path
      d="M50.807 43.971c-.236 0-.456.215-.46.22l-3.411 2.813c-.03.023-.723.573-.723 1.586v1.405H4.945V6.024h41.268v1.355c0 .82.678 1.402.708 1.427l3.694 3.047a.523.523 0 0 0 .286.105c.195 0 .428-.155.428-.89v-6.44C51.329 2.033 49.602 0 47.398 0H4.102C1.84 0 0 2.076 0 4.628v46.36c0 2.617 1.878 4.829 4.1 4.83h43.298c2.168-.001 3.93-2.167 3.93-4.83v-5.812c0-.996-.283-1.205-.52-1.205Zm.346-32.74Zm-.009.103.005-.039-.005.04Zm.012 33.713Zm-.002-.067.001.023-.001-.023Z"
      fill={props.fill || "#000"}
    />
  </Svg>
);

export default LogoutIcon;
