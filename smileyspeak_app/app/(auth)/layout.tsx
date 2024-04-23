import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full h-[calc(100vh-136px)] flex justify-center items-center">
            {children}
        </main>
    )
}

export default AuthLayout