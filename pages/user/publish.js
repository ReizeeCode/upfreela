import { Box, Button, Container, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'

const useStyles = makeStyles ((theme) => ({
  container: {
    padding: theme.spacing(8, 0, 6)
  },
  boxContainer: {
    paddingBottom: theme.spacing(3),
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(2),
  }
}))

const Publish = () => {
  const classes = useStyles()

    return (
        <TemplateDefault>
          <Container maxWidth="sm" className={classes.container}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary">
              Publicar Anúncio
            </Typography>
            <Typography component="h5" variant="h5" align="center" color="textPrimary">
              Quanto mais detalhado, melhor!
            </Typography>
          </Container>

          <Container maxWidth="md" className={classes.boxContainer}>
            <Box className={classes.box}>
              <Typography component="h6" variant="h6" color="textPrimary">
                Título do Anúncio
              </Typography>
              <TextField 
                label="ex.: Preciso de pedreiro para reforma do banheiro"
                size="small"
                fullWidth={true} //(ocupa área toda do box)
              />

              <br/> <br/>
              <Typography component="h6" variant="h6" color="textPrimary">
                Categoria
              </Typography>
              <Select
                native 
                value=""
                fullWidth
                onChange={() => {}}
                inputProps={{
                  name: 'age',
                }}
              >
                <option value="">Selecione</option>
                <option value={1}>Pintura</option>
                <option value={2}>Eletricista</option>
                <option value={3}>Pedreiro</option>
                <option value={4}>Encanador</option>
              </Select>
            </Box>
          </Container>

          <Container maxWidth="md" className={classes.boxContainer}>
            <Box className={classes.box}>
              <Typography component="h6" variant="h6" color="textPrimary">
                Imagens
              </Typography>
              <Typography component="div" variant="body2" color="textPrimary">
                A primeira imagem é a foto principal do seu anúncio.
              </Typography>
            </Box>
          </Container>

          <Container maxWidth="md" className={classes.boxContainer}>
            <Box className={classes.box}>
              <Typography component="h6" variant="h6" color="textPrimary">
                Descrição
              </Typography>
              <Typography component="div" variant="body2" color="textPrimary">
                Escreva os detalhes do que está precisando.
              </Typography>
              <TextField
                multiline
                minRows={6}
                variant="outlined"
                fullWidth
              />
            </Box>
          </Container>

          <Container maxWidth="md" className={classes.boxContainer}>
            <Box className={classes.box}>
              <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                Dados de contato 
              </Typography>
              <TextField
                label="Nome"
                variant="outlined"
                size="small"
                fullWidth
              /> 
              <br/> <br/>
              <TextField
                label="Telefone"
                variant="outlined"
                size="small"
                fullWidth
              />
              <br/> <br/>
              <TextField
                label="E-mail"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
          </Container>

          <Container maxWidth="md" className={classes.boxContainer}>
            <Box textAlign="right">
              <Button variant="contained" color="primary">
                Publicar Anúncio
              </Button>
            </Box>
          </Container>
        </TemplateDefault>
    )
}

export default Publish