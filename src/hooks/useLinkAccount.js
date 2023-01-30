import { useMemo } from 'react';
import MonoConnect from '@mono.co/connect.js';
import { useSnackbar } from 'contexts/snackbar';
import { useMutation, useQueryClient } from 'react-query';
import API from 'api';

function useLinkAccount() {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const verifyAccountMutation = useMutation(
    (code) => {
      return API.post('/account/verify-authorization-token', { code });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('accounts');
        snackbar({
          status: 'success',
          title: 'Account Linked',
          message: 'Your account has been linked successfully',
        });
      },
      onError: (error) => {
        snackbar({
          status: 'error',
          title: 'Could not link account',
          message: error.message || 'Sorry we could link your account',
        });
      },
    }
  );

  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      key: process.env.REACT_APP_MONO_PUBLIC_KEY,
      onSuccess: function ({ code }) {
        verifyAccountMutation.mutate(code);
      },
    });

    monoInstance.setup();

    return monoInstance;
  }, [verifyAccountMutation]);

  const linkAccount = () => monoConnect.open();

  return {
    linkAccount,
    verifyAccountMutation,
  };
}

export default useLinkAccount;
