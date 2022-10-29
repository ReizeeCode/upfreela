import {
    Card as CardMUI,
    CardMedia,
    CardContent,
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
const Card = ({ image, title, subtitle, actions }) => {

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
                    {subtitle}
                </Typography>
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