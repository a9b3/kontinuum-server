# kontinuum

Express server that handles deployment to a kubernetes cluster. Run this on a node that has kubectl cli already configured.

## Setup

Create .secrets file in project root 

## API

#### POST `/deploy`
require multipart/form-data

-F data=@[kubernetes yaml file