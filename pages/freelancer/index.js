import { Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'

import {
    Box,
    Container,
    Typography,
    Input,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from '@material-ui/core'

import TemplateDefault from '../../src/templates/Default'

import { initialValues, validationSchema } from './formValues'
import useToasty from '../../src/contexts/Toasty'
import useStyles from './styles'

const Freelancer = () => {
    const classes = useStyles()
    const router = useRouter()
    const { setToasty } = useToasty()

    const handleFormSubmit = async values => {
        const response = await axios.post('/api/freelancers', values)

        if (response.data.success) {
            setToasty({
                open: true,
                severity: 'success',
                text: 'Cadastro realizado com sucesso!'
            })

            router.push('/')

        }
    }

    return (
        <TemplateDefault>
            <Container maxWidth="sm" component="main" className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Informe seu dados
                </Typography>
                <Typography component="h6" variant="h6" align="center" color="textPrimary">
                    E receba anúncios de todas as regiões de São Paulo
                </Typography>
            </Container>

            <Container maxWidth="md">
                <Box className={classes.box}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {
                            ({
                                touched,
                                values,
                                errors,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <FormControl fullWidth error={errors.nameFreelancer && touched.nameFreelancer} className={classes.formControl}>
                                            <InputLabel>Nome</InputLabel>
                                            <Input
                                                name="nameFreelancer"
                                                value={values.nameFreelancer}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                {errors.nameFreelancer && touched.nameFreelancer ? errors.nameFreelancer : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.cpfFreelancer && touched.cpfFreelancer} className={classes.formControl}>
                                            <InputLabel>CPF</InputLabel>
                                            <Input
                                                name="cpfFreelancer"
                                                value={values.cpfFreelancer}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                {errors.cpfFreelancer && touched.cpfFreelancer ? errors.cpfFreelancer : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth error={errors.emailFreelancer && touched.emailFreelancer} className={classes.formControl}>
                                            <InputLabel>E-mail</InputLabel>
                                            <Input
                                                name="emailFreelancer"
                                                type="email"
                                                value={values.emailFreelancer}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                {errors.emailFreelancer && touched.emailFreelancer ? errors.emailFreelancer : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl error={errors.regiaoFreelancer && touched.regiaoFreelancer} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Região</InputLabel>
                                        <Select
                                            name="regiaoFreelancer"
                                            value={values.regiaoFreelancer}
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
                                            {errors.regiaoFreelancer && touched.regiaoFreelancer ? errors.regiaoFreelancer : null}
                                        </FormHelperText>
                                        </FormControl>

                                        <FormControl error={errors.categoryFreelancer && touched.categoryFreelancer} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Serviço</InputLabel>
                                        <Select
                                            name="categoryFreelancer"
                                            value={values.categoryFreelancer}
                                            fullWidth
                                            onChange={handleChange}
                                        >

                                            <MenuItem value="Advocacia">Advocacia</MenuItem>
                                            <MenuItem value="Assistente virtual">Assistente virtual</MenuItem>
                                            <MenuItem value="Aulas particulares">Aulas particulares</MenuItem>
                                            <MenuItem value="Coach">Coach</MenuItem>
                                            <MenuItem value="Confecção de bolos de doces">Confecção de bolos de doces</MenuItem>
                                            <MenuItem value="Construção">Construção</MenuItem>
                                            <MenuItem value="Consultoria">Consultoria</MenuItem>
                                            <MenuItem value="Costura e reparos de vestuário">Costura e reparos de vestuário</MenuItem>
                                            <MenuItem value="Cuidador de pets">Cuidador de pets</MenuItem>
                                            <MenuItem value="Decoração de casas">Decoração de casas</MenuItem>
                                            <MenuItem value="Decoração de festas">Decoração de festas</MenuItem>
                                            <MenuItem value="Designer Gráfico">Designer Gráfico</MenuItem>
                                            <MenuItem value="Edição de vídeos">Edição de vídeos</MenuItem>
                                            <MenuItem value="Eletricista">Eletricista</MenuItem>
                                            <MenuItem value="Fotografia">Fotografia</MenuItem>
                                            <MenuItem value="Manutenção de aparelhos eletrônicos">Manutenção de aparelhos eletrônicos</MenuItem>
                                            <MenuItem value="Marketing digital e produção de conteúdos para internet">Marketing digital e produção de conteúdos para internet</MenuItem>
                                            <MenuItem value="Personal">Personal</MenuItem>
                                            <MenuItem value="Personal stylist e Personal buyer">Personal stylist e Personal buyer</MenuItem>
                                            <MenuItem value="Pintura">Pintura</MenuItem>
                                            <MenuItem value="Produtor de conteúdo">Produtor de conteúdo</MenuItem>
                                            <MenuItem value="Produção e organização de eventos">Produção e organização de eventos</MenuItem>
                                            <MenuItem value="Programador de softwares">Programador de softwares</MenuItem>
                                            <MenuItem value="Psicólogos">Psicólogos</MenuItem>
                                            <MenuItem value="Segurança">Segurança</MenuItem>
                                            <MenuItem value="Serviços de manutenção doméstica">Serviços de manutenção doméstica</MenuItem>
                                            <MenuItem value="Tradutor">Tradutor</MenuItem>
                                            <MenuItem value="Treinador esportivo pessoal">Treinador esportivo pessoal</MenuItem>

                                        </Select>
                                        <FormHelperText>
                                            {errors.categoryFreelancer && touched.categoryFreelancer ? errors.categoryFreelancer : null}
                                        </FormHelperText>
                                        </FormControl>

                                        {
                                            isSubmitting
                                                ? (
                                                    <CircularProgress className={classes.loading}/>
                                                ) : (
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                    >
                                                        Cadastrar
                                                    </Button>
                                                )
                                        }
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </Box>
            </Container>
        </TemplateDefault>
    )
}

export default Freelancer