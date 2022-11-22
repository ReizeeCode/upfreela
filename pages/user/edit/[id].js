import { Formik } from "formik";

import {
  Container,
  Typography,
  Box,
  Input,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";

import FileUpload from "../../../src/components/FileUpload";
import TemplateDefault from "../../../src/templates/Default";

import { validationSchema } from "../publish/formValues";

import { makeStyles } from "@material-ui/core/styles";

import services from "../../../src/models/services";
import dbConnect from "../../../src/utils/dbConnect";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  ButtonAdd: {
    margin: "30px auto 50px auto",
    display: "incline-block",
  },
  serviceLink: {
    textDecoration: "none !important",
  },
}));

const Edit = ({ service }) => {
  const classes = useStyles();

  async function handleSubmit(values) {
    const formData = new FormData(values);

    for (let field in values) {
      if (field === "files") {
        values.files.forEach((file) => {
          formData.append("files", file);
        });
      } else {
        formData.append(field, values[field]);
      }
    }

    console.log("Chamada da api com o put(Editar)");
    // await axios.put(`/auth/services/editar/${service._id}`, formData);
  }

  return (
    <TemplateDefault>
      <Formik initialValues={service} onSubmit={handleSubmit}>
        {({
          touched,
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <Input type='hidden' name='userId' value={values?.userId} />
              <Input type='hidden' name='image' value={values?.image} />

              <Container maxWidth='sm'>
                <Typography
                  component='h1'
                  variant='h2'
                  align='center'
                  color='textPrimary'
                >
                  Publicar Anúncio
                </Typography>
                <Typography
                  component='h5'
                  variant='h5'
                  align='center'
                  color='textPrimary'
                >
                  Quanto mais detalhado, melhor!
                </Typography>
              </Container>
              <br />
              <br />
              <Container maxWidth='md' className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl error={errors.title && touched.title} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Título do Anúncio
                    </InputLabel>
                    <Input
                      name='title'
                      value={values?.title}
                      label='ex.: Preciso de um Pintor para uma parede 4X4'
                    />
                    <FormHelperText>
                      {errors.title && touched.title ? errors.title : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl
                    error={errors.category && touched.category}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Serviço
                    </InputLabel>
                    <Select
                      name='category'
                      value={values?.category}
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value='Pintura'>Pintura</MenuItem>
                      <MenuItem value='Eletricista'>Eletricista</MenuItem>
                      <MenuItem value='Pedreiro'>Pedreiro</MenuItem>
                      <MenuItem value='Encanador'>Encanador</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.category && touched.category
                        ? errors.category
                        : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl
                    error={errors.qntDias && touched.qntDias}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Quantidade de dias
                    </InputLabel>
                    <Input
                      name='qntDias'
                      value={values?.qntDias}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.qntDias && touched.qntDias
                        ? errors.qntDias
                        : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                </Box>
              </Container>

              <Container maxWidth='md' className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FileUpload
                    files={values?.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              </Container>

              <Container maxWidth='md' className={classes.boxContainer}>
                <Box className={classes.box}>
                  <FormControl
                    error={errors.description && touched.description}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Escreva os detalhes do serviço que precisa
                    </InputLabel>
                    <Input
                      name='description'
                      multiline
                      rows={6}
                      value={values?.description}
                      variant='outlined'
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.description && touched.description
                        ? errors.description
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth='md' className={classes.boxContainer}>
                <Box className={classes.box}>
                  <Typography
                    component='h6'
                    variant='h6'
                    color='textPrimary'
                    gutterBottom
                  >
                    Dados de contato
                  </Typography>
                  <FormControl error={errors.name && touched.name} fullWidth>
                    <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                    <Input
                      name='name'
                      value={values?.name}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.name && touched.name ? errors.name : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl error={errors.phone && touched.phone} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Telefone
                    </InputLabel>
                    <Input
                      name='phone'
                      value={values?.phone}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.phone && touched.phone ? errors.phone : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl error={errors.email && touched.email} fullWidth>
                    <InputLabel className={classes.inputLabel}>
                      Email
                    </InputLabel>
                    <Input
                      name='email'
                      value={values?.email}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.email && touched.email ? errors.email : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth='md' className={classes.boxContainer}>
                <Box className={classes.box}>
                  <Typography
                    component='h6'
                    variant='h6'
                    color='textPrimary'
                    gutterBottom
                  >
                    Dados do endereço
                  </Typography>
                  <FormControl
                    error={errors.logradouro && touched.logradouro}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Endereço
                    </InputLabel>
                    <Input
                      name='logradouro'
                      value={values?.logradouro}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.logradouro && touched.logradouro
                        ? errors.logradouro
                        : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl error={errors.cep && touched.cep} fullWidth>
                    <InputLabel className={classes.inputLabel}>CEP</InputLabel>
                    <Input
                      name='cep'
                      value={values?.cep}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.cep && touched.cep ? errors.cep : null}
                    </FormHelperText>
                  </FormControl>
                  <br /> <br />
                  <FormControl
                    error={errors.regiao && touched.regiao}
                    fullWidth
                  >
                    <InputLabel className={classes.inputLabel}>
                      Região
                    </InputLabel>
                    <Select
                      name='regiao'
                      value={values?.regiao}
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value='Araraquara'>Araraquara</MenuItem>
                      <MenuItem value='Araçatuba'>Araçatuba</MenuItem>
                      <MenuItem value='Assis'>Assis</MenuItem>
                      <MenuItem value='Bauru'>Bauru</MenuItem>
                      <MenuItem value='Campinas'>Campinas</MenuItem>
                      <MenuItem value='Itapetininga'>Itapetininga</MenuItem>
                      <MenuItem value='Litoral Sul Paulista'>
                        Litoral Sul Paulista
                      </MenuItem>
                      <MenuItem value='Macro Metropolitana Paulista'>
                        Macro Metropolitana Paulista
                      </MenuItem>
                      <MenuItem value='Marília'>Marília</MenuItem>
                      <MenuItem value='Metropolitana de São Paulo'>
                        Metropolitana de São Paulo
                      </MenuItem>
                      <MenuItem value='Piracicaba'>Piracicaba</MenuItem>
                      <MenuItem value='Presidente Prudente'>
                        Presidente Prudente
                      </MenuItem>
                      <MenuItem value='Ribeirão Preto'>Ribeirão Preto</MenuItem>
                      <MenuItem value='São José do Rio Preto'>
                        São José do Rio Preto
                      </MenuItem>
                      <MenuItem value='Vale do Paraíba Paulista'>
                        Vale do Paraíba Paulista
                      </MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.regiao && touched.regiao ? errors.regiao : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth='md' className={classes.boxContainer}>
                <Box textAlign='right'>
                  {isSubmitting ? (
                    <CircularProgress />
                  ) : (
                    <Button type='submit' variant='contained' color='primary'>
                      Publicar Anúncio
                    </Button>
                  )}
                </Box>
              </Container>
            </form>
          </>
        )}
      </Formik>
    </TemplateDefault>
  );
};

export async function getServerSideProps({ query, service }) {
  const id = query.id;

  await dbConnect();

  const responseService = await services.findById({ _id: id });

  const serviceFind = JSON.parse(JSON.stringify(responseService));

  const serviceFormatted = {
    ...serviceFind,
    userId: serviceFind.user.id,
    name: serviceFind.user.name,
    email: serviceFind.user.email,
    phone: serviceFind.user.phone,
    image: serviceFind.user.image,
  };

  delete serviceFormatted.user;

  console.log(serviceFormatted);

  return {
    props: {
      service: serviceFormatted,
    },
  };
}

export default Edit;
