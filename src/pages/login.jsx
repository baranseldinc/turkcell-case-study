import { Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Login = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
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
        if (data?.access_token) {
          localStorage.setItem('token', data.access_token)
          navigate('list')
        }
      } catch (err) {
        setError(err)
      }
    })()
  }, [])

  if (error) {
    return <div>{error.status} during login</div>
  }

  // There is no need to implement a Login page as we only get a token
  return <Skeleton />
}
