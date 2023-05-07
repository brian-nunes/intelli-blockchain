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

### Ouroboros Advisor
- `data`: Contains data extracted from the yfinance Python library for the crypto assets being analyzed.
- `graphics`: Contains output graphics from the training and prediction processes.
- `input`: Contains the data that will be input to the trained model for prediction.
- `model`: Contains the trained model files.
- `crypto-lstm.ipynb | crypto-lstm.py`: Pre-processes the data and trains an individual Neural Network (Long Short-Term Memory) for each crypto asset being analyzed.
- `predict-and-suggest.ipynb | predict-and-suggest.py`: Predicts prices for the next {pred_timespan} days and suggests asset distribution through the DAO
- This crypto assets advisor is based on the paper: Fleischer, J.P.; von Laszewski, G.; Theran, C.; Parra Bautista, Y.J. Time Series Analysis of Cryptocurrency Prices Using Long Short-Term Memory. Algorithms 2022, 15, 230. https://doi.org/10.3390/a15070230

## Getting Started

First, install dependencies by navigating to the `next-frontend` directory and running `npm install`.

Next, update the `next-frontend/solidity_data.tsx` file with the deployed contract addresses and ABI.

Make sure you have a MetaMask wallet installed and connected to the appropriate network.

Finally, run the Next.js development server by navigating to the `next-frontend` directory and running `npm run dev`. Open your browser and navigate to `http://localhost:3000` to access the app.

### Ouroboros Advisor
#### Prerequisites
- Python 3.6 or higher
- pip

#### Installing
To install the required packages, run the following command in your terminal:  
```pip install -r requirements.txt```

Running the Scripts
Once you've installed the required packages, you can run the LSTM model script by running:
```python crypto-lstm.py```  

This will train the LSTM model on the cryptocurrency data and save the model to disk.

Next, you can run the predict and suggest script by running:  
```python predict-and-suggest.py```

This will load the trained model from disk and use it to predict future cryptocurrency prices and make trading suggestions based on those predictions.

Alternatively, you can also run the Jupyter Notebook versions of these scripts by running:  
```jupyter notebook crypto-lstm.ipynb```  
and  
```jupyter notebook predict-and-suggest.ipynb```  
This will open the Jupyter Notebooks in your browser, where you can run each cell to execute the code.
You can also open the files on your preferred Jupyter Notebook editor.
