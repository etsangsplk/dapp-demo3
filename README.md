# dapp-demo3
Example dapp for storing your personal data like email, name and age.

## Features
On the left part of your screen you can see all users who updated their personal information (email, name and age). If you already updated your own information, your id should be highlighted with a distinct color.

On the right part of you screen you see fields to edit your personal email, name and age. By clicking `Update` button the data will be stored on the blockchain.

## Development
### How to setup dev environment

Seems that all you need is to setup and run the latest `testrpc` ethereum network emulator https://github.com/ethereumjs/testrpc

### Building and the frontend

1. First run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `npm run dev` to build the app and serve it on http://localhost:8080
