import useMetaMask from "@/contexts/MetaMaskProvider";

const ConnectButton: React.FC = () => {
    const { isConnected, address, connect } = useMetaMask();

    if (!isConnected) {
        return (<button className='button' onClick={connect}>Conectar</button>)
    } else if (isConnected) {
        return (<>{address}</>)
    } else {
        return (<></>)
    }
}

export default ConnectButton;