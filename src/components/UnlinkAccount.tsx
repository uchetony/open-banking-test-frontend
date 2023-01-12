import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import API from "api";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Thrash } from "./icons";

function UnlinkAccount({ account }: { account: any }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const unlinkAccountMutation = useMutation(() => {
        return API.post(`/accounts/${account.id}/unlink`)
    }, {
        onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries('accounts');
            alert("Account unlinked successfully")
        },
        onError: (error: { message: string }) => {
            alert(error.message)
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
                <DialogActions sx={{ height:"60px" }}>
                    <Button variant="contained" onClick={() => setOpen(false)} sx={{ width: "60px", height: "100%", backgroundColor: "grey" }}>No</Button>
                    <Button variant="contained" onClick={() => unlinkAccountMutation.mutate()} sx={{ width: "60px", height: "100%", backgroundColor: "red" }}>
                        { unlinkAccountMutation.isLoading ? <CircularProgress size={16} /> : 'Yes' }
                    </Button>
                </DialogActions>
            </Dialog>
        </>   
    )
}

export default UnlinkAccount;