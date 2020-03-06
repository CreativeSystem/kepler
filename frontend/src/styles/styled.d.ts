import "styled-components";
import { ITheme } from "./themes";

declare module "styled-components" {
  export type DefaultTheme = ITheme;
}
