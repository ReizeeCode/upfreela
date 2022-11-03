import React, { useState } from 'react';
import Link from 'next/link';

import { AccountCircle, MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { 
  Container,
  AppBar,
  Toolbar,
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
  },
  userName:{
    marginLeft: '5px',
  },
  divider:{
    margin: '8px 0' //8 na arte de cima e na parte de baixo e 0 nas laterais
  },
  navBar:{
    backgroundColor: '#031867'
  }
}));

export default function ButtonAppBar() {

  const classes = useStyles();
  const [anchorUserMenu, setAnchorUserMenu] = useState(false)

  const openUserMenu = Boolean(anchorUserMenu) // vai transformar anchorUserMenu em true or false

  return (
    <>
      <AppBar position="static" elevation={3} className={classes.navBar}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              UpFrella
            </Typography>
            <Link href="/user/publish" passHref>          
              <Button color="inherit" variant="outlined">
                Anunciar
              </Button>
            </Link>
            <IconButton color="secondary" onClick={(e) => setAnchorUserMenu(e.currentTarget)}>  
              {
                true === false
                ? <Avatar src="" /> // se tiver imagem, aparece o avatar
                : <AccountCircle /> // caso nao tenha imagem, aparece uma padrao
              }
              <Typography variant="subtitle2" color="secondary" className={classes.userName}>
                ReizeeCode
              </Typography>
            </IconButton>
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
              <MenuItem>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}