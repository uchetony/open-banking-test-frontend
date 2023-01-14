import styled from "@emotion/styled";
import { Alert, AlertColor, AlertTitle, Snackbar, Box } from "@mui/material";
import { nanoid } from "nanoid";
import { useState, createContext, useContext } from "react";

type SnackbarDetails = {
  message: string;
  title?: string;
  status: AlertColor;
};

type SnackbarDetailsWithId = SnackbarDetails & { id: string };

type HandleDisplaySnackbar = (snackbarDetails: SnackbarDetails) => void;

const SnackbarContext = createContext<HandleDisplaySnackbar | undefined>(undefined);

const SnackbarContainer = styled(Box)`
  position: fixed;
  z-index: 999;
  top: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledSnackbar = styled(Snackbar)`
  position: relative;
  margin-bottom: 10px;
`

function SnackbarProvider({ children }: { children: JSX.Element }) {
  const [allSnackbarDetails, setAllSnackbarDetails] = useState<SnackbarDetailsWithId[]>([]);

  const handleDisplaySnackbar = (snackbarDetails: SnackbarDetails) => {
    setAllSnackbarDetails([
      ...allSnackbarDetails,
      {
        ...snackbarDetails,
        id: nanoid(),
      }
    ])
  };

  return (
    <SnackbarContext.Provider value={handleDisplaySnackbar}>
      <SnackbarContainer>
        {allSnackbarDetails.map((snackbarDetails) => (
          <StyledSnackbar
            key={snackbarDetails.id}
            open={!!snackbarDetails.message}
            autoHideDuration={6000}
            onClose={(_, reason) => {
              if (reason === 'clickaway') return;
              setAllSnackbarDetails((allSnackbarDetails) => {
                return allSnackbarDetails.filter(({ id }) => id !== snackbarDetails.id)
              });
            }}
          >
            <Alert severity={snackbarDetails?.status}>
              { snackbarDetails?.title ? <AlertTitle>{snackbarDetails.title}</AlertTitle> : null }
              { snackbarDetails?.message }
            </Alert>
          </StyledSnackbar>
        ))}
      </SnackbarContainer>
      {children}
    </SnackbarContext.Provider>
  )
}

function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (context == null) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }

  return context;
}

export { SnackbarProvider, useSnackbar }