import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {

    const user = useSelector(state => state.auth.user)

  return (
    <div>
      {user.name}
        <br />
      {user.email}
    </div>
  )
}

export default Profile
