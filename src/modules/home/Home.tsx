import styled from '@emotion/styled';
import { Alert, AlertTitle, Snackbar, Box, Typography, CircularProgress } from '@mui/material';
import API from 'api';
import { ArrowUp, DollarSign } from 'components/icons';
import LinkAccount from 'components/LinkAccount';
import UnlinkAccount from 'components/UnlinkAccount';
import AppLayout from 'layouts/AppLayout';
import { useQuery } from 'react-query';
import { currencyFormatter } from 'utilities';
import ArrowDown from '../../components/icons/ArrowDown';

const AccountCard = styled(Box)`
    width: 100%;
    padding: 20px;
    margin-bottom: 5px;
    display: flex;
`

const ACCOUNT_TYPE_MAP: Record<string, string> = {
    'personal_banking': 'Personal banking',
    'savings_account': 'Savings account'
}

function Home() {
    const { data: accounts, isError, isFetching } = useQuery('accounts', () => {
        return API.get('accounts');
    }, {
        select: ({ data }) => data
    });


    return (
        <AppLayout>
            <Box>
                <Snackbar 
                    open={isError}
                    autoHideDuration={6000} 
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert severity='error'>
                        <AlertTitle>Could not fetch accounts</AlertTitle>
                    </Alert>
                </Snackbar>

                <Box display="inline-block" width="100%">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography fontSize={24} fontWeight={700}>Accounts</Typography>
                        <LinkAccount />
                    </Box>


                    <Box sx={{ maxHeight: '500px', overflow: 'auto', display: "flex" }} mt={5}>
                        {isFetching && (
                            <Box sx={{ textAlign: "center", margin: "0 auto" }}>
                                <CircularProgress />
                                <Typography mt={2}>Fetching accounts</Typography>
                            </Box>
                        )}

                        <Box>
                            {(!isFetching && accounts) ? accounts.map((account: any) => (
                                <AccountCard key={account.institution.bankCode}>
                                    <Box sx={{ width:"50px", bgcolor:"black", borderRadius:"5px", display:"flex", alignItems:"center", justifyContent:"center" }} mr={5}>
                                        <DollarSign color='white' size={16} />
                                    </Box>
                                    <Box mr={10} sx={{ width: "200px" }}>
                                        <Typography fontWeight={700} fontSize={16}>{account.institution.name}</Typography>
                                        <Typography variant='body2' color="grey">{ACCOUNT_TYPE_MAP[String(account.institution.type).toLowerCase()]}</Typography>
                                    </Box>
                                    <Box mr={10} sx={{ width: "200px" }}>
                                        <Typography fontSize={16}>{account.accountNumber}</Typography>
                                        <Typography variant='body2' color="grey">{ACCOUNT_TYPE_MAP[String(account.type).toLowerCase()]}</Typography>
                                    </Box>
                                    <Box mr={10} sx={{ width: "200px" }}>
                                        <Typography fontWeight={700} fontSize={16}>{currencyFormatter(account.currency, account.balance)}</Typography>
                                    </Box>
                                    <Box display="flex">
                                        <Box mr={2} sx={{ cursor:"pointer" }}>
                                            <UnlinkAccount account={account} />
                                        </Box>
                                        <Box>
                                            <ArrowDown color='green' size={16} />
                                            <ArrowUp color='red' size={16} />
                                        </Box>
                                    </Box>
                                </AccountCard>
                            )) : null}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppLayout>
    )
}

export default Home;