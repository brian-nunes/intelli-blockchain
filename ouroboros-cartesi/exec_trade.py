from os import environ
import traceback
import logging
import requests
from eth_abi import encode_abi
from datetime import datetime, timedelta

logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]  # nosso contrato?
logger.info(f"HTTP rollup_server url is {rollup_server}")

EXEC_ORDER_FUNCTION = b'\xa9\x05\x9c\xbb'  # mudar


def str2hex(str):
    """
    Encode a string as an hex string
    """
    return "0x" + str.encode("utf-8").hex()


def reject_input(msg, payload):
    logger.error(msg)
    response = requests.post(rollup_server + "/report",
                             json={"payload": payload})
    logger.info(
        f"Received report status {response.status_code} body {response.content}")
    return "reject"


present_exec_time = None


def handle_advance(data):
    present_exec_time = datetime.fromtimestamp(data["metadata"]["timestamp"])
    if (last_exec_time != None or present_exec_time - last_exec_time < timedelta(hours=2)):
        return

    logger.info(f"Received advance request data {data}")

    try:
        def fin_calc():
            return ("25%", "25%", "25%", "25%")

        btc_pc, eth_pc, eos_pc, doge_pc = fin_calc()

        # Encode a function to exec the order in the dao contract
        order_payload = EXEC_ORDER_FUNCTION + \
            encode_abi(['ticket', 'operation', 'amount'],
                       [btc_pc, eth_pc, eos_pc, doge_pc])
        contract_address = 7
        voucher = {"address": contract_address,
                   "payload": "0x" + order_payload.hex()}
        logger.info(f"Issuing voucher {voucher}")
        response = requests.post(rollup_server + "/voucher", json=voucher)
        logger.info(
            f"Received voucher status {response.status_code} body {response.content}")

        return "accept"

    except Exception as e:
        return reject_input(f"Error processing data {data}\n{traceback.format_exc()}")


finish = {"status": "accept"}
rollup_address = None
last_exec_time = None

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]
        if "metadata" in data:
            metadata = data["metadata"]
            if metadata["epoch_index"] == 0 and metadata["input_index"] == 0:
                rollup_address = metadata["msg_sender"]
                logger.info(f"Captured rollup address: {rollup_address}")
                continue
        finish["status"] = handle_advance(rollup_request["data"])
