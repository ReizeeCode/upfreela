import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>  ({
  serviceLink:{
    textDecoration: 'none !important'
  },
  container: {
    marginBottom: 30
  },
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  formControl: {
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    display: 'block',
    margin: '10px auto'
  },
  errorMessage: {
    margin: '20px 0'
  }
}))

export default useStyles