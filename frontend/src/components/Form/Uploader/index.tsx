import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";

import api from "@services/api";

import {
  Container, UploadIcon, UploadMessage,
} from "./styles";

export interface IFile {
  id: number,
  originalName: string,
  url: string
}

interface OwnProps {
  renderFile(file:IFile, index:number) : React.ReactNode,
  accept?: string | string[]
}

type Props = OwnProps & DropzoneRootProps;

const Uploader : React.FC<Props> = ({ renderFile, accept, ...props }) => {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

  const uploadFile = useCallback(async (file:File) => {
    const formData = new FormData();
    formData.set("file", file);

    const response = await api.post<IFile>("/api/upload/", formData);
    setUploadedFiles(uploadedFiles => [...uploadedFiles, response.data]);
  }, []);

  const onDrop = useCallback((acceptedFiles:File[]) => {
    acceptedFiles.forEach((file) => {
      uploadFile(file);
    });
  }, [uploadFile]);

  const {
    getInputProps, getRootProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone({ onDrop, accept });
  return (
    <Container
      isDragActive={isDragActive}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
      hasFiles={!!uploadedFiles.length}
      {...getRootProps()}
      {...props}
    >
      <input {...getInputProps()} />
      { !!uploadedFiles.length && uploadedFiles.map((file, index) => renderFile(file, index)) }
      { !uploadedFiles.length && (
        <>
          <UploadIcon />
          <UploadMessage>Solte Seus Arquivos aqui</UploadMessage>
        </>
      ) }
    </Container>
  );
};

export default Uploader;
