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
  FormHelperText,
  Input,
  InputLabel
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
  inputLabel: {
    fontWeight: 400,
    color: theme.palette.primary.main,
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
    border: '2px dashed black',
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
      .required('Campo requerido'),

    service: yup.string()
      .required('Campo requerido'),

    description: yup.string()
      .min(30, 'Escreva um título com mais de 30 caracteres')
      .required('Campo requerido'),

    email: yup.string()
      .email('Digite um e-mail válido')
      .required('Campo requerido'),

    name: yup.string()
      .required('Campo requerido'),

    phone: yup.number()
      .required('Campo requerido')
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
          service: '',
          description: '',
          email: '',
          name: '',
          phone: ''
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

                {/* Container do campo Título e Serviço */}
                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>

                    <FormControl error={errors.title} fullWidth>
                      <InputLabel className={classes.inputLabel}>Título do Anúncio</InputLabel>
                      <Input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        label="ex.: Preciso de um Pintor para uma parede 4X4"
                      />
                      <FormHelperText>
                        {errors.title}
                      </FormHelperText>
                    </FormControl>

                    <br /> <br />

                    <FormControl error={errors.service} fullWidth>
                      <InputLabel className={classes.inputLabel}>Serviço</InputLabel>
                      <Select
                        name="service"
                        value={values.service}
                        fullWidth
                        onChange={handleChange}
                      >
                        <MenuItem value="Pintura">Pintura</MenuItem>
                        <MenuItem value="Eletricista">Eletricista</MenuItem>
                        <MenuItem value="Pedreiro">Pedreiro</MenuItem>
                        <MenuItem value="Encanador">Encanador</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.service}
                      </FormHelperText>
                    </FormControl>

                  </Box>
                </Container>

                {/* Container de Imagens */}
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

                {/* Container do campo Descrição */}
                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <FormControl error={errors.description} fullWidth>
                      <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está vendendo</InputLabel>
                      <Input
                        name="description"
                        multiline
                        rows={6}
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.description}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                {/* Container de contato */}
                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                      Dados de contato
                    </Typography>
                    <FormControl error={errors.name} fullWidth>
                      <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                      <Input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.name}
                      </FormHelperText>
                    </FormControl>

                    <br /> <br />

                    <FormControl error={errors.phone} fullWidth>
                      <InputLabel className={classes.inputLabel}>Telefone</InputLabel>
                      <Input
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.phone}
                      </FormHelperText>
                    </FormControl>

                    <br /> <br />

                    <FormControl error={errors.email} fullWidth>
                      <InputLabel className={classes.inputLabel}>Email</InputLabel>
                      <Input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.email}
                      </FormHelperText>
                    </FormControl>

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