import React from 'react';
import API from 'api';
import { useQuery } from 'react-query';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useSnackbar } from 'contexts/snackbar';
import AppLayout from 'layouts/AppLayout';
import useLinkAccount from 'hooks/useLinkAccount';
import { currencyFormatter } from 'utilities';

import Account from './Account';

function Home() {
  const snackbar = useSnackbar();
  const { linkAccount } = useLinkAccount();

  const {
    data: accounts,
    isLoading: isFetchingAccounts,
    isSuccess: hasFetchedAccounts,
  } = useQuery('accounts', () => API.get('accounts'), {
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

  const { data: recentTransactions, isLoading: isFetchingAccountTransactions } =
    useQuery(
      ['Transactions', accountId],
      () => API.get(`accounts/${accountId}/transactions`),
      {
        select: ({ data }) => data.slice(0, 10),
        enabled: !!accounts?.length,
      }
    );

  console.log(recentTransactions);

  return (
    <AppLayout>
      <Box>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          mb={3}
        >
          <Box
            sx={{
              height: '300px',
              backgroundColor: 'white',
              borderRadius: '15px',
              mr: '40px',
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
          <Box>
            {isFetchingAccounts && (
              <Box textAlign="center" width={450} margin="100px auto">
                <CircularProgress />
                <Typography mt={2}>Fetching accounts</Typography>
              </Box>
            )}

            {hasFetchedAccounts && (
              <Box mb={3}>
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
                    <Box mb={3} sx={{ display: 'flex' }}>
                      {accounts.map((account: any) => (
                        <Account
                          key={account.institution.bankCode}
                          account={account}
                        />
                      ))}
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Box
                        sx={{
                          height: 'auto',
                          backgroundColor: 'white',
                          borderRadius: '15px',
                          mr: '40px',
                          padding: '20px 40px',
                        }}
                        width={7 / 12}
                      >
                        <Box display="flex">
                          <Typography fontWeight={700} color="#020100">
                            Latest transactions
                          </Typography>
                        </Box>

                        <Box mt={5}>
                          {recentTransactions?.map(
                            ({
                              _id,
                              narration,
                              currency,
                              amount,
                              type,
                            }: any) => (
                              <Box
                                key={_id}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                mb={3}
                              >
                                <Box width={3 / 12}>
                                  <Typography fontWeight={700}>Date</Typography>
                                </Box>
                                <Box width={6 / 12}>
                                  <Typography
                                    sx={{
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      textTransform: 'capitalizie',
                                    }}
                                  >
                                    {narration.toLowerCase()}
                                  </Typography>
                                </Box>
                                <Box
                                  width={3 / 12}
                                  display="flex"
                                  justifyContent="flex-end"
                                >
                                  <Typography
                                    fontWeight={700}
                                    color={type === 'credit' ? 'green' : 'red'}
                                  >
                                    {`${type === 'credit' ? '+ ' : '- '}`}
                                    {`${currencyFormatter(amount)} ${currency}`}
                                  </Typography>
                                </Box>
                              </Box>
                            )
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          height: '300px',
                          backgroundColor: 'white',
                          borderRadius: '15px',
                          padding: '20px',
                        }}
                        width={5 / 12}
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
      </Box>
    </AppLayout>
  );
}

export default Home;
