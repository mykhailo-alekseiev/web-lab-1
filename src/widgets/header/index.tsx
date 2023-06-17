import * as React from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useStore } from 'effector-react'
import { appModel } from 'shared/models'
import { logoutEv } from 'process/auth'
import { Page } from 'shared/routes'
import { Link as RouterLink } from 'react-router-dom'

const PAGES = [
  {
    label: 'List',
    pathname: Page.Home,
  },
  {
    label: 'Create Book',
    pathname: Page.CreateBook,
  },
]

const Header = () => {
  const logoSrc = useStore(appModel.$logoSrc)
  const title = useStore(appModel.$title)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    logoutEv()
  }

  return (
    <AppBar
      position='static'
      sx={{
        bgcolor: 'red',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img src={logoSrc} alt='logo' height={58} />
          <Typography
            variant='h6'
            noWrap
            component={RouterLink}
            to={Page.Home}
            sx={{
              mx: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              textDecoration: 'none',
              color: 'yellow',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {PAGES.map(({ label, pathname }) => (
                <MenuItem key={label} onClick={handleCloseNavMenu}>
                  <Link
                    component={RouterLink}
                    to={pathname}
                    sx={{
                      textDecoration: 'none',
                    }}
                  >
                    <Typography textAlign='center'>{label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'yellow',
              textDecoration: 'none',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map(({ label, pathname }) => (
              <Link
                key={label}
                component={RouterLink}
                to={pathname}
                sx={{
                  textDecoration: 'none',
                }}
              >
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>{label}</Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={RouterLink}
                to={Page.UserProfile}
                sx={{
                  textDecoration: 'none',
                }}
              >
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export { Header }
