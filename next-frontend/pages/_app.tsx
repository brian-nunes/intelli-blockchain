import { MetaMaskProvider } from '@/contexts/MetaMaskProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (<MetaMaskProvider>
    <Component {...pageProps} />
  </MetaMaskProvider>)
}