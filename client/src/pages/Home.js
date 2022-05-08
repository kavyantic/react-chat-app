import React, { Fragment } from 'react'
import Console from '../components/Console'
import socket from '../socket/socket'
import classes from './Home.module.css'

export default function Home() {
  return (
    <Fragment>
      <main className={classes['container']}>
         <Console/>
      </main>
    </Fragment>
  )
}
