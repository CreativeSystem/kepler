import Modal, { ModalProps } from "react-bootstrap/Modal";

import { IColor } from "~/styles/themes";
import styled, { css } from "styled-components";

export interface ConfirmOptions{
  buttons?:{
    yes?:{
      text? : string,
      color? :IColor
    },
    no?:{
      text?: string,
      color?:IColor
    }
  },
  header?:{
    color?: IColor
  }
}

type CustomModalProps = ModalProps & {
  options: ConfirmOptions
};

function putColor(color?:IColor) {
  if (color) {
    return css`
      background-color: ${color.bg};
      color: ${color.fg};
    `;
  }

  return css``;
}

export const Container = styled(Modal)<CustomModalProps>`
  .modal-header{
    ${({ options }) => putColor(options.header?.color)}
    .close{
      color: ${({ options }) => options.header?.color?.fg || "#000000"};
    }
  }

  .modal-footer{
    .btn-yes{
      ${({ options }) => putColor(options.buttons?.yes?.color)}
    }
    .btn-no{
      ${({ options }) => putColor(options.buttons?.no?.color)}
    }
  }
`;
