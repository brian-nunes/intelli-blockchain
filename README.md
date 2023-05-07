# BorosDAO 

This project is a decentralized governance system built on Ethereum using the Ethers.js library and the Next.js frontend framework. Users can create, vote on, and manage polls in a decentralized manner.

## Overview

### Smart Contracts

- `Governance.sol`: The main smart contract for the governance system, including poll creation, voting, and management.
- `GovernanceToken.sol`: The ERC20 token used for voting in the governance system.

### Frontend (Next.js)

- `components`: Contains all the React components used in the frontend, such as buttons, navigation, and individual pages.
- `contexts`: Contains the MetaMask provider context for managing state.
- `pages`: Contains the main pages of the application, including poll-related pages, user pages, and the main application wrapper.
- `public`: Contains static assets such as images and icons.
- `styles`: Contains global CSS styles for the application.

## Getting Started

First, install dependencies by navigating to the `next-frontend` directory and running `npm install`.

Next, update the `next-frontend/solidity_data.tsx` file with the deployed contract addresses and ABI.

Make sure you have a MetaMask wallet installed and connected to the appropriate network.

Finally, run the Next.js development server by navigating to the `next-frontend` directory and running `npm run dev`. Open your browser and navigate to `http://localhost:3000` to access the app.
