import { Box, IconButton, Typography } from "@material-ui/core";

import { useDropzone } from "react-dropzone";
import { DeleteForever } from "@material-ui/icons"; //icone de deletar

import useStyles from "./styles";

const FileUpload = ({ files, errors, touched, setFieldValue }) => {
  const classes = useStyles();

  // console.log(files);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFile) => {
      //função executada toda vez que uma imagem for selecionada
      const newFiles = acceptedFile.map((file) =>
        Object.assign(file, {
          // traz a referencia do arquivo binario
          preview: URL.createObjectURL(file),
        })
      );
      //faz o preview da imagem

      {
        /*setFieldValue() recebe dois parametros(nome e valor do campo)*/
      }
      {
        /*injeta as imagens no formulário*/
      }

      setFieldValue("files", [
        ...files, //mantém os files que já existem, caso existam
        ...newFiles, //adicionam novos files
      ]);
    },
  });

  //função para remover imagem
  const handleRemoveFile = (name) => {
    /* const newFileState = files.filter((file) => file.path !== filePath);
    console.log("filePath: ", filePath);
    console.log("newFileState: ", newFileState);
    setFieldValue("files", newFileState); */

    const fileIndex = files.findIndex((file) => file.name === name);

    if (fileIndex > -1) {
      files.splice(fileIndex, 1);

      setFieldValue("files", files);
    }
  };

  return (
    <>
      <Typography
        component='h6'
        variant='h6'
        color={errors && touched ? "error" : "textPrimary"}
      >
        Imagens
      </Typography>
      <Typography
        component='div'
        variant='body2'
        color={errors && touched ? "error" : "textPrimary"}
      >
        A primeira imagem é a foto principal do seu anúncio.
      </Typography>
      {/* Verifica se tem erro no files, ele adiciona o typography, se não tiver ele preenche com null */}
      {errors && touched ? (
        <Typography variant='body2' color='error' gutterBottom>
          {errors}
        </Typography>
      ) : null}
      <Box className={classes.thumbsContainer}>
        <Box className={classes.dropzone} {...getRootProps()}>
          {/* <input name="files" {...getInputProps()} /> */}
          <input {...getInputProps()} />
          <Typography
            variant='body2'
            color={errors && touched ? "error" : "textPrimary"}
          >
            Clique para adicionar ou arraste a imagem aqui.
          </Typography>
        </Box>

        {files.map((file, index) => (
          <Box
            key={file.name}
            className={classes.thumb}
            style={{
              backgroundImage: `url(${
                file.preview ? file.preview : `/uploads/${file.name}`
              })`,
            }}
          >
            {index === 0 ? (
              <Box className={classes.mainImage}>
                <Typography variant='body' color='secondary'>
                  Principal
                </Typography>
              </Box>
            ) : null}
            <Box className={classes.mask}>
              <IconButton
                color='secondary'
                onClick={() => handleRemoveFile(file.name)}
              >
                <DeleteForever fontSize='large' />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FileUpload;
