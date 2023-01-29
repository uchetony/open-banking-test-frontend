import React from 'react';
import { useQuery } from 'react-query';
import { Box, Typography, CircularProgress } from '@mui/material';
import API from 'api';
import useURLSearchParams from 'hooks/useURLSearchParams';
import AppLayout from 'layouts/AppLayout';
import { APISuccessResponse, Transaction } from 'types';

type FetchTransactionsPromise = Promise<APISuccessResponse<Transaction[]>>;

function TransactionsList() {
  const params = useURLSearchParams();
  const accountId = params.get('account');

  const {
    data: accountTransactions,
    isLoading: isFetchingAccountTransactions,
  } = useQuery(
    ['Transactions', accountId],
    (): FetchTransactionsPromise =>
      API.get(`accounts/${accountId}/transactions`),
    {
      select: (response) => response.data,
      enabled: !!accountId,
    }
  );

  return (
    <AppLayout>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize={24} fontWeight={700}>
            Transactions
          </Typography>
        </Box>

        {isFetchingAccountTransactions && (
          <Box sx={{ textAlign: 'center', margin: '0 auto' }}>
            <CircularProgress />
            <Typography mt={2}>Fetching transactions</Typography>
          </Box>
        )}

        {!isFetchingAccountTransactions && (
          <Box>
            {accountTransactions?.length ? (
              <Box>
                {accountTransactions.map((transaction) => (
                  <Box key={transaction._id}></Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>No transactions</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </AppLayout>
  );
}

export default TransactionsList;
