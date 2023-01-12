import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import API from "api";
import { useSnackbar } from "contexts/snackbar";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Thrash } from "./icons";

function UnlinkAccount({ account }: { account: any }) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();
	const snackbar = useSnackbar();

	const unlinkAccountMutation = useMutation(() => {
		return API.post(`/accounts/${account.id}/unlink`)
	}, {
		onSuccess: () => {
			queryClient.invalidateQueries('accounts');
			snackbar({
				status: "success",
				title: 'Account deleted',
				message: 'Your account has been deleted successfully'
			});
			setOpen(false);
		},
		onError: (error: { message: string }) => {
			snackbar({
				status: "error",
				title: 'Could not delete account',
				message: error.message || 'Sorry we could delete your account'
			});
		}
	})

	return (
		<>
			<Box onClick={() => setOpen(true)}>
				<Thrash size={16} />
			</Box>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Delete this account?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						By deleting this account (<b>{account.accountNumber} {account.institution.name}</b>), it will no longer be linked and you will not be able to see your transactions until you link it again.
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ height: "60px" }}>
					<Button variant="contained" onClick={() => setOpen(false)} sx={{ width: "60px", height: "100%", backgroundColor: "grey" }}>No</Button>
					<Button variant="contained" onClick={() => unlinkAccountMutation.mutate()} sx={{ width: "60px", height: "100%", backgroundColor: "red" }}>
						{unlinkAccountMutation.isLoading ? <CircularProgress size={16} /> : 'Yes'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default UnlinkAccount;