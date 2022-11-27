import { Formik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";

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

import { makeStyles } from "@material-ui/core/styles";

import FileUpload from "../../../src/components/FileUpload";
import TemplateDefault from "../../../src/templates/Default";

import useToasty from "../../../src/contexts/Toasty";

import services from "../../../src/models/services";
import dbConnect from "../../../src/utils/dbConnect";

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
  const router = useRouter();
  const { setToasty } = useToasty();

  const handleSuccess = () => {
    setToasty({
      open: true,
      text: "Anúncio Atualizado com sucesso com sucesso",
      severity: "success",
    });
    router.push("/user/dashboard");
  };

  const handleError = () => {
    setToasty({
      open: true,
      text: "Ops, ocorreu um erro, tente novamente.",
      severity: "error",
    });
  };

  function handleSubmit(values) {
    const formData = new FormData();

    // DataTransfers é usado para guardar os dados que estão sendo arrastados durante uma operação de Drag e Drop, podendo guardar um ou mais tipos de dados.
    var dataTransfer = new DataTransfer();

    // Percorrendo a lista de files e transformando eles nos tipos a serem adicionados no formData
    values.files.forEach((file) => {
      const fileCreated = new File([file], file.name, {
        type: "image/png",
      });

      Object.defineProperty(fileCreated, "size", {
        value: file.size,
      });

      dataTransfer.items.add(fileCreated);
    });

    // Pegando o file_list do dataTransfers que foram criados anteriormente, para assim ser usado na criação do formData
    const file_list = dataTransfer.files;

    console.log(file_list);

    for (let field in values) {
      if (field === "files") {
        Array.from(file_list).forEach((file) => {
          formData.append("files", file);
        });
      } else {
        formData.append(field, values[field]);
      }
    }

    // console.log("Chamada da api com o put(Editar)");

    axios
      .put(`/api/services/editar/${service._id}`, formData)
      .then(({ data }) => {
        handleSuccess();
      })
      .catch((error) => {
        console.log("Ocorreu um ERRO!");
        console.log(error);
        handleError();
      });
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={service} //valores iniciais que estão sendo importados do formValues
        onSubmit={handleSubmit}
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
            isSubmitting,
          }) => {
            return (
              <>
                <form onSubmit={handleSubmit}>
                  <Input type='hidden' name='userId' value={values.userId} />
                  <Input type='hidden' name='image' value={values.image} />

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
                      <FormControl
                        error={errors.title && touched.title}
                        fullWidth
                      >
                        <InputLabel className={classes.inputLabel}>
                          Título do Anúncio
                        </InputLabel>
                        <Input
                          name='title'
                          value={values?.title}
                          label='ex.: Preciso de um Pintor para uma parede 4X4'
                          onChange={handleChange}
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

                  {/* Container de Imagens */}
                  {/* A lógica de upload de imagenm, os componentes visuais e seus estilos estão sendo importados, onde são enviados da pasta src/components/FileUpload/ */}
                  <Container maxWidth='md' className={classes.boxContainer}>
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
                          variant='outlined'
                          value={values?.description}
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

                  {/* Container de contato */}
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
                      <FormControl
                        error={errors.name && touched.name}
                        fullWidth
                      >
                        <InputLabel className={classes.inputLabel}>
                          Nome
                        </InputLabel>
                        <Input
                          name='name'
                          value={values.name}
                          onChange={handleChange}
                        />
                        <FormHelperText>
                          {errors.name && touched.name ? errors.name : null}
                        </FormHelperText>
                      </FormControl>
                      <br /> <br />
                      <FormControl
                        error={errors.phone && touched.phone}
                        fullWidth
                      >
                        <InputLabel className={classes.inputLabel}>
                          Telefone
                        </InputLabel>
                        <Input
                          name='phone'
                          value={values.phone}
                          onChange={handleChange}
                        />
                        <FormHelperText>
                          {errors.phone && touched.phone ? errors.phone : null}
                        </FormHelperText>
                      </FormControl>
                      <br /> <br />
                      <FormControl
                        error={errors.email && touched.email}
                        fullWidth
                      >
                        <InputLabel className={classes.inputLabel}>
                          Email
                        </InputLabel>
                        <Input
                          name='email'
                          value={values.email}
                          onChange={handleChange}
                        />
                        <FormHelperText>
                          {errors.email && touched.email ? errors.email : null}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Container>

                  {/* Container do endereço */}
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
                          value={values.logradouro}
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
                        <InputLabel className={classes.inputLabel}>
                          CEP
                        </InputLabel>
                        <Input
                          name='cep'
                          value={values.cep}
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
                          value={values.regiao}
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
                          <MenuItem value='Ribeirão Preto'>
                            Ribeirão Preto
                          </MenuItem>
                          <MenuItem value='São José do Rio Preto'>
                            São José do Rio Preto
                          </MenuItem>
                          <MenuItem value='Vale do Paraíba Paulista'>
                            Vale do Paraíba Paulista
                          </MenuItem>
                        </Select>
                        <FormHelperText>
                          {errors.regiao && touched.regiao
                            ? errors.regiao
                            : null}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Container>

                  <Container maxWidth='md' className={classes.boxContainer}>
                    <Box textAlign='right'>
                      {isSubmitting ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                        >
                          Salvar Alterações
                        </Button>
                      )}
                    </Box>
                  </Container>
                </form>
              </>
            );
          }
        }
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

  // console.log(serviceFormatted);

  return {
    props: {
      service: serviceFormatted,
    },
  };
}

export default Edit;
