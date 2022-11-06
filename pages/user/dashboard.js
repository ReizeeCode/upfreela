import {
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'

// cria css para a página dashboard 
const useStyles = makeStyles((theme) => ({

  ButtonAdd: {
    margin: '30px auto',
    display: 'block',
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      {/* deixa a tela em tamanho 'small' */}
      <Container maxWidth="sm"> 
        <Typography component="h1" variant="h2" align="center">
          Meus Anúncios
        </Typography>
        <Button variant='contained' color='primary' className={classes.ButtonAdd}>
          Publicar novo anúncio
        </Button>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={4}> {/* espaçamento entre os containers */}
          <Grid item xs={12} sm={6} md={4}> {/* responsividade entre telas */}
            <Card 
                image={'https://source.unsplash.com/random'}
                title="Serviço X"
                subtitle="5 dias"
                actions={
                  <>
                    <Button size="small" color="primary">
                      Editar
                    </Button>
                    <Button size="small" color="primary">
                      Inativar
                    </Button>
                  </>
                }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}> {/* responsividade entre telas */}
            <Card 
                image={'https://source.unsplash.com/random'}
                title="Serviço X"
                subtitle="5 dias"
                actions={
                  <>
                    <Button size="small" color="primary">
                      Editar
                    </Button>
                    <Button size="small" color="primary">
                      Inativar
                    </Button>
                  </>
                }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}> {/* responsividade entre telas */}
            <Card 
                image={'https://source.unsplash.com/random'}
                title="Serviço X"
                subtitle="5 dias"
                actions={
                  <>
                    <Button size="small" color="primary">
                      Editar
                    </Button>
                    <Button size="small" color="primary">
                      Inativar
                    </Button>
                  </>
                }
            />
          </Grid>

        </Grid>
      </Container>
    </TemplateDefault>
  )
}

// autenticação obrigatória
Home.requireAuth = true

export default Home