import styled from '@emotion/styled';
import { TextField, Box, Typography, Button } from '@mui/material';
import { FormEvent, useState } from 'react';

const AuthLayout = styled(Box)`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`

const FormContainer = styled(Box)`
	height: auto;
	width: 450px;
	padding: 20px;
`

function Login() {
	const [formState, setFormState] = useState({
		email: '',
		password: ''
	})

	const handleInputChange = (name: string, value: string) => {
		setFormState({ ...formState, [name]: value })
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	}

	return (
		<AuthLayout>
			<FormContainer>
				<form onSubmit={handleSubmit}>
					<Box mb={5}>
						<Typography variant='h3' gutterBottom>
							Login
						</Typography>
					</Box>
					<Box mb={5}>
						<TextField 
							value={formState.email} 
							variant='outlined'
							label="Email"
							fullWidth
							type="email"
							onChange={({ target }) => handleInputChange('email', target.value)}
						/>
					</Box>
					<Box mb={5}>
						<TextField 
							value={formState.password} 
							variant='outlined' label="Password" 
							fullWidth 
							type="password"
							onChange={({ target }) => handleInputChange('password', target.value)}
						/>
					</Box>
					<Box>
						<Button variant='contained' disableElevation color='success' type='submit'>
							Submit
						</Button>
					</Box>
				</form>
			</FormContainer>
		</AuthLayout>
	)
}

export default Login;