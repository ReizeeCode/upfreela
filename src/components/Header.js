import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link';

import { AccountCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { 
  Container,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginTop: '10px'
  },
  headButton: {
    marginRight: '10px'
  },
  userName:{
    marginLeft: '8px',
  },
  divider:{
    margin: '8px 0' //8 na arte de cima e na parte de baixo e 0 nas laterais
  },
  navBar:{
    backgroundColor: '#031867'
  },
  logoNavbar: {
    height: '100px',
    width: '100px'
  }
}));

export default function ButtonAppBar() {

  const classes = useStyles();
  const [anchorUserMenu, setAnchorUserMenu] = useState(false)
  const [ session ] = useSession()

  const openUserMenu = Boolean(anchorUserMenu) // vai transformar anchorUserMenu em true or false

  return (
    <>
      <AppBar position="static" elevation={3} className={classes.navBar}>
        <Container maxWidth="lg">
          <Toolbar>

            <Typography variant="h6" className={classes.title}> 
              <a href={'/'} passHref className={classes.serviceLink}>
                <img src="/imgs/UpFreelaBranco.png" className={classes.logoNavbar}/>
              </a>
            </Typography>

            {/* se tiver session vai para a pagina de publish, se nao leva para signin */}
            <Link href={session ? '/user/publish' : '/auth/signin'} passHref> 
              <Button color="inherit" variant="outlined" className={classes.headButton}>
                Anunciar
              </Button>
            </Link>

            {
              session == null && 
              <Link href={'/freelancer'} passHref> 
                <Button color="inherit" variant="outlined" className={classes.headButton}>
                  Receber anúncios
                </Button>
              </Link>
            }

            {/* <Link href={'/frellancer/'} passHref> 
              <Button color="inherit" variant="outlined" className={classes.headButton}>
                Receber Ofertas
              </Button>
            </Link> */}

            {
              session
                ? (
                  <IconButton color="secondary" onClick={(e) => setAnchorUserMenu(e.currentTarget)}>  
                    {
                      session.user.image
                        ? <Avatar src={session.user.image} /> // se tiver imagem, aparece o avatar
                        : <AccountCircle /> // caso nao tenha imagem, aparece uma padrao
                    }
                    <Typography variant="subtitle2" color="secondary" className={classes.userName}>
                      {session.user.name}
                    </Typography>
                  </IconButton>
                ) : null
            }
            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)} //transforma em false e fecha o menu
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Link href="/user/dashboard" passHref>
                <MenuItem>Meus anúncios</MenuItem>
              </Link>
              <Link href="/user/publish" passHref>
                <MenuItem>Publicar novo anúncio</MenuItem>
              </Link>
              <Divider className={classes.divider}/>
              <MenuItem onClick={() => signOut({
                callbackUrl: '/'
              })}>Sair</MenuItem> {/* direciona para a home */}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}