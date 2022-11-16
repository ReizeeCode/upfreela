import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { getSession } from 'next-auth/client'

import dbConnect from '../../src/utils/dbConnect'
import ServicesModel from '../../src/models/services'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'
import useToasty from '../../src/contexts/Toasty'

// cria css para a página dashboard 
const useStyles = makeStyles((theme) => ({

  ButtonAdd: {
    margin: '30px auto 50px auto',
    display: 'incline-block',
  }
}))

const Home = ( { services } ) => {
  const classes = useStyles()
  const { setToasty } = useToasty()
  const [serviceId, setServiceId] = useState()
  const [removedServices, setRemovedServices] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickRemove = (serviceId) => {
    setServiceId(serviceId)
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/services/apagar', {
      data: {
        id: serviceId
      }
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    console.log('blz, deletou!')

    setOpenConfirmModal(false)
    setRemovedServices([ ...removedServices, serviceId])

    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio removido com sucesso!'
    })
  }

  const handleError = () => {
    setOpenConfirmModal(false)
    setToasty({
      open: true,
      severity: 'error',
      text: 'Ops, ocorreu um erro!'
    })
  }

  return (
    <TemplateDefault>

      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Deseja realmente remover este anúncio?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar a operação, não poderá voltar atrás.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmRemove} color="primary" autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>      

      <Container maxWidth="sm" align="center">
        <Typography component="h1" variant="h2">
          Meus Anúncios
        </Typography>
        <Link href={'/user/publish'} passHref> 
          <Button variant='contained' color='primary' className={classes.ButtonAdd}>
            Publicar novo anúncio
          </Button>
        </Link>
      </Container>

      <Container maxWidth="md">
        {
          services.length === 0 && 
            <Typography component="div" variant="body1" align="center" color="textPrimary" gutterBottom>
              Nenhum anúncio publicado
            </Typography>
        }
        <Grid container spacing={4}>
          {
                        services.map(service => { 
                          if (removedServices.includes(service._id)) return null
            
                          return (
                            <Grid key={service._id} item xs={12} sm={6} md={4}>
                              <Card
                                image={`/uploads/${service.files[0].name}`}
                                title={service.title}
                                subtitle={service.qntDias}
                                category={service.category}
                                actions={
                                  <>
                                    <Button size="small" color="primary">
                                      Editar
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => handleClickRemove(service._id)}>
                                      Remover
                                    </Button>
                                  </>
                                }
                              />    
                            </Grid> 
                          )
                        })
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