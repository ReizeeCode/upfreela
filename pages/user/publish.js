import { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'

import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  FormHelperText
} from '@material-ui/core'

import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { DeleteForever } from '@material-ui/icons'

import TemplateDefault from '../../src/templates/Default'


const useStyles = makeStyles((theme) => ({
  //Toda vez que determinada class for filha de uma outra, deve se adiciona-la aqui
  mask: {}, mainImage: {},
  boxContainer: {
    paddingBottom: theme.spacing(3),
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(2),
  },
  thumbsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  dropzone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    width: 200,
    height: 150,
    margin: '0 15px 15px 0',
    backgroundColor: theme.palette.background.default,
    border: '2px dashed black'
  },
  thumb: {
    position: 'relative',
    width: 200,
    height: 150,
    backgroundSize: 'cover',
    margin: '0 15px 15px 0',
    backgroundPosition: 'center center',

    '& $mainImage': {
      backgroundColor: 'green',
      padding: '6px 10px',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },

    '&:hover $mask': {
      display: 'flex',
    },

    '& $mask': {
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: '100%',
      width: '100%'
    }
  }
}))

const Publish = () => {

  const validationSchema = yup.object().shape({
    title: yup.string()
      .min(6, 'Escreva um título com uma quantidade maior de caracteres')
      .max(100, 'Escreva um título com uma quantidade menor de caracteres')
      .required('Obrigatório'),
    
    nameService: yup.string().required('Obrigatório')
  })

  const classes = useStyles()
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => { //função executada toda vez que uma imagem for selecionada

      const newFiles = acceptedFile.map(file => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      })

      setFiles([
        ...files, //mantém os files que já existem, caso existam
        ...newFiles //adicionam novos files
      ])
    }
  })

  const handleRemoveFile = fileName => {
    const newFileState = files.filter(file => file.name !== fileName)
    setFiles(newFileState)
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: '',
          nameService: ''
        }} //valores iniciais
        validationSchema={validationSchema} //isto é uma função
        onSubmit={(values) => {
          console.log('Ok. Enviado', values)
        }}
      >
        {
          /* Recebendo um objeto*/
          /* O handleChange é passado para cada input, para que quando haja alguma mudança no campo o formik valida*/
          ({
            values,
            errors,
            handleChange,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Publicar Anúncio
                  </Typography>
                  <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    Quanto mais detalhado, melhor!
                  </Typography>
                </Container>

                <br /><br />

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Título do Anúncio
                    </Typography>
                    <TextField
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      label="ex.: Preciso de pedreiro para reforma do banheiro"
                      size="small"
                      fullWidth={true} //(ocupa área toda do box)
                      error={errors.title} //confere se existe algo em title
                      helperText={errors.title} //texto que aparece no campo, exemplo: campo obrigatorio, puxando a informação do errors
                    />

                    <br /> <br />
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Serviço
                    </Typography>
                    <FormControl error={errors.nameService} fullWidth>
                      <Select
                        name="nameService"
                        value={values.category}
                        fullWidth
                        onChange={handleChange}

                      >
                        <MenuItem value="Pintura">Pintura</MenuItem>
                        <MenuItem value="Eletricista">Eletricista</MenuItem>
                        <MenuItem value="Pedreiro">Pedreiro</MenuItem>
                        <MenuItem value="Encanador">Encanador</MenuItem>
                      </Select>
                      <FormHelperText>
                        { errors.nameService}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Imagens
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
                      A primeira imagem é a foto principal do seu anúncio.
                    </Typography>
                    <Box className={classes.thumbsContainer}>
                      <Box className={classes.dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography variant="body2" color="textPrimary">
                          Clique para adicionar ou arraste a imagem aqui.
                        </Typography>
                      </Box>

                      {
                        files.map((file, index) => (
                          <Box
                            key={file.name}
                            className={classes.thumb}
                            style={{ backgroundImage: `url(${file.preview})` }}
                          >
                            {
                              index === 0 ?
                                <Box className={classes.mainImage}>
                                  <Typography variant="body" color="secondary">
                                    Principal
                                  </Typography>
                                </Box>
                                : null
                            }
                            <Box className={classes.mask}>
                              <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                                <DeleteForever fontSize="large" />
                              </IconButton>
                            </Box>
                          </Box>
                        ))
                      }

                    </Box>
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                      Descrição
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
                      Escreva os detalhes do que está precisando.
                    </Typography>
                    <TextField
                      multiline
                      minRows={6}
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Dados de contato
                    </Typography>
                    <TextField
                      label="Nome"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <br /> <br />
                    <TextField
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <br /> <br />
                    <TextField
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                </Container>

                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box textAlign="right">
                    <Button type="submit" variant="contained" color="primary">
                      Publicar Anúncio
                    </Button>
                  </Box>
                </Container>
              </form>
            )
          }
        }
      </Formik>

    </TemplateDefault >
  )
}

export default Publish