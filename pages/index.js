import {      
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    Paper, 
    Typography 
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/search'
import TemplateDefault from '../src/templates/Default'
import Card from '../src/components/Card'

const useStyles = makeStyles((theme) => ({
    searchBox:{
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        marginTop: '20px',
    },
    cardGrid:{
        marginTop: '25px'
    }
}))

const Home = () => {
    const classes = useStyles()
    return(
        
        <TemplateDefault>
            <Container maxWidth="md">
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
                    <Card 
                        image={'https://source.unsplash.com/random'}
                        title="Serviço X"
                        subtitle="5 dias"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card 
                            image={'https://source.unsplash.com/random'}
                            title="Serviço X"
                            subtitle="5 dias"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card 
                            image={'https://source.unsplash.com/random'}
                            title="Serviço X"
                            subtitle="5 dias"
                        />
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Home