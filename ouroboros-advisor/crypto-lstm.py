import yfinance as yf
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy as np
import pandas as pd
from tensorflow import keras
from pandas.plotting import register_matplotlib_converters
import datetime as dt


def extract_crypto_history(crypto, csv_path):
    ticker = yf.Ticker(crypto)
    data = ticker.history(period="max", interval="1d")
    # Sort the dataframe according to the date
    data.sort_values('Date', inplace=True, ascending=True)
    data.to_csv(csv_path)
    return data

def create_dataset(X, y, time_steps=1):
    Xs, ys = [], []
    for i in range(len(X) - time_steps):
        v = X.iloc[i:(i + time_steps)]
        Xs.append(v)
        ys.append(y.iloc[i + time_steps])
    return np.array(Xs), np.array(ys)

def create_pred_dataset(X, time_steps=1):
    Xs = []
    for i in range(len(X) - time_steps):
        v = X[i:(i + time_steps)]
        Xs.append(v)
    return np.array(Xs)
    
def plot_price(data, price_path, shouldPlot = False):
    plt.figure(num=None, figsize=(7, 4), dpi=300, facecolor='w', edgecolor='k')
    days = mdates.drange(data.index.min(), data.index.max() + dt.timedelta(days=1), dt.timedelta(days=1))
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=200))
    if len(days) > len(data['Close']):
        plt.plot(days[:-1], data['Close'])
    elif len(days) < len(data['Close']):
        plt.plot(days, data['Close'].iloc[:-1])
    else:
        plt.plot(days, data['Close'])
    plt.gcf().autofmt_xdate()
    plt.tight_layout()
    plt.grid()
    plt.ylabel('Close Price in USD')
    plt.xlabel('Date')
    plt.tight_layout()
    plt.savefig(price_path, dpi=300)
    if(shouldPlot):
        plt.show()
    plt.cla()
    plt.clf()
    plt.close()

def plot_results(crypto, y_train, y_pred, trueFirstDate, pred_model_path, pred_model_zoom_path, shouldPlot = False):
    # Plotting the results
    plt.plot(np.arange(0, len(y_train)), y_train.flatten(), marker='.', markersize=1,
             label="true")
    plt.plot(np.arange(len(y_train), len(y_train) + len(y_pred)), y_pred.flatten(), 'r', marker='.', markersize=1,
             label="prediction")
    plt.plot(np.arange(0, len(y_train)), y_train.flatten(), 'g', marker='.', markersize=1, label="history")
    plt.ylabel('Close Price in USD')
    plt.xlabel('Days Since ' + trueFirstDate)
    leg = plt.legend()
    leg_lines = leg.get_lines()
    leg_texts = leg.get_texts()
    plt.setp(leg_lines, linewidth=1)
    plt.setp(leg_texts, fontsize='x-large')
    plt.savefig(pred_model_path, dpi=300)
    if crypto == "EOS-USD":
        plt.axis([1500, 1560, 1.5, 4.2])
        plt.savefig(pred_model_zoom_path, dpi=300)
    elif crypto == "BTC-USD":
        plt.axis([2620, 2750, 31000, 60000])
        plt.savefig(pred_model_zoom_path, dpi=300)
    elif crypto == "ETH-USD":
        plt.axis([1500, 1600, 2200, 4000])
        plt.savefig(pred_model_zoom_path, dpi=300)
    elif crypto == "DOGE-USD":
        plt.axis([1500, 1600, 0.09, 0.22])
        plt.savefig(pred_model_zoom_path, dpi=300)
    if(shouldPlot):
        plt.show()
    plt.cla()
    plt.clf()
    plt.close()

def plot_loss(history, training_loss_path, shouldPlot = False):
    plt.plot(history.history['loss'], label='train')
    plt.legend()
    plt.ylabel('Model Loss')
    plt.xlabel('Number of Epochs')
    plt.savefig(training_loss_path, dpi=300)
    if(shouldPlot):
        plt.show()
    plt.cla()
    plt.clf()
    plt.close()

def lstm(crypto):
    # crypto: "EOS-USD", "DOGE-USD","ETH-USD", and "BTC-USD"

    ################ Output Parameters Setup ################
    csv_path = f"data/{crypto}-yfinance-data.csv"
    pred_model_path = f"graphics/{crypto}/{crypto}-prediction-model.pdf"
    pred_model_zoom_path = f"graphics/{crypto}/{crypto}-prediction-model-zoomed.pdf"
    price_path = f"graphics/{crypto}/{crypto}-price.pdf"
    training_loss_path = f"graphics/{crypto}/{crypto}-training-loss.pdf"
    register_matplotlib_converters()
    pred_timespan = 30


    ####################### Data Prep #######################
    extract_crypto_history(crypto, csv_path)
    data = pd.read_csv(csv_path)
    data['Date'] = pd.to_datetime(data['Date'])
    data = data.set_index('Date')

    # Visualization of data. Plotting the price close.
    plot_price(data, price_path)

    # Getting the first date available
    firstDateFormatted = pd.to_datetime(data.index[0], utc=False)
    date_time_obj = firstDateFormatted.to_pydatetime()
    trueFirstDate = date_time_obj.strftime('%m/%d/%Y') # starting date

    # Get Close data
    train = data[['Close']].copy()

    train_max = train.max()
    train_min = train.min()

    # Normalize the dataframes
    train = (train - train_min) / (train_max - train_min)
    time_steps = 30

    x_train, y_train = create_dataset(train, train.Close, time_steps)
    x_pred = x_train[-1 * pred_timespan:]
    x_train = x_train[:len(x_train) - pred_timespan]
    y_train = y_train[:len(y_train) - pred_timespan]

    np.save(f'input/x-pred-{crypto}.npy', x_pred)


    ####################### Training  #######################
    model = keras.Sequential()
    model.add(keras.layers.LSTM(250, input_shape=(x_train.shape[1], x_train.shape[2])))
    model.add(keras.layers.Dropout(0.2))
    model.add(keras.layers.Dense(1))
    model.compile(loss='mae', optimizer='adam')
    model.summary()

    history = model.fit(
        x_train, y_train,
        epochs=100,
        batch_size=32,
        shuffle=False
    )

    # Plotting the loss
    plot_loss(history, training_loss_path)


    ###################### Prediction  ######################
    y_pred = model.predict(x_pred)

    # Rescale the data back to the original scale
    y_pred = y_pred * (train_max[0] - train_min[0]) + train_min[0]
    y_train = y_train * (train_max[0] - train_min[0]) + train_min[0]

    # Saving the model
    model_json = model.to_json()
    with open(f"model/model-{crypto}.json", "w") as json_file:
        json_file.write(model_json)
    # serialize weights to HDF5
    model.save_weights(f"model/model-{crypto}.h5")
    print("Saved model to disk")

    # Plotting the results
    plot_results(crypto, y_train, y_pred, trueFirstDate, pred_model_path, pred_model_zoom_path)
    
    return y_pred


if __name__ == '__main__':
    list_of_cryptos = ["EOS-USD", "BTC-USD", "ETH-USD", "DOGE-USD"]
    for crypto in list_of_cryptos:
        pred = lstm(crypto)