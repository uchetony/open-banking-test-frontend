import styled from '@emotion/styled';
import { TextField, Box, Typography, Button, Alert, AlertTitle, Snackbar } from '@mui/material';
import API, { updateApiAuthorization } from 'api';
import { useUser } from 'contexts/user';
import { FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

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
	});

	const [loginError, setLoginError] = useState({ open: false, message: '' });

	const history = useHistory();
	const [, setUser] = useUser();

	const handleInputChange = (name: string, value: string) => {
		setFormState({ ...formState, [name]: value })
	}

	const loginMutation = useMutation(() => {
		const payload = { email: formState.email, password: formState.password };
		return API.post('/login', payload);
	},
	{
		onSuccess: ({ data }) => {
			localStorage.setItem('open_banking_token', data.token);
			updateApiAuthorization(data.token);
			setUser(data.user);
			history.replace('/');
		},
		onError: (error: { message: string }) => {
			setLoginError({ open: true, message: error?.message });
		}
	})

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		loginMutation.mutate();
	}

	return (
		<AuthLayout>
			<Snackbar 
				open={loginError.open}
				autoHideDuration={6000} 
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				onClose={(_, reason) => {
					if (reason === 'clickaway') return;
					setLoginError({ open: false, message: '' });
				}}
			>
				<Alert severity='error'>
					<AlertTitle>Error</AlertTitle>
					{loginError.message}
				</Alert>
			</Snackbar>
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
						<Button 
							variant='contained' 
							disableElevation
							type='submit' 
							disabled={loginMutation.isLoading}
							sx={{ padding: '20px', backgroundColor: 'black' }}
							fullWidth
						>
							{loginMutation.isLoading ? 'Submit...' : 'Submit'}
						</Button>
					</Box>
				</form>
			</FormContainer>
		</AuthLayout>
	)
}

export default Login;