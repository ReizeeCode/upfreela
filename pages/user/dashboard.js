import {
  Button,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { getSession } from 'next-auth/client'

import dbConnect from '../../src/utils/dbConnect'
import ServicesModel from '../../src/models/services'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'


// cria css para a página dashboard 
const useStyles = makeStyles((theme) => ({

  ButtonAdd: {
    margin: '30px auto',
    display: 'block',
  }
}))

const Home = ( { services } ) => {
  const classes = useStyles()

  console.log(services)

  return (
    <TemplateDefault>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center">
          Meus Anúncios
        </Typography>
        <Button variant='contained' color='primary' className={classes.ButtonAdd}>
          Publicar novo anúncio
        </Button>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {
            services.map(service => (
              <Grid key={service._id} item xs={12} sm={6} md={4}>
                <Card
                  image={`/uploads/${service.files[0].name}`} 
                  title={service.title}
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
            ))
          }

        </Grid>
      </Container>
    </TemplateDefault>
  )
}

// autenticação obrigatória
Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  //conectando no banco
  await dbConnect()

  const services = await ServicesModel.find({ 'user.id': session.userId })

  return {
    props: {
      services: JSON.parse(JSON.stringify(services)),
    }
  }
}

export default Home