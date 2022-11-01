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
  
  const useStyles = makeStyles((theme) => ({
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
  
  const List = () => {
    const classes = useStyles()
  
    return (
      <TemplateDefault>
        <Container maxWidth="lg">
  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Paper component="form" className={classes.searchBox}>
                <InputBase                
                  placeholder="Ex.: Preciso de um pintor"
                  fullWidth
                />
                <IconButton type="submit" aria-label="search">
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
                ENCONTRADOS [NÚMERO] ANÚNCIOS
              </Typography>

              <br/><br/>
              
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    image={`https://source.unsplash.com/random`}
                    title="Serviço X"
                    subtitle="4 dias"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    image={`https://source.unsplash.com/random`}
                    title="Serviço X"
                    subtitle="4 dias"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    image={`https://source.unsplash.com/random`}
                    title="Serviço X"
                    subtitle="4 dias"
                  />
                </Grid>
              </Grid>
  
            </Box>
          </Grid>
  
        </Container>
      </TemplateDefault>
    )
  }
  
  export default List