import axios from 'axios'

export const listenForPinHashEvents = async (proxyAddress, datastoreEndpoint = 'http://localhost:3003/api/v0') => {
  try {
    const response = await axios.post(
      `${datastoreEndpoint}/storageContracts`,
      JSON.stringify({ contractAddress: proxyAddress }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    if (!(response.status === 200
      || response.status === 201
      || response.status === 204)
      ) {
      console.error(`Error registering contract with proxyAddress: ${proxyAddress} with Quasar`)
    }
  } catch (err) {
    console.error(`Error registering contract with proxyAddress: ${proxyAddress} with Quasar: ${err}`)
  }
}

export const isStorageApp = (appInfo) => appInfo.storage
