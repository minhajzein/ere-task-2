import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function UserSummary() {
	const user = JSON.parse(localStorage.getItem('user'))
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('user')
		navigate('/sign-up')
	}

	return !user ? (
		<Navigate to='/sign-up' />
	) : (
		<div className='w-full h-dvh flex bg-gray-500'>
			<div className='m-auto p-10 rounded-lg bg-white flex flex-col gap-5'>
				<h1 className='capitalize'>
					{user.firstName} {user.lastName}
				</h1>
				<h1>{user.email}</h1>
				<button
					onClick={handleLogout}
					className='bg-red-500 cursor-pointer text-white p-1 rounded-lg shadow shadow-black'
				>
					Logout
				</button>
			</div>
		</div>
	)
}

export default UserSummary
