import Connection from './Connection.js';
import RelAPIMixin from './RelAPIMixin.js';

const Base = RelAPIMixin(Connection);

/**
 * Class representing a local connection to the Rel Server
 *
 * @inherits Connection
 * @mixes RelAPIMixin
 */
class LocalConnection extends Base {
  constructor(params) {
    super(params);
  }
}

export default LocalConnection;
