// outlet will be used to put out whatever page the user is trying to go to if he is logged in and Navigate will take user to login or register page if he is not logged in as the private routes are restricted so that user must be logged in to go to that 
import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRoute = () => {
  const { userInfo } = useSelector((state)=>state.auth) //first we get the userInfo from the state
  return (
    userInfo? <Outlet/> : <Navigate to='/login' replace />
  )
}

export default PrivateRoute