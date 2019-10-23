import axios from 'axios';
import AddressIdentityProvider from './AddressIdentityProvider';

const BOX_SERVER_URL = 'https://ipfs.3box.io';

const extractImgHash = image => {
  const hash =
    image && image[0] && image[0].contentUrl && image[0].contentUrl['/'];
  return hash || null;
};

export default class ThreeBoxIdentityProvider extends AddressIdentityProvider {
  /**
   * Resolve the identity metadata for an address
   * Should resolve to null if an identity could not be found
   *
   * @param  {string} address Address to resolve
   * @return {Promise} Resolved metadata or rejected error
   */
  async resolve(address) {
    if (!address) {
      throw new Error('address is required when resolving a 3box identity');
    }

    try {
      const { data } = await axios.get(
        `${BOX_SERVER_URL}/profile?address=${address.toLowerCase()}`,
        { withCredentials: true }
      );

      return {
        createdAt: null,
        name: data.name || address,
        imageCid: extractImgHash(data.image),
      };
    } catch (err) {
      // assume errors from 3box means the identity does not exist so we dont slow down any apps
      return null;
    }
  }
}
