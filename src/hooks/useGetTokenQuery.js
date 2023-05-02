import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useGetTokenQuery = () => {
  const [token, setToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [isSuccess, setIsSuccess] = useState(null)
  const [isFetching, setIsFetching] = useState(null)
  const [error, setError] = useState(null)
  const storedToken = useSelector((state) => state.identitySlice?.token)

  const fetchNewToken = useCallback(async () => {
    try {
      setIsFetching(true)
      const response = await fetch(
        'http://167.71.77.240:5200/gateway/IdentityServer/connect/token',
        {
          method: 'POST',
          body: new URLSearchParams({
            grant_type: 'password',
            client_id: 'DijitalDershaneWebUI',
            username: '12345678952',
            password: 'Yy123456*'
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            csrftoken: 'dd4534fgfgffgfg5dddddd53434534dfgfgfgfgfgfddd'
          }
        }
      )
      const data = await response.json()
      setIsSuccess(true)
      if (data?.access_token) {
        setToken(data.access_token)
      }
      if (data?.refresh_token) {
        setRefreshToken('token', data.refresh_token)
      }
    } catch (err) {
      setIsSuccess(false)
      setError(err)
    } finally {
      setIsFetching(false)
    }
  }, [])

  useEffect(() => {
    if (!storedToken) {
      fetchNewToken()
    } else {
      setToken(storedToken)
      setIsFetching(false)
      setIsSuccess(true)
    }
  }, [])

  return { token, refreshToken, isSuccess, isFetching, error }
}
