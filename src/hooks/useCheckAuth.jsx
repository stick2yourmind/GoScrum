import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setUserData } from '../store/slices/authSlice'
import { startLoading } from '../store/slices/tasksSlice'

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('user'))

    if (data) {
      dispatch(startLoading())
      dispatch(
        setUserData({
          userData: data.user,
          token: data.token,
          status: 'authenticated'
        })
      )
    }
  }, [])

  return {
    status
  }
}
