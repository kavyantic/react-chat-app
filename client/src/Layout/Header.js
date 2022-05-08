import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import socket from '../socket/socket'


const tapped = false

export default function Header() {
    const [isShown,setIsShown] = useState(false)
    const [top, setTop] = useState(0)
    // useEffect(()=>{
    //     // window.onscroll = (e)=>{
    //     //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //     //         setTop(0)
    //     //       } else {
    //     //         setTop(-100)
    //     //       }
    //     // }

    //     socket.on('touch',(data)=>{
    //         console.log(data);
    //         setIsShown(true)
    //     })
    // } ,[])

    const onClickHandler = ()=>{
        if(!tapped){
          tapped=true
          return
        } else {

        }

    }
  return (
    <Fragment>
        <header className={classes['header']} style={{top:top}}>
          
            <Link className={classes['links']} to="/about">About</Link>
            <Link className={classes['links']} to="/">Home</Link>
            {<Link className={classes['links']} to="/hidden">Hidden</Link>}

        </header>
    </Fragment>
  )
}
