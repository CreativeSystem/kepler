import { DropzoneRootProps } from "react-dropzone";
import { FaFileImage } from "react-icons/fa";

import styled, { css } from "styled-components";

interface IDrop{
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  hasFiles: boolean;
}

const getStyleDrop = ({
  hasFiles, isDragActive, isDragAccept, isDragReject,
} :IDrop) => {
  if (hasFiles && !isDragActive) { return css``; }

  let color = "gray";

  if (isDragAccept) {
    color = "green";
  } else if (isDragReject) {
    color = "red";
  }
  const alignCenter = css`
    justify-content: center;
    align-items: center;
  `;
  return css`
    border: 2px dashed ${color};
    color : ${color};
    opacity: 0.5;
    background-color: white;
    ${!hasFiles && alignCenter}
  `;
};

export const Container = styled.div.attrs({
  className: "dropzone",
})<DropzoneRootProps & IDrop>`
  width: 100%;
  height: 100%;
  outline: none;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  min-height: 220px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  justify-content: flex-start;
  ${props => getStyleDrop(props)}

  :hover {
    border: 2px dashed gray;
    color : gray;
  }
`;

export const UploadIcon = styled(FaFileImage).attrs({
  size: 40,
})``;

export const UploadMessage = styled.span`
  font-size: 12px;
`;

export const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  left:0;
  z-index: 10;
`;
