import { 
    Box, 
    Container, 
    Grid, 
    Typography, 
    Chip, 
    Card, 
    CardHeader, 
    Avatar, 
    CardMedia } from '@material-ui/core'

    
import { makeStyles } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'
import TemplateDefault from '../src/templates/Default'

const useStyles = makeStyles((theme) => ({

    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    serviceName:{
        margin: '15px 0',
    },
    qntDias:{
        fontWeight: 'bold',
        marginBottom: 15,
    },
    card:{
        height: '100%'
    },
    cardMedia:{
        paddingTop: '56%'
    }

}))

const Service = () => {

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
                                {/* Necessário ter css nesse card, pois ele depende da altura porque se não tiver, a imagem não aparece.
                                O card media também depende de ter padding no css para que a imagem apareça */}
                                <Card className={classes.card}>
                                    <CardMedia 
                                        className={classes.cardMedia}
                                        image={'https://source.unsplash.com/random'}
                                        title="Título da imagem"
                                    />
                                </Card>
                                <Card className={classes.card}>
                                    <CardMedia 
                                        className={classes.cardMedia}
                                        image={'https://source.unsplash.com/random'}
                                        title="Título da imagem"
                                    />
                                </Card>
                                
                            </Carousel>
                        </Box>

                        {/* Criando o segundo BOX */}
                        <Box className={classes.box} textAlign="left">
                            <Typography component="span" variant="caption">Publicado em 20/10/2022</Typography>
                            <Typography component="h4" variant="h4" className={classes.serviceName}>Pintar quarto 4x4</Typography>
                            <Typography component="h4" variant="h4" className={classes.qntDias}>5 dias</Typography>
                            <Chip label="Categoria" />
                        </Box>

                        {/* Criando o terceiro BOX */}
                        <Box className={classes.box} textAlign="letf">
                            <Typography component="h6" variant="h6">Descrição</Typography>
                            <Typography component="p" variant="body2">É um fato conhecido de todos que um leitor se distrairá com o conteúdo de texto legível de uma página quando estiver examinando sua diagramação.</Typography>
                        </Box>
                    </Grid>

                    {/* Nessa segunda grid estão os box relacionados ao contato e localização */}
                    <Grid item xs={4}>
                        {/*Esse card não é o montado em Components e sim do material-ui*/}
                        <Card elevation ={0} className={classes.box}>
                            <CardHeader  
                                avatar={
                                    <Avatar>{/*Aqui ficará a inicial do usuário*/}</Avatar>
                                }
                                    title="ReizeeCode"
                                    subheader="reizeecode@gmail.com"
                            />
                            <CardMedia
                                image={'https://source.unsplash.com/random'}
                                title="ReizeeCode"
                            />
                        </Card>

                        <Box className={classes.box} textAlign="center">
                            <Typography component="h6" variant="h6">Localiação</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )

}

export default Service