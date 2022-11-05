import {
    Snackbar,
} from '@material-ui/core'

//   Necessário essa importação para exibirmos os alertas (foi necessário instalação com o comando yarn add )
import MuiAlert from '@material-ui/lab/Alert'

{/* O componente abaixo recebe o open que se trata de um booelan que verifica se é true ou false para realizar a abertura, o texto, A cor (severity) e o onclose que indica se desejamos passar uma função caso desejamos fechar*/}
const Toasty = ({ open, text, severity, onClose = null }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        if (onClose) onClose()
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000} //quanto tempo fica aberto antes de fehcar sozinho, neste caso 6s
            onClose={handleClose}
        >
            <MuiAlert elevation={6} variant="filled" severity={severity}>
                {text} {/*texto que desejamos exibir*/}
            </MuiAlert>
        </Snackbar>
    )
}

export default Toasty