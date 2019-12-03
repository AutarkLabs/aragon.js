import axios from 'axios'

export const listenForPinHashEvents = async (proxyAddress) => {
  try {
    const response = await fetch(`http://localhost:3003/api/v0/storageContracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contractAddress: proxyAddress }),
    })
    if (!(response.status === 201 || response.status === 204)) {
      console.error(`Error registering contract with proxyAddress: ${proxyAddress} with Quasar`)
    }
  } catch (err) {
    console.error(`Error registering contract with proxyAddress: ${proxyAddress} with Quasar: ${err}`)
  }
}

export const isStorageApp = (appInfo) => appInfo.storage