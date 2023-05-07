from tensorflow.keras.models import Sequential, model_from_json
import numpy as np
import json

def normalize_dict(d):
    total = sum(d.values())
    if total == 0:
        return d
    return {k: v / total for k, v in d.items()}

if __name__ == '__main__':

    list_of_cryptos = ["EOS", "BTC", "ETH", "DOGE"]
    crypto_dict = {}
    for crypto in list_of_cryptos:
        json_file = open(f'model/model-{crypto}-USD.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        loaded_model = model_from_json(loaded_model_json)
        loaded_model.load_weights(f"model/model-{crypto}-USD.h5")

        print(loaded_model)

        x_pred = np.load(f'input/x-pred-{crypto}-USD.npy')

        pred = loaded_model.predict(x_pred)

        delta = (pred[-1] - pred[0])[0]
        if delta > 0:
            crypto_dict[crypto] = delta


    suggestions_dict = normalize_dict(crypto_dict)
    for crypto in list_of_cryptos:
        if crypto not in suggestions_dict:
            suggestions_dict[crypto] = 0
    print(suggestions_dict)
    with open("crypto-suggestions.txt", "w") as fp:
        json.dump(suggestions_dict, fp)