import styled from '@emotion/styled';
import { Alert, AlertTitle, Snackbar, Box } from '@mui/material';
import API from 'api';
import LinkAccount from 'components/LinkAccount';
import { useQuery } from 'react-query';

const AccountCard = styled(Box)`
    background-color: red;
    width: 350px;
    padding: 20px;
    border-radius: 5px;
    color: white;
    margin-bottom: 5px;
`

function Home() {
    const { data: accounts, isError, isFetching, isRefetching } = useQuery('accounts', () => {
        return API.get('accounts');
    }, {
        select: ({ data }) => data
    });


    return (
        <Box sx={{ padding: "0 20px" }}>
            <Snackbar 
				open={isError}
				autoHideDuration={6000} 
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert severity='error'>
					<AlertTitle>Could not fetch accounts</AlertTitle>
				</Alert>
			</Snackbar>

            <LinkAccount />

            <Box>
                <h1>Accounts</h1>

                { (isFetching || isRefetching) && <Box>Fetching accounts... </Box> }

                {(accounts||[]).map((account: any) => (
                    <AccountCard key={account.institution.bankCode}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Name:</p>
                            <p>{account.name}</p>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Account:</p>
                            <p>{`${account.accountNumber} ${account.institution.name}`}</p>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Balance:</p>
                            <p>{`NGN ${account.balance / 100}`}</p>
                        </Box>
                    </AccountCard>
                ))}
            </Box>
        </Box>
    )
}

export default Home;