import { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import MonoConnect from '@mono.co/connect.js';
import { useMutation, useQueryClient } from 'react-query';
import API from 'api';


function LinkAccount() {
    const queryClient = useQueryClient();

    const verifyAccountMutation = useMutation((code) => {
        return API.post('/account/verify-authorization-token', { code })
    }, {
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries('accounts');
            alert("account linked");
        },
        onError: (error) => {
            alert(error?.message);
        }
    });

    const monoConnect = useMemo(() => {
        const monoInstance = new MonoConnect({
            key: process.env.REACT_APP_MONO_PUBLIC_KEY,
            onSuccess: function(response) {
                verifyAccountMutation.mutate(response.code);
            }
        })

        monoInstance.setup();

        return monoInstance
    }, [verifyAccountMutation]);

    return (
        <Box>
            <Button variant="contained" onClick={() => monoConnect.open()}>
                { verifyAccountMutation.isLoading ? 'Linking Account...' : 'Link Account' }
            </Button>
        </Box>
    )
}

export default LinkAccount;