import { useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import slugify from 'slugify'

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
import dbConnect from '../src/utils/dbConnect'
import ServicesModel from '../src/models/services'

const useStyles = makeStyles((theme) => ({
    serviceLink:{
        textDecoration: 'none !important'
    },
    searchBox:{
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        marginTop: '20px',
    },
    cardGrid:{
        marginTop: '25px'
    },
}))

const Home = ({ services }) => {

    
    const router = useRouter()
    const [search, setSearch] = useState()
    
    const classes = useStyles()

    // dar um push na rota pelo caminho que está sendo passado em pathname
    const handleSubmitSearch = () => {
        router.push({
          pathname: `/search/${search}`,
        })
    }    

    return(
        
        <TemplateDefault>
            <Container maxWidth="md">
                <Typography component="h1" variant="h3" align="center" color="textPrimary">
                    O que está procurando ?
                </Typography>
                <Paper className={classes.searchBox}>
                    <InputBase 
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Ex.: Pintor no bairro de Itaquera"
                        fullWidth
                    />
                    <IconButton onClick={handleSubmitSearch}>
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
                    {
                        // 2
                        services.map(service =>{
                            const category = slugify(service.category).toLocaleLowerCase()
                            const title = slugify(service.title).toLocaleLowerCase()

                            return (
                                <Grid key={service._id} item xs={12} sm={6} md={4}> {/* responsividade entre telas */}
                                    <Link href={`/${category}/${title}/${service._id}`}>
                                        <a className={classes.serviceLink}>
                                        <Card 
                                            image={`/uploads/${service.files[0].name}`}
                                            title={service.title}
                                            subtitle={service.qntDias}
                                            category={service.category}
                                        />
                                        </a>
                                    </Link> 
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </Container>
        </TemplateDefault>
    )
}

// Nessa função não depende de que nenhuma informação, sendo necessário a conexão com o banco e o model.
// No método aggregate é passado o um array e um objeto (é um array de objetos) e usar a regra do próprio mongoose ($sample: { size: 6 }) que informa a quantidade de registro que desejamos trazer 


export async function getServerSideProps() {
    await dbConnect()
  
    // 1
    const services = await ServicesModel.aggregate([{
      $sample: { size: 6 }
    }])
  
    return {
      props: {
        services: JSON.parse(JSON.stringify(services))
      }
    }
}

export default Home