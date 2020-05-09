import React from "react";

import { Input } from "@components/Form";
import { IFile } from "@components/Form/Uploader";

import { Container } from "./styles";

interface Props {
  file: IFile,
  name: string
}

const Image :React.FC<Props> = ({ file, name }) => (
  <>
    <Container src={file.url} alt={file.originalName} />
    <Input name={name} type="hidden" value={file.id} />
  </>
);

export default Image;
