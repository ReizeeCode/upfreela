import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    //Toda vez que determinada class for filha de uma outra, deve se adiciona-la aqui
    boxContainer: {
      paddingBottom: theme.spacing(3),
    },
    box: {
      backgroundColor: theme.palette.background.white,
      padding: theme.spacing(2),
    },
    inputLabel: {
      fontWeight: 400,
      color: theme.palette.primary.main,
    }
}))

export default useStyles