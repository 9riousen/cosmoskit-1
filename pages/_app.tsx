import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChainProvider } from '@cosmos-kit/react';
import { ChakraProvider } from '@chakra-ui/react';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as leapWallets } from '@cosmos-kit/leap';

import { SignerOptions } from '@cosmos-kit/core';
import { AssetList, Chain } from '@chain-registry/types'
import { defaultTheme } from '../config';
import '@interchain-ui/react/styles';

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    // signingStargate: () => {
    //   return getSigningCosmosClientOptions();
    // }
  };
  const ebonyChain: Chain = {
    chain_id: 'ebony-2',
    chain_name: 'ebony',
    status: 'live',
    network_type: 'testnet',
    pretty_name: 'Finschia Testnet',
    bech32_prefix: 'tlink',
    slip44: 438
  };

  const ebonyAssetList: AssetList = {
    chain_name: 'ebony',
    assets: [
      {
        denom_units: [
          {
            denom: 'tcony',
            exponent: 0
          },
          {
            denom: 'tfnsa',
            exponent: 6
          }
        ],
        base: 'tcony',
        name: 'Test FNSA',
        display: 'tfnsa',
        symbol: 'TFNSA',
        logo_URIs: {
          png: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4512.png'
        },
        coingecko_id: 'link'
      }
    ]
  }

  return (
    <ChakraProvider theme={defaultTheme}>
      <ChainProvider
        chains={[ebonyChain]}
        assetLists={[ebonyAssetList]}
        wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
            relayUrl: 'wss://relay.walletconnect.org',
            metadata: {
              name: 'CosmosKit Template',
              description: 'CosmosKit dapp template',
              url: 'https://docs.cosmoskit.com/',
              icons: [],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        <Component {...pageProps} />
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
