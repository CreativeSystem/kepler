import { useContext } from "react";

import { ITheme } from "~/styles/themes";
import { ThemeContext } from "styled-components";

export default function useTheme<T>() {
  const themeContext = useContext<ITheme>(ThemeContext);

  return themeContext;
}
