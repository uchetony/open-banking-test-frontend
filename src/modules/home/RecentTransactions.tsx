import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatRelative } from 'date-fns';
import { currencyFormatter } from 'utilities';
import { Transaction } from 'types';

function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <Box
      sx={{
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '20px 40px',
      }}
    >
      <Box display="flex">
        <Typography fontWeight={700} color="#020100">
          Latest transactions
        </Typography>
      </Box>

      <Box mt={5}>
        {transactions?.map(
          ({ _id, narration, currency, amount, type, date }) => (
            <Box
              key={_id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Box width={4 / 12}>
                <Typography fontWeight={700}>
                  {formatRelative(new Date(date), new Date())}
                </Typography>
              </Box>
              <Box width={5 / 12}>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize',
                  }}
                >
                  {narration.toLowerCase()}
                </Typography>
              </Box>
              <Box width={3 / 12} display="flex" justifyContent="flex-end">
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
  );
}

export default RecentTransactions;
