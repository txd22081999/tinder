import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'

import User from '../../components/User'
import { getUsers } from '../../services'
import { getAge } from '../../utils'

import './Screen.scss'

const imgSrcList = [
  'https://thoughtcatalog.com/wp-content/uploads/2018/05/questionstoaskagirl2.jpg?w=1920&h=1280&crop=1&resize=1920,1280&quality=95&strip=all',
  'https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7L4SiMA74nneLxL_cTOrz5g3LGAzBT2t5bA&usqp=CAU',
]

// const userList = [
//   {
//     name: "Lynk",
//     picture: imgSrcList[0],
//   },
//   {
//     name: "Kylie",
//     picture: imgSrcList[1],
//   },
//   {
//     name: "Jean",
//     picture: imgSrcList[2],
//   },
// ];

const shuffleArray = (input) => {
  let array = [...input]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const limit = 5
const APP_ID = '604ca2a2796d96334fb041bf'
const DEBOUNCE_TIME = 2000

const Screen = () => {
  const [current, setCurrent] = useState(0)
  const [userList, setUserList] = useState([])
  const [user, setUser] = useState(userList[current])
  const [action, setAction] = useState({ like: false, dislike: false })
  const [actionCount, setActionCount] = useState({
    likeCount: 0,
    dislikeCount: 0,
  })

  const getUsers = async () => {
    const res = await fetch(
      `https://dummyapi.io/data/api/user?limit=${limit}`,
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

  useEffect(() => {
    getUsers()
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

  useEffect(() => {
    if (current < limit) return

    console.log('MAX', current)
    setCurrent(0)
  }, [current])

  const changeUser = () => {
    setCurrent((prev) => prev + 1)
  }

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  const resetAction = () => {
    setAction({ like: false, dislike: false })
  }

  const handleAction = (type) => {
    if (type === 'like') {
      setAction({ like: true, dislike: false })
      setTimeout(() => {
        resetAction()
      }, DEBOUNCE_TIME)
    }
    if (type === 'dislike') {
      setAction({ like: false, dislike: true })
      setTimeout(() => {
        resetAction()
      }, DEBOUNCE_TIME)
    }
  }

  console.log('render')

  return (
    <div className="screen">
      {userList.map((userInfo) => {
        return (
          <TinderCard
            onSwipe={onSwipe}
            // onCardLeftScreen={() => changeUser()}
            onCardLeftScreen={() => {
              setUser({})
              setCurrent((prevCurrent) => prevCurrent + 1)
              setUserList((prevList) => prevList.slice(0, prevList.length - 1))
            }}
            preventSwipe={['up', 'down']}
            className="card"
            key={userInfo.id}
          >
            <User
              imgSrc={userInfo.picture}
              // changeUser={changeUser}
              // age={getAge(user?.dateOfBirth)}
              user={user}
              action={action}
              actionCount={actionCount}
            />
          </TinderCard>
        )
      })}

      <div className="action">
        <div className="icon dislike" onClick={() => handleAction('dislike')}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div className="icon like" onClick={() => handleAction('like')}>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    // <div className="screen">
    //   Screen
    //   <User imgSrc={imgSrc} changeUser={changeUser} />
    // </div>
  )
}

export default Screen
