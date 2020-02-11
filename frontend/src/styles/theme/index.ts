interface IBaseTheme {
  bg: string;
  fg: string;
}

interface IColor extends IBaseTheme {}

export interface ITheme {
  success: IColor;
  danger: IColor;
  warning: IColor;
  primary: IColor;
  default: IColor;
  info: IColor;
}

export const light: ITheme = {
  success: {
    bg: "#28a745",
    fg: "#F5F5F5"
  },
  danger: {
    bg: "#dc3545",
    fg: "#F5F5F5"
  },
  warning: {
    bg: "#ffc107",
    fg: "#F5F5F5"
  },
  primary: {
    bg: "#7884f2",
    fg: "#F5F5F5"
  },
  default: {
    bg: "#F5F5F5",
    fg: "#7884f2"
  },
  info: {
    bg: "#17a2b8",
    fg: "#F5F5F5"
  }
};
