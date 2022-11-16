import {
    Card as CardMUI, // para nao dar conflito com a declaração do componente
    CardMedia,
    CardContent,
    Chip,
    Typography,
    CardActions
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    cardMedia: {
      paddingTop: '56%',
    }
  }))

{/* adicionando props */}
const Card = ({ image, title, subtitle, category, actions }) => {

    const classes = useStyles()

    return (

        <CardMUI>
            <CardMedia
                className={classes.cardMedia}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography>
                    Entregar em {subtitle} dias
                </Typography> 
                <br></br>   
                <Chip label={category} />  
            </CardContent>

            {/* Validação realizada para inserirmos o botão na página (Confere se a variável actions existe, se não exitir da null) */}
            <CardActions>
                {
                    actions
                    ? (
                        <CardActions>
                            {actions}
                        </CardActions>
                        ) : null
                }
            </CardActions>
        </CardMUI>
    )
}

export default Card