import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import './styles.scss'

import logo from '../../assets/gift-icon.svg'

const Navbar = ({totalItems}) => {
    const location=useLocation()

   

    return (
        <>
            <AppBar >
                <Toolbar className="hello" >
                    <Link to="/" className='name-logo'>
                        <img src={logo} alt="E-commerce" height="25px" />
                        E-commerce 
                    </Link>
                    <div />
                    {location.pathname==='/' && (
                    <div >
                        <IconButton component={Link} to="/cart" arial-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                    ) }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
