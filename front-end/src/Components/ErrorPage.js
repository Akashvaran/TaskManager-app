import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <>
    <div>ErrorPage</div>
   <Link to={'/getAllTask'}><button>back</button></Link>
    </>
  )
}
