import * as React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AceEditor from 'react-ace';
import { codeBlock } from 'common-tags';
import 'brace/mode/python';
import 'brace/theme/github';

const getPythonCodeForQuery = (query: string):string => {
  return codeBlock`
    from graphqlclient import GraphQLClient
    client = GraphQLClient('https://api.labelbox.io/graphql')
    client.inject_token('Bearer <JWT_HERE>')

    data = client.execute('''
      ${query}
    ''')

    print(data)
  `;
}


export function GetQueryAsPython({ onClose, query }: {query: string; onClose: () => void}){
  return (
    <Dialog
      open={true}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Query in Python</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div> First install the GraphqlQLClient library </div>
          <AceEditor
            theme="github"
            value="pip install graphqlclient"
            height="30px"
          />

          <div style={{marginTop: '30px'}}>
            Then you can send this query through python with the below code.
          </div>
          <AceEditor
            mode="python"
            theme="github"
            value={getPythonCodeForQuery(query)}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary" autoFocus>Close</Button>
      </DialogActions>
    </Dialog>
  );
}