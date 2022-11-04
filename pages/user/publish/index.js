import { Formik } from 'formik';

import {
  Box,
  Button,
  Container,
  Input,
  MenuItem,
  Select,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel
} from '@material-ui/core'

import TemplateDefault from '../../../src/templates/Default'
import FileUpload from '../../../src/components/FileUpload';
import { initialValues, validationSchema } from './formValues';

import useStyles from './styles'

const Publish = () => {

  const classes = useStyles()

  return (
    <TemplateDefault>
      <Formik
        initialValues={initialValues} //valores iniciais que estão sendo importados do formValues
        validationSchema={validationSchema} //isto é uma função que está sendo importadas do formValues
        onSubmit={(values) => {
          console.log('Ok. enviou o form', values)
        }}
      >
        {
          /* Recebendo um objeto*/
          /* O handleChange é passado para cada input, para que quando haja alguma mudança no campo o formik valida*/
          ({
            touched, //informa se o campo ja foi tocado ou mexido pelo usuário
            values,
            errors, //informa se existe o erro
            handleChange,
            handleSubmit,
            setFieldValue, //semelhante ao handleChange, porém manual
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

                    <FormControl error={errors.title && touched.title} fullWidth>
                      <InputLabel className={classes.inputLabel}>Título do Anúncio</InputLabel>
                      <Input
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        label="ex.: Preciso de um Pintor para uma parede 4X4"
                      />
                      <FormHelperText>
                        {errors.title && touched.title ? errors.title : null}
                      </FormHelperText>
                    </FormControl>

                    <br /> <br />

                    <FormControl error={errors.service && touched.service} fullWidth>
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
                        {errors.service && touched.service ? errors.service : null}
                      </FormHelperText>
                    </FormControl>

                  </Box>
                </Container>

                {/* Container de Imagens */}
                {/* A lógica de upload de imagenm, os componentes visuais e seus estilos estão sendo importados, onde são enviados da pasta src/components/FileUpload/ */}
                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <FileUpload
                      files={values.files}
                      errors={errors.files}
                      touched={touched.files}
                      setFieldValue={setFieldValue}
                    />
                  </Box>
                </Container>

                {/* Container do campo Descrição */}
                <Container maxWidth="md" className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <FormControl error={errors.description && touched.description} fullWidth>
                      <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está vendendo</InputLabel>
                      <Input
                        name="description"
                        multiline
                        rows={6}
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.description && touched.description ? errors.description : null}
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
                    <FormControl error={errors.name && touched.name} fullWidth>
                      <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                      <Input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.name && touched.name ? errors.name : null}
                      </FormHelperText>
                    </FormControl>

                    <br /> <br />

                    <FormControl error={errors.phone && touched.phone} fullWidth>
                      <InputLabel className={classes.inputLabel}>Telefone</InputLabel>
                      <Input
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.phone && touched.phone ? errors.phone : null}
                      </FormHelperText>
                    </FormControl>

                    <br /> <br />

                    <FormControl error={errors.email && touched.email} fullWidth>
                      <InputLabel className={classes.inputLabel}>Email</InputLabel>
                      <Input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.email && touched.email ? errors.email : null}
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