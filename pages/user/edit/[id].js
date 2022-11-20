import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'

import { 
    Box,
    Button, 
    Container, 
    FormControl, 
    FormHelperText,
    Input, 
    InputAdornment, 
    InputLabel, 
    MenuItem,    
    Select,   
    Typography,
    CircularProgress,
 } from '@material-ui/core'

import { validationSchema } from './formValuesEdit'
import TemplateDefault from '../../../src/templates/Default'
import theme from '../../../src/theme'
import FileUpload from '../../../src/components/FileUpload'
import useToasty from '../../../src/contexts/Toasty'
import ServicesModel from '../../../src/models/services'
import dbConnect from '../../../src/utils/dbConnect'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    boxContainer: {
        paddingBottom: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(2),
    },
    inputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
    }
}))
  
  
const Edit = ({ userId, image, service }) => {
    const classes = useStyles()

    const { setToasty } = useToasty()
    const router = useRouter()

    const formValuesEdit = {
        title: service.title,
        category: service.category,
        qntDias: service.qntDias,         
        image: image,      
        description: service.description,
        name: service.user.name,
        phone: service.user.phone,
        email: service.user.email,
        userId: userId,
        files: service.files,
        logradouro: service.logradouro,
        cep: service.cep,
        regiao: service.regiao,
    }

    // formValuesEdit.userId = userId
    // formValuesEdit.image = image
    
    const handleSuccess = () => {
        setToasty({
            open: true,
            text: 'Anúncio alterado com sucesso!',
            severity: 'success',
        })
        router.push('/user/dashboard') //user/dashboard
        // console.log('msg: ' + user.service)
    }

    const handleError = () => {
        setToasty({
            open: true,
            text: 'Ocorreu um erro, tente novamente!',
            severity: 'error',
        })    
    }

    const handleFormSubmit = (values) => {
        const formData = new FormData()
        
        for (let field in values) {
            if (field === 'files'){
                values.files.forEach(file => {
                    formData.append('files', file)
                })
            } else {
                formData.append(field, values[field])
            }
        }

        axios.put('/api/services/update', formData)
            .then(handleSuccess)
            .catch(handleError)
    }
    
    return(
        <TemplateDefault>
            <Formik
                initialValues={formValuesEdit}
                validationSchema={validationSchema}
                onSubmit={ handleFormSubmit }               
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                    }) => {                 
                        
                        return(
                            <form onSubmit={handleSubmit}>
                                <Input type='hidden' name='userId' value={values.userId}/>
                                <Input type='hidden' name='image' value={values.image}/>

                                <Container maxWidth='sm'>
                                    <Typography component="h1" variant="h2" align="center" color="textPrimary">
                                        Editar Anúncio
                                    </Typography>
                                </Container>

                                <br /><br />

                                {/* Container do campo Título, Serviço e Dias */}
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>

                                    <FormControl error={errors.title && touched.title} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Título do Anúncio</InputLabel>
                                        <Input
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>
                                            {errors.title && touched.title ? errors.title : null}
                                        </FormHelperText>
                                    </FormControl>

                                    <br /> <br />

                                    <FormControl error={errors.category && touched.category} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Serviço</InputLabel>
                                        <Select
                                            name="category"
                                            value={values.category}
                                            //fullWidth
                                            label='Serviço'
                                            onChange={handleChange}
                                        >
                                        <MenuItem value="Pintura">Pintura</MenuItem>
                                        <MenuItem value="Eletricista">Eletricista</MenuItem>
                                        <MenuItem value="Pedreiro">Pedreiro</MenuItem>
                                        <MenuItem value="Encanador">Encanador</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {errors.category && touched.category ? errors.category : null}
                                        </FormHelperText>
                                    </FormControl>

                                    <br /> <br />

                                    <FormControl error={errors.qntDias && touched.qntDias} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Quantidade de dias</InputLabel>
                                        <Input
                                            name="qntDias"
                                            value={values.qntDias}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>
                                            {errors.qntDias && touched.qntDias ? errors.qntDias : null}
                                        </FormHelperText>
                                    </FormControl>
                                    <br /> <br />
                                    </Box>
                                </Container>

                                {/* Container de Imagens */}
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FileUpload
                                            files={values.files}
                                            backgroundImage={`/uploads/${service.files[0].name}`}
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
                                            <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está anunciando</InputLabel>
                                            <Input
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                multiline
                                                rows={6}
                                                variant="outlined"
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

                                {/* Container do endereço */}
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                                        Dados do endereço
                                        </Typography>
                                        <FormControl error={errors.logradouro && touched.logradouro} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Endereço</InputLabel>
                                        <Input
                                            name="logradouro"
                                            value={values.logradouro}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>
                                            {errors.logradouro && touched.logradouro ? errors.logradouro : null}
                                        </FormHelperText>
                                        </FormControl>

                                        <br /> <br />

                                        <FormControl error={errors.cep && touched.cep} fullWidth>
                                        <InputLabel className={classes.inputLabel}>CEP</InputLabel>
                                        <Input
                                            name="cep"
                                            value={values.cep}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>
                                            {errors.cep && touched.cep ? errors.cep : null}
                                        </FormHelperText>
                                        </FormControl>

                                        <br /> <br />

                                        <FormControl error={errors.regiao && touched.regiao} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Região</InputLabel>
                                        <Select
                                            name="regiao"
                                            value={values.regiao}
                                            fullWidth
                                            onChange={handleChange}
                                        >

                                            <MenuItem value="Araraquara">Araraquara</MenuItem>
                                            <MenuItem value="Araçatuba">Araçatuba</MenuItem>
                                            <MenuItem value="Assis">Assis</MenuItem>
                                            <MenuItem value="Bauru">Bauru</MenuItem>
                                            <MenuItem value="Campinas">Campinas</MenuItem>
                                            <MenuItem value="Itapetininga">Itapetininga</MenuItem>
                                            <MenuItem value="Litoral Sul Paulista">Litoral Sul Paulista</MenuItem>
                                            <MenuItem value="Macro Metropolitana Paulista">Macro Metropolitana Paulista</MenuItem>
                                            <MenuItem value="Marília">Marília</MenuItem>
                                            <MenuItem value="Metropolitana de São Paulo">Metropolitana de São Paulo</MenuItem> 
                                            <MenuItem value="Piracicaba">Piracicaba</MenuItem>
                                            <MenuItem value="Presidente Prudente">Presidente Prudente</MenuItem>
                                            <MenuItem value="Ribeirão Preto">Ribeirão Preto</MenuItem>
                                            <MenuItem value="São José do Rio Preto">São José do Rio Preto</MenuItem>
                                            <MenuItem value="Vale do Paraíba Paulista">Vale do Paraíba Paulista</MenuItem>

                                        </Select>
                                        <FormHelperText>
                                            {errors.regiao && touched.regiao ? errors.regiao : null}
                                        </FormHelperText>
                                        </FormControl>

                                    </Box>
                                </Container>

                                <Container maxWidth='md'  sx={{ paddingTop: 3}}>
                                    <Box textAlign='right'>
                                    {
                                        isSubmitting
                                        ? (
                                            <CircularProgress sx={{ display: 'block', margin: '10px auto' }} />
                                        )
                                        : (  
                                            <Button type='submit' variant='contained' color='primary'>
                                                Salvar Alterações
                                            </Button>
                                        )
                                        
                                    }
                                    </Box>
                                </Container>
                            </form>
                        )
                    }
                }
            </Formik>            
        </TemplateDefault>
    )
}

Edit.requireAuth = true

export async function getServerSideProps({ req, query }) {
    const { accessToken, user } = await getSession({ req }) 
    const { id } = query    
    
    let token = ''
    accessToken
        ? token = accessToken
        : token = user.email
    
    let img = '' 
    user.image
        ? img = user.image
        : img = null
    
    await dbConnect()

    const service = await ServicesModel.findOne({ _id: id })

    return {        
        props:{
            userId: token,
            image: img,
            service: JSON.parse(JSON.stringify(service)),
        }
    }
}

export default Edit