import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import api from "@services/api";

import { Container, UploadIcon, UploadMessage } from "./styles";

const Uploader : React.FC = () => {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    acceptedFiles.forEach((file) => {
      uploadFile(file);
    });
  }, []);

  const { getInputProps, getRootProps, inputRef } = useDropzone({ onDrop });

  const uploadFile = async (file:File) => {
    const formData = new FormData();
    formData.set("file", file);

    const response = await api.post("/api/upload/", formData);
    console.log(response);
  };

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadIcon />
      <UploadMessage>Solte Seus Arquivos aqui</UploadMessage>
    </Container>
  );
};

export default Uploader;
