import { DropzoneRootProps } from "react-dropzone";
import { FaFileImage } from "react-icons/fa";

import styled from "styled-components";


export const Container = styled.div.attrs({
  className: "dropzone",
})<DropzoneRootProps>`
  width: 100%;
  min-height: 100px;
  border: 1px dashed gray;
  color : gray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  :hover{
    border: 1px dashed ${props => props.theme.success.bg};
    cursor: pointer;
    color : ${props => props.theme.success.bg};
    border-radius: 10px;
  }
`;

export const UploadIcon = styled(FaFileImage).attrs({
  size: 40,
})``;

export const UploadMessage = styled.span`
  font-size: 12px;
`;
