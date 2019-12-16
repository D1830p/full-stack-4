import React from 'react'
import { Redirect } from 'react-router-dom'

const withLoggedInState = Component => {
  return function NewComponent({ isLoggedIn, ...props }) {
    return (
      <div>
        {!isLoggedIn && <Redirect to='/' />}
        <Component {...props} />
      </div>
    )
  }
}

export default withLoggedInState;
