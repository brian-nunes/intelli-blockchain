import React from 'react'
import UserPage from './UserPage'
import PollsPage from './PollsPage'
import PollCard from './PollCard'

const IndexBody = () => {
    return (
        <div>
            <UserPage />
            <br></br>
            <PollsPage />
            <br></br>
            <PollCard />
        </div>
    )
}

export default IndexBody