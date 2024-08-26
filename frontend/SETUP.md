# Material UI Setup

## Step 1:

From the root directory of the `trackrunner` project, navigate to the `frontend` directory:

```bash
cd frontend
```

## Step 2: Install Material-UI Core and Emotion Libraries

Run the following command in your terminal to install the core Material-UI package along with its peer dependencies:

```bash
npm install @mui/material @emotion/react @emotion/styled
```
Note: @emotion/react and @emotion/styled are required for styling in MUI. 


## Step 3:

Then install the material-ui icons library by running the command: 
```bash
npm install @mui/icons-material
```

# Step 4:

You can now utilize material-ui components and icons within the project, example:

```sh
import { Button } from '@mui/material';
import { Email } from '@mui/icons-material';

const MyComponent = () => (
    <Button
        variant="contained"
        startIcon={<Email />}
    >
        Send Email
    </Button>
);
```


## Additional Information

-- Regarding Testing and Development:

 - Ensure that you have the necessary dependencies installed before running or testing the application.

 - If you pull a new version of the project from the repository and see missing modules, run: 

```bash 
npm install
```


- To start the local development server with live refreshes, navigate to the frontend directory and run:
```bash
npm start
```