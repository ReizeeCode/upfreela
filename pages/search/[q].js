import { useState } from 'react'
import { useRouter } from 'next/router'

import slugify from 'slugify'
import Link from 'next/link'

import {
  Container,
  Typography,
  Box,
  Grid,
  IconButton,
  Paper,
  InputBase,
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

import Card from '../../src/components/Card'
import TemplateDefault from '../../src/templates/Default'
import ServicesModel from '../../src/models/services'

const useStyles = makeStyles((theme) => ({
  serviceLink:{
    textDecoration: 'none !important'
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    marginBottom: 20
  },
}))

const List = ({ services, q }) => {
  
  const router = useRouter()
  const [search, setSearch] = useState()
  
  const classes = useStyles()

  const handleSubmitSearch = () => {
    router.push({
      pathname: `${search}`,
    })
  }  

  return (
    <TemplateDefault>
      <Container maxWidth="lg">

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper component="form" className={classes.searchBox}>
              <InputBase
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex.: Preciso de um pintor"
                fullWidth
              />
              <IconButton onClick={handleSubmitSearch}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.box}>
            <Typography component="h6" variant="h6">
              Anúncios
            </Typography>
            <Typography component="span" variant="subtitle2">
              Encontrados <b>{services.length}</b> anúncios para o termo <b>{q}</b>
            </Typography>

            <br /><br />

            <Grid container spacing={4}>

              {
                services.map(service => {
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

          </Box>
        </Grid>

      </Container>
    </TemplateDefault>
  )
}


// nome do arquivo está como [q].js para não confundirmos com o query que recebemos aqui
// nós desestruturamos ele pegando o q de query e retornamos a lista de serviços
// na função abaixo nós estamos pegando o que foi digitado na barra de search e comparando com o que está nos títulos e descrições
export async function getServerSideProps({ query }) {
  const { q } = query

  const services = await ServicesModel.find({
    // essa função espera um array, onde passamos um array de objetos (services)
    // onde na função or passamos os campos que desejamos procurar e com as propriedades regex e options ele proocura pelo que foi digitado 
    // ele pega a palavra e retorna os cards que tem alguma das palavras digitados no título ou na descrição
    $or: [
      {
        title: {
          $regex: q,
          $options: 'i'
        }
      },
      {
        description: {
          $regex: q,
          $options: 'i'
        }
      },
    ]
  })

  return {
    props: {
      services: JSON.parse(JSON.stringify(services)),
      q: JSON.parse(JSON.stringify(q))
    }
  }
}

export default List