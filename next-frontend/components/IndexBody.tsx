import React from 'react'
import UserPage from './UserPage'
import PollsPage from './PollsPage'
import PollCard from './PollCard'
import NavBar from './NavBar'
import BaseLayout from './BaseLayout'

const IndexBody = () => {
    return (
        <div>
            <NavBar />
            <BaseLayout>
                <div>
                    <UserPage />
                    <br></br>
                    <PollsPage />
                    <br></br>
                    <PollCard />
                </div>
            </BaseLayout>
        </div>
    )
}

export default IndexBody