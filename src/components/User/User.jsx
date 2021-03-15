import React, { useRef } from 'react'
import { getAge } from '../../utils'
import clsx from 'clsx'

import './User.scss'

const LikeIcon = () => <i class="fa fa-heart" aria-hidden="true"></i>
const DislikeIcon = () => <i class="fa fa-times" aria-hidden="true"></i>

const User = (props) => {
  const {
    imgSrc = '',
    user = {},
    action = { like: false, dislike: false },
    actionCount = { likeCount: 0, dislikeCount: 0 },
    animate,
  } = props

  const userRef = useRef(null)
  const { firstName = '', lastName = '', dateOfBirth = '' } = user
  const Icon = () => (like ? <LikeIcon /> : <DislikeIcon />)

  const { like, dislike } = action
  const { likeCount, dislikeCount } = actionCount
  return (
    <div className="user" ref={userRef}>
      <div className="container">
        <img src={imgSrc} alt="user" />

        <div className="info">
          <div className="top">
            <span className="name">{`${firstName} ${lastName}`}</span>
            {dateOfBirth && (
              <div className="age">
                <span>{getAge(dateOfBirth)}</span>
                <i className="fa fa-birthday-cake" aria-hidden="true"></i>
              </div>
            )}
          </div>
        </div>

        <div className="action-info">
          <div className="action-count">
            <LikeIcon />
            <span className="number">{likeCount}</span>
          </div>
          <div className="action-count">
            <DislikeIcon />
            <span className="number">{dislikeCount}</span>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'icon',
          animate && like && 'like',
          animate && dislike && 'dislike'
        )}
      >
        <div className="icon--big">
          <Icon />
        </div>

        <div className="icon--big">
          <Icon />
        </div>

        <div className="icon--big">
          <Icon />
        </div>
      </div>
    </div>
  )
}

export default User
