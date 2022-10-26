import {  
    Button,
    Card,
    CardActions,
    CardMedia,
    CardContent,
    
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    makeStyles, 
    Paper, 
    Typography 
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/search'
import TemplateDefault from '../src/templates/Default'

const useStyles = makeStyles((theme) => ({
    searchContainer:{
        padding: theme.spacing(8, 10, 6)
    },
    searchBox:{
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        marginTop: '20px',
    },
    cardMedia: {
        paddingTop: '56%',
    }
}))

const Home = () => {
    const classes = useStyles()
    return(
        
        <TemplateDefault>
            <Container maxWidth="md" className={classes.searchContainer}>
                <Typography component="h1" variant="h3" align="center" color="textPrimary">
                    O que está procurando ?
                </Typography>
                <Paper className={classes.searchBox}>
                    <InputBase 
                    placeholder="Ex.: Pintor no bairro de Itaquera"
                    fullWidth
                    />
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </Container>

            <Container maxWidth="lg" className={classes.cardGrid}>              
                <Typography component="h2" variant="h4" align="center" color="textPrimary">
                    Destaques
                </Typography>  
                <br />
                <Grid container spacing={4}> {/* espaçamento entre os containers */}
                    <Grid item xs={12} sm={6} md={4}> {/* responsividade entre telas */}
                        <Card>
                        <CardMedia
                            className={classes.cardMedia}
                            image={'https://source.unsplash.com/random'}
                            title='Titulo da imagem'
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            Produto X
                            </Typography>
                            <Typography>
                            R$ 60,00
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardMedia 
                            className={classes.cardMedia}
                            image={'https://source.unsplash.com/random'}
                            title='Titulo da imagem'
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            Produto X
                            </Typography>
                            <Typography>
                            R$ 60,00
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardMedia 
                            className={classes.cardMedia}
                            image={'https://source.unsplash.com/random'}
                            title='Titulo da imagem'
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            Produto X
                            </Typography>
                            <Typography>
                            R$ 60,00
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Home