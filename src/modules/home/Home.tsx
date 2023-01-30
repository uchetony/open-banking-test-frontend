import React from 'react';
import API from 'api';
import { useQuery } from 'react-query';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useSnackbar } from 'contexts/snackbar';
import AppLayout from 'layouts/AppLayout';
import useLinkAccount from 'hooks/useLinkAccount';
import { APISuccessResponse, Transaction, Account } from 'types';
import { PlusCircle } from 'components/icons';

import AccountCard from './Account';
import RecentTransactions from './RecentTransactions';

type FetchAccountsPromise = Promise<APISuccessResponse<Account[]>>;

type FetchTransactionsPromise = Promise<APISuccessResponse<Transaction[]>>;

function Home() {
  const snackbar = useSnackbar();
  const { linkAccount, verifyAccountMutation } = useLinkAccount();

  const {
    data: accounts,
    isLoading: isFetchingAccounts,
    isSuccess: hasFetchedAccounts,
  } = useQuery('accounts', (): FetchAccountsPromise => API.get('accounts'), {
    select: ({ data }) => data,
    onError: () => {
      snackbar({
        status: 'error',
        title: 'Could not retrieve accounts',
        message: 'Sorry we could not retrieve your accounts',
      });
    },
  });

  const accountId = accounts ? accounts[0]?.id : '';

  const { data: recentTransactions } = useQuery(
    ['Transactions', accountId],
    (): FetchTransactionsPromise =>
      API.get(`accounts/${accountId}/transactions`),
    {
      select: ({ data }) => data.slice(0, 10),
      enabled: !!accounts?.length,
    }
  );

  return (
    <AppLayout>
      <Box>
        {/* <Box
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          mb={3}
          gap={3}
        >
          <Box
            sx={{
              height: '300px',
              backgroundColor: 'white',
              borderRadius: '15px',
            }}
            width={7 / 12}
          ></Box>
          <Box
            sx={{
              height: '300px',
              backgroundColor: '#020100',
              borderRadius: '15px',
            }}
            width={5 / 12}
          ></Box>
        </Box> */}

        <Box>
          {isFetchingAccounts && (
            <Box textAlign="center" width={450} margin="100px auto">
              <CircularProgress />
              <Typography mt={2}>Fetching accounts</Typography>
            </Box>
          )}

          {hasFetchedAccounts && (
            <Box>
              {!accounts?.length ? (
                <Box textAlign="center" width={450} margin="100px auto">
                  <Typography fontSize={30}>No accounts linked</Typography>
                  <Typography mb={2} color="#525c7a">
                    You can link all your personal and investment accounts to
                    monitor your cash flow and net worth.
                  </Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{ padding: '10px 20px', backgroundColor: 'black' }}
                    onClick={() => linkAccount()}
                  >
                    Link account
                  </Button>
                </Box>
              ) : null}

              {accounts?.length ? (
                <Box>
                  <Box
                    mb={3}
                    sx={{ display: 'flex', flexWrap: 'wrap' }}
                    rowGap={3}
                  >
                    {accounts.map((account, index) => (
                      <Box
                        key={account.institution.bankCode}
                        width={3 / 12}
                        pr={(index + 1) % 4 !== 0 ? 3 : 0}
                      >
                        <AccountCard account={account} />
                      </Box>
                    ))}

                    <Box
                      width={3 / 12}
                      pr={(accounts.length + 1) % 4 !== 0 ? 3 : 0}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          height: '150px',
                          bgcolor: 'white',
                          borderRadius: '15px',
                        }}
                      >
                        <Box textAlign="center" onClick={() => linkAccount()}>
                          {verifyAccountMutation.isLoading ? (
                            <CircularProgress />
                          ) : (
                            <Box>
                              <PlusCircle size={24} color="#525c7a" />
                              <Typography color="#525c7a">
                                Link account
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="space-between" gap={3}>
                    <Box width={8 / 12}>
                      <RecentTransactions
                        transactions={recentTransactions as Transaction[]}
                      />
                    </Box>
                    <Box
                      sx={{
                        height: '300px',
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        padding: '20px',
                      }}
                      width={4 / 12}
                    >
                      <Box display="flex">
                        <Typography fontWeight={700} color="#020100">
                          All expenses
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          )}
        </Box>
      </Box>
    </AppLayout>
  );
}

export default Home;
