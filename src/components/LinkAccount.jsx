import { useMemo } from 'react';
import { Box } from '@mui/material';
import MonoConnect from '@mono.co/connect.js';
import { useMutation, useQueryClient } from 'react-query';
import { Plus } from 'components/icons';
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
        <Box 
            sx={{ width:"50px", height:"50px", bgcolor:"lightgrey", 
            borderRadius:"5px", display:"flex", alignItems:"center",
            justifyContent:"center", cursor:"pointer" }}
            onClick={() => monoConnect.open()}
        >
            <Plus color="black" />
        </Box>
    )
}

export default LinkAccount;