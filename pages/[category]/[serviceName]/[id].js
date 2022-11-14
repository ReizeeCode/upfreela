import { makeStyles } from '@material-ui/core/styles'

import {
    Box,
    Container,
    Grid,
    Typography,
    Chip,
    Card,
    CardHeader,
    Avatar,
    CardMedia
} from '@material-ui/core'

import TemplateDefault from '../../../src/templates/Default'
import ServicesModel from '../../../src/models/services'
import Carousel from 'react-material-ui-carousel'
import dbConnect from '../../../src/utils/dbConnect'

const useStyles = makeStyles((theme) => ({

    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    category: {
        margin: '15px 0',
    },
    qntDias: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    card: {
        height: '100%'
    },
    cardMedia: {
        paddingTop: '56%'
    }

}))

const Service = ({ service }) => {

    const classes = useStyles()

    return (
        <TemplateDefault>
            <Container maxWidth="lg">
                <Grid container spacing={3}>

                    {/* Nessa primeira grid estão os box relacionados as imagens do serviço, informações principais e descrição */}
                    <Grid item xs={8}>
                        {/*Esse carrossel vem da biblioteca, foi realizar instalação (https://www.npmjs.com/package/react-material-ui-carousel) */}
                        {/* Estamos usando a versão dois, por este motivo devemos instalar com o seguinte comando: yarn add react-material-ui-carousel@v2 */}
                        <Box className={classes.box}>
                            {/* Inserindo Carrosel e passando algumas propriedades do mesmo */}
                            <Carousel
                                autoPlay={false}
                                animation="slide"
                                navButtonsAlwaysVisible="true"
                                navButtonsProps={{
                                    style: {
                                        color: 'white'
                                    }
                                }}
                            >

                                {
                                    service.files.map(file => (
                                        <Card key={file.name} className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={`/uploads/${file.name}`}
                                            title={service.title}
                                        />
                                        </Card>
                                    ))
                                }  

                        </Carousel>
                    </Box>

                    {/* Criando o segundo BOX */}
                    <Box className={classes.box} textAlign="left">
                        <Typography component="span" variant="caption">Publicado em 20/10/2022</Typography>
                        <Typography component="h4" variant="h4" className={classes.category}>{service.title}</Typography>
                        <Typography component="h4" variant="h4" className={classes.qntDias}>5 dias</Typography>
                        <Chip label={service.category} />
                    </Box>

                    {/* Criando o terceiro BOX */}
                    <Box className={classes.box} textAlign="letf">
                        <Typography component="h6" variant="h6">Descrição</Typography>
                        <Typography component="p" variant="body2">
                            {service.description}
                        </Typography>
                    </Box>
                </Grid>

                {/* Nessa segunda grid estão os box relacionados ao contato e localização */}
                <Grid item xs={4}>
                    {/*Esse card não é o montado em Components e sim do material-ui*/}
                    <Card elevation={0} className={classes.box}>
                        <CardHeader
                            avatar={
                                <Avatar src={service.user.image}>
                                    
                                    {service.user.image || service.user.name[0] }

                                </Avatar>
                            }
                            title={service.user.name}
                            subheader={service.user.email}
                        />
                        <CardMedia
                            image={service.user.image}
                            title={service.user.name}
                        />
                    </Card>

                    <Box className={classes.box} textAlign="center">
                        <Typography component="h6" variant="h6">Localização</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        </TemplateDefault >
    )

}


export async function getServerSideProps({ query }) {
    const { id } = query
  
    await dbConnect()
  
    const service = await ServicesModel.findOne({ _id: id })
  
    return {
      props: {
        service: JSON.parse(JSON.stringify(service))
      }    
    }
}

export default Service