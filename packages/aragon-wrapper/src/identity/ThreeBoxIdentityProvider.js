import axios from 'axios';
import { isAddress } from 'web3-utils';

import AddressIdentityProvider from './AddressIdentityProvider';

const BOX_SERVER_URL = 'https://ipfs.3box.io';

const extractImgHash = image => {
  const hash =
    image && image[0] && image[0].contentUrl && image[0].contentUrl['/'];
  return hash || null;
};

const noop = () => {}

export default class ThreeBoxIdentityProvider extends AddressIdentityProvider {
  init = noop
  /**
   * Resolve the identity metadata for an address
   * Should resolve to null if an identity could not be found
   *
   * @param  {string} address Address to resolve
   * @return {Promise} Resolved metadata or rejected error
   */
  async resolve(address) {
    if (!address || !isAddress(address)) return null

    try {
      const { data } = await axios.get(
        `${BOX_SERVER_URL}/profile?address=${address.toLowerCase()}`
      );
      if(!data.name) return null
      return {
        createdAt: null,
        name: data.name,
        source: '3box',
        image: extractImgHash(data.image),
      };
    } catch (err) {
      // assume errors from 3box means the identity does not exist so we dont slow down any apps
      return null;
    }
  }
}
