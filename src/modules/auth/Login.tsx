import React, { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { TextField, Box, Typography, Button } from '@mui/material';
import API, { updateApiAuthorization } from 'api';
import { useSnackbar } from 'contexts/snackbar';
import { useUser } from 'contexts/user';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

const AuthLayout = styled(Box)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled(Box)`
  height: auto;
  width: 450px;
  padding: 20px;
`;

function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const snackbar = useSnackbar();

  const history = useHistory();
  const [, setUser] = useUser();

  const handleInputChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value });
  };

  const loginMutation = useMutation(
    () => {
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
        snackbar({
          status: 'error',
          title: 'Could not login',
          message: error?.message,
        });
      },
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <AuthLayout>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Box mb={5}>
            <Typography variant="h3" gutterBottom>
              Login
            </Typography>
          </Box>
          <Box mb={5}>
            <TextField
              value={formState.email}
              variant="outlined"
              label="Email"
              fullWidth
              type="email"
              onChange={({ target }) =>
                handleInputChange('email', target.value)
              }
            />
          </Box>
          <Box mb={5}>
            <TextField
              value={formState.password}
              variant="outlined"
              label="Password"
              fullWidth
              type="password"
              onChange={({ target }) =>
                handleInputChange('password', target.value)
              }
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              disableElevation
              type="submit"
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
  );
}

export default Login;
