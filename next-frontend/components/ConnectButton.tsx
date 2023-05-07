import useMetaMask from "@/contexts/MetaMaskProvider";
import Link from "next/link";

const ConnectButton: React.FC = () => {
    const { isConnected, address, connect } = useMetaMask();

    if (!isConnected) {
        return (<button className='light' onClick={connect}>Conectar</button>)
    } else if (isConnected) {
        return (<h1 style={{ ['color' as any] : 'white'}} >{address}</h1>)
    } else {
        return (<></>)
    }
}

export default ConnectButton;