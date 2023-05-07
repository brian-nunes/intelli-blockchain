import useMetaMask from "@/contexts/MetaMaskProvider";

const ConnectButton: React.FC = () => {
    const { isConnected, connect } = useMetaMask();

    if (!isConnected) {
        return (<button className='button' onClick={connect}>Conectar</button>)
    } else if (isConnected) {
        return (<button className='button'>Conectado</button>)
    } else {
        return (<></>)
    }
}

export default ConnectButton;