import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    //Toda vez que determinada class for filha de uma outra, deve se adiciona-la aqui
    mask: {}, mainImage: {},
    thumbsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 15,
    },
    dropzone: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
      width: 200,
      height: 150,
      margin: '0 15px 15px 0',
      backgroundColor: theme.palette.background.default,
      border: '2px dashed black',
    },
    thumb: {
      position: 'relative',
      width: 200,
      height: 150,
      backgroundSize: 'cover',
      margin: '0 15px 15px 0',
      backgroundPosition: 'center center',
  
      '& $mainImage': {
        backgroundColor: 'green',
        padding: '6px 10px',
        position: 'absolute',
        bottom: 0,
        left: 0,
      },
  
      '&:hover $mask': {
        display: 'flex',
      },
  
      '& $mask': {
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: '100%',
        width: '100%'
      }
    }
}))

export default useStyles