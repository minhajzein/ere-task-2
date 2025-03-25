import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const steps = [1, 2, 3]

function App() {
	const [step, setStep] = useState(steps[0])
	const [onReview, setOnReview] = useState(false)

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.min(3, 'first name must be at least 3 characters')
				.required('first name is a required field'),
			lastName: Yup.string()
				.min(3, 'last name must be at least 3 characters')
				.required('last name is a required field'),
			email: Yup.string()
				.email()
				.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address')
				.required(),
			password: Yup.string()
				.matches(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
					'Minimum eight characters, at least one letter, one number and one special character'
				)
				.required(),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password')], 'Password must be same')
				.required('Please confirm your password'),
		}),
		onSubmit: () => {},
	})

	const handleNextStep = () => {
		if (step === 1) {
			if (
				!formik.errors.firstName &&
				formik.values.firstName !== '' &&
				!formik.errors.lastName &&
				formik.values.lastName !== ''
			) {
				setStep(2)
			} else return
		} else if (step === 2) {
			if (!formik.errors.email && formik.values.email !== '') {
				setStep(3)
			} else return
		} else if (step === 3) {
			setOnReview(true)
		}
	}
	console.log(step, onReview)

	return (
		<div className='p-5 bg-gray-200 w-full h-dvh flex'>
			<form
				onSubmit={formik.handleSubmit}
				className='m-auto max-w-lg min-w-lg bg-white p-5 rounded gap-3 flex flex-col'
			>
				<h1>Enter your details and continue</h1>
				<div className='grid grid-cols-3 bg-gray-300 rounded-md p-1 shadow'>
					{steps.map(stp => (
						<div
							key={stp}
							className={`flex justify-center p-1 rounded ${
								step == stp && 'bg-white'
							}`}
						>
							{stp}
						</div>
					))}
				</div>
				{step === 1 && (
					<>
						<div className='flex flex-col'>
							<label htmlFor='firstName'>First Name</label>
							<input
								className='border outline-none p-2 text-sm rounded-lg'
								type='text'
								name='firstName'
								id='firstName'
								placeholder='Enter your first name'
								value={formik.values.firstName}
								onChange={formik.handleChange}
							/>
							<p className='text-xs text-red-500'>{formik.errors.firstName}</p>
						</div>
						<div className='flex flex-col'>
							<label htmlFor='lastName'>Last Name</label>
							<input
								className='border outline-none p-2 text-sm rounded-lg'
								type='text'
								name='lastName'
								id='lastName'
								placeholder='Enter your first name'
								value={formik.values.lastName}
								onChange={formik.handleChange}
							/>
							<p className='text-xs text-red-500'>{formik.errors.lastName}</p>
						</div>
					</>
				)}
				{step === 2 && (
					<div className='flex flex-col'>
						<label htmlFor='email'>Email</label>
						<input
							className='border outline-none p-2 text-sm rounded-lg'
							type='text'
							name='email'
							id='email'
							placeholder='Enter your first name'
							value={formik.values.email}
							onChange={formik.handleChange}
						/>
						<p className='text-xs text-red-500'>{formik.errors.email}</p>
					</div>
				)}
				{step === 3 && (
					<>
						<div className='flex flex-col'>
							<label htmlFor='password'>Password</label>
							<input
								className='border outline-none p-2 text-sm rounded-lg'
								type='password'
								name='password'
								id='password'
								placeholder='Enter your first name'
								value={formik.values.password}
								onChange={formik.handleChange}
							/>
							<p className='text-xs text-red-500'>{formik.errors.password}</p>
						</div>
						<div className='flex flex-col'>
							<label htmlFor='confirmPassword'>Re-enter Password</label>
							<input
								className='border outline-none p-2 text-sm rounded-lg'
								type='password'
								name='confirmPassword'
								id='confirmPassword'
								placeholder='Enter your first name'
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
							/>
							<p className='text-xs text-red-500'>
								{formik.errors.confirmPassword}
							</p>
						</div>
					</>
				)}
				<div className='w-full flex justify-end'>
					<button
						type={onReview ? 'submit' : 'button'}
						onClick={onReview ? formik.handleSubmit : handleNextStep}
						className='bg-blue-500 cursor-pointer text-white px-4 rounded-lg py-1'
					>
						Next
					</button>
				</div>
			</form>
		</div>
	)
}

export default App
