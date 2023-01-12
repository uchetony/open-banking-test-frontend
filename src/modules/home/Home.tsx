import { Box, Typography, CircularProgress } from '@mui/material';
import API from 'api';
import LinkAccount from 'components/LinkAccount';
import { useSnackbar } from 'contexts/snackbar';
import AppLayout from 'layouts/AppLayout';
import { useQuery } from 'react-query';
import Account from './Account';

function Home() {
	const snackbar = useSnackbar();

	const { data: accounts, isLoading } = useQuery('accounts', () => {
		return API.get('accounts');
	}, {
		select: ({ data }) => data,
		onError: () => {
			snackbar({
				status: "error",
				title: 'Could not retrieve accounts',
				message: 'Sorry we could not retrieve your accounts'
			});
		}
	});

	return (
		<AppLayout>
			<Box>
				<Box display="inline-block" width="100%">
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography fontSize={24} fontWeight={700}>Accounts</Typography>
						<LinkAccount />
					</Box>

					<Box sx={{ maxHeight: '500px', overflow: 'auto' }} mt={5}>
						{isLoading && (
							<Box sx={{ textAlign: "center", margin: "0 auto" }}>
								<CircularProgress />
								<Typography mt={2}>Fetching accounts</Typography>
							</Box>
						)}

						{!isLoading && (
							<Box>
								{!accounts?.length ? (
									<Box sx={{ display: "flex", justifyContent: 'center' }}>
										<Typography>
											No accounts
										</Typography>
									</Box>
								) : null}

								{accounts?.length ? (accounts.map((account: any) => (
									<Account key={account.institution.bankCode} account={account} />
								))) : null}
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</AppLayout>
	)
}

export default Home;