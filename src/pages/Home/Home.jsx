import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'

import User from '../../components/User'
import { LIKE, DISLIKE, LIMIT, DEBOUNCE_TIME, APP_ID } from '../../constants'

import './Home.scss'

const Home = () => {
  const [userList, setUserList] = useState([])
  const [user, setUser] = useState(userList[0] || {})
  const [action, setAction] = useState({ like: false, dislike: false })
  const [actionCount, setActionCount] = useState({
    likeCount: 0,
    dislikeCount: 0,
  })
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    getUsers()
    resetAction()
  }, [])

  useEffect(() => {
    const userId = userList[userList.length - 1]?.id
    if (userId) {
      getUser(userId)
    }
    if (userList.length === 0) {
      getUsers()
    }
  }, [userList])

  useEffect(() => {
    const { like, dislike } = action
    if (like) {
      setActionCount({ likeCount: 1, dislikeCount: 0 })
    } else if (dislike) {
      setActionCount({ likeCount: 0, dislikeCount: 1 })
    } else {
      setActionCount({ likeCount: 0, dislikeCount: 0 })
    }
  }, [action])

  const getUsers = async () => {
    const res = await fetch(
      `https://dummyapi.io/data/api/user?limit=${LIMIT}`,
      {
        headers: {
          'app-id': APP_ID,
        },
      }
    )
    const { data = [] } = await res.json()
    setUserList(data)
  }

  const getUser = async (userId) => {
    const res = await fetch(`https://dummyapi.io/data/api/user/${userId}`, {
      headers: {
        'app-id': '60349db146ff8b0837d18351',
      },
    })
    const data = await res.json()
    setUser(data)
  }

  const onSwipe = (direction) => {
    switch (direction) {
      case 'left': {
        handleAction({ type: DISLIKE })
        break
      }
      case 'right': {
        handleAction({ type: LIKE })
        break
      }
      default:
        break
    }
  }

  const onCardLeftScreen = () => {
    resetAction()
    setUser({})
    setUserList((prevList) => prevList.slice(0, prevList.length - 1))
  }

  const resetAction = () => {
    setAction({ like: false, dislike: false })
  }

  const handleAction = ({ type, isAnimated = false }) => {
    if (type === LIKE) {
      console.log('You liked')
      setAction({ like: true, dislike: false })
    }
    if (type === DISLIKE) {
      console.log('You disliked')
      setAction({ like: false, dislike: true })
    }
    if (isAnimated) {
      setAnimate(true)
    }
    setTimeout(() => {
      setAnimate(false)
    }, DEBOUNCE_TIME)
  }

  return (
    <div className="home">
      {userList.map((userInfo) => {
        return (
          <TinderCard
            onSwipe={onSwipe}
            onCardLeftScreen={onCardLeftScreen}
            preventSwipe={['up', 'down']}
            className="card"
            key={userInfo.id}
          >
            <User
              imgSrc={userInfo.picture}
              user={user}
              action={action}
              actionCount={actionCount}
              animate={animate}
            />
          </TinderCard>
        )
      })}

      <div className="action">
        <div
          className="icon dislike"
          onClick={() => handleAction({ type: DISLIKE, isAnimated: true })}
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div
          className="icon like"
          onClick={() => handleAction({ type: LIKE, isAnimated: true })}
        >
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  )
}

export default Home
