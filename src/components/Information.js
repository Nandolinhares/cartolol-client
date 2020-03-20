import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if(props.errors) {
      enqueueSnackbar(props.errors, { variant: 'error' });
    } else {
      enqueueSnackbar(props.messages, { variant: 'success' })
    }
  };


  return (
    <div>
      {handleClick()}
    </div>
  );
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp errors={props.errors} messages={props.messages} />
    </SnackbarProvider>
  );
}


