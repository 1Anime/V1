import Navbarcomponent from '@/components/navbar/Navbar'
import AuthPage from '@/components/auth/AuthPage'
import React from 'react'

function page() {
    return (
        <div>
            <Navbarcomponent home={false} />
            <AuthPage/>
        </div>
    )
}

export default page
