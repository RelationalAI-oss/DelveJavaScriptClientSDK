import { html, css, LitElement } from 'lit';
import { Connection } from 'relationalai-sdk';

class TestHarness extends LitElement {

  static get styles() {
    return css`
      .test-section {
        margin-bottom: 2em;
      }
      .test-section-title {
        font-size: 1.2em;
        font-weight: 700;
        margin-bottom: 0.6em;
      }
      .text-list-explorer {
        margin-left: 10px;
        font-family: monospace
      }
      .list-explorer {
        display: none;
        margin-bottom: 0.8em;
      }
    `;
  }

  static get properties() {
    return {
      computesList: { type: Array },
      databasesList: { type: Array }
    }
  }

  constructor() {
    super();

    this.computesList = [];
    this.databasesList = [];

    this._accessToken = window.testharness.config.testAccessToken;
    this._raiConnection = new Connection({
      basePath: 'https://azure-ux.relationalai.com',
      accessToken: this._accessToken
    });
  }

  createRenderRoot() {
    const root = super.createRenderRoot();

    root.addEventListener('click', (ev) => {
      let computeName;
      let dbname;

      switch (ev.target.id) {
        case 'createComputeBtn':
          computeName = root.getElementById('computeNameInput').value;
          this._createCompute(computeName);
          break;

        case 'deleteComputeBtn':
          computeName = root.getElementById('computeNameInput').value;
          this._deleteCompute(computeName);
          break;

        case 'updComputesBtn':
          this._listComputes();
          break;

        case 'updDatabasesBtn':
          this._listDatabases();
          break;

        case 'connectDBBtn':
          dbname = root.getElementById('connectDBInput').value;
          this._connectToDatabase(dbname);
          break;

        case 'createDBBtn':
          dbname = root.getElementById('createDBInput').value;
          computeName = root.getElementById('createDBComputeInput').value;
          computeName = computeName ?? (computeName.length > 0 ? computeName : null);
          this._createDatabase(dbname, computeName, true);
          break;

        case 'runQueryBtn':
          dbname = root.getElementById('queryDBInput').value;
          computeName = root.getElementById('queryComputeInput').value;
          const query = root.getElementById('queryInput').value;
          this._runQuery(dbname, computeName, query);
          break;

        case 'updateDBBtn':
        case 'updateDBAndRemoveBtn':
          dbname = root.getElementById('updateDBInput').value;
          computeName = root.getElementById('updateDBComputeInput').value;
          this._updateDatabase(dbname, computeName, ev.target.id === 'updateDBAndRemoveBtn');
          break;

        default:
          break;
      }
    });

    return root;
  }

  firstUpdated() {
    // Called by Lit on the first render
    this._listComputes();
    this._listDatabases();

    super.firstUpdated();
  }

  update(changed) {
    // Called by Lit prior to render

    super.update(changed);
  }

  updated(changed) {
    // Called by Lit at the end of the render cycle

    if (changed.has('computesList')) {
      const computeItems = this.computesList.map(item => {
        return `
          <div class="text-list-explorer" aria-label="${item.name}">
            <div>account_name: ${item.account_name ?? ''}</div>
            <div>created_by: ${item.created_by ?? ''}</div>
            <div>created_on: ${item.created_on ?? ''}</div>
            <div>deleted_on: ${item.deleted_on ?? ''}</div>
            <div>id: ${item.id ?? ''}</div>
            <div>infrastructure: ${item.infrastructure ?? ''}</div>
            <div>message: ${item.message ?? ''}</div>
            <div>name: ${item.name ?? ''}</div>
            <div>region: ${item.region ?? ''}</div>
            <div>requested_on: ${item.requested_on ?? ''}</div>
            <div>size: ${item.size ?? ''}</div>
            <div>state: ${item.state ?? ''}</div>
          </div>
        `;
      });

      const elem = this.shadowRoot.getElementById('computesList');
      if (computeItems.length > 0) {
        const html = computeItems.join('');
        elem.innerHTML = html;
        elem.style.display = 'block';
      }
      else {
        elem.style.display = 'none';
      }
    }

    if (changed.has('databasesList')) {
      const databaseItems = this.databasesList.map(item => {
        return `
          <div class="text-list-explorer" aria-label="${item.name}">
            <div>account_name: ${item.account_name ?? ''}</div>
            <div>created_by: ${item.created_by ?? ''}</div>
            <div>default_compute_name: ${item.default_compute_name ?? ''}</div>
            <div>id: ${item.id ?? ''}</div>
            <div>name: ${item.name ?? ''}</div>
            <div>region: ${item.region ?? ''}</div>
            <div>state: ${item.state ?? ''}</div>
          </div>
        `;
      });

      const elem = this.shadowRoot.getElementById('databasesList');
      if (databaseItems.length > 0) {
        const html = databaseItems.join('');
        elem.innerHTML = html;
        elem.style.display = 'block';
      }
      else {
        elem.style.display = 'none';
      }
    }

    super.updated(changed);
  }

  render() {

    return html`
      <h1>RAICloud API Tests</h1>
      <div class="test-section">
        <div class="test-section-title">Create/delete compute</div>
        <input type="text" id="computeNameInput" placeholder="Name of compute" />
        <button id="createComputeBtn">Create compute</button>
        <button id="deleteComputeBtn">Delete compute</button>
      </div>
      <div class="test-section">
        <div class="test-section-title">List of computes</div>
        <elix-list-explorer class="list-explorer" id="computesList"></elix-list-explorer>
        <button id="updComputesBtn">Refresh computes list</button>
      </div>
      <div class="test-section">
        <div class="test-section-title">List of databases</div>
        <elix-list-explorer class="list-explorer" id="databasesList"></elix-list-explorer>
        <button id="updDatabasesBtn">Refresh databases list</button>
      </div>
      <div class="test-section">
        <div class="test-section-title">Ping test</div>
        <input type="text" id="connectDBInput" placeholder="Database name" />
        <button id="connectDBBtn">Connect to database</button>
      </div>
      <div class="test-section">
        <div class="test-section-title">Create database</div>
        <input type="text" id="createDBInput" placeholder="Database name" />
        <input type="text" id="createDBComputeInput" placeholder="Compute name" />
        <button id="createDBBtn">Create new database</button>
      </div>
      <div class="test-section">
        <div class="test-section-title">Query</div>
        <input type="text" id="queryInput" placeholder="Query" />
        <input type="text" id="queryDBInput" placeholder="Database name" />
        <input type="text" id="queryComputeInput" placeholder="Compute name" />
        <button id="runQueryBtn">Run query</button>
      </div>
      <div>
        <div class="test-section-title">Update database</div>
        <input type="text" id="updateDBInput" placeholder="Database name" />
        <input type="text" id="updateDBComputeInput" placeholder="Default compute name" />
        <button id="updateDBBtn">Update database</button>
        <button id="updateDBAndRemoveBtn">Update and remove default</button>
      </div>
    `;
  }

  async _createCompute(name) {
    try {
      const response = await this._raiConnection.createCompute(name);
      console.log(`Create compute ${name} : `, response);

      if (response.result) {
        this._listComputes();
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async _deleteCompute(name) {
    if (!name || name === '') {
      return;
    }

    if (!confirm(`Are you sure you want to delete the compute named "${name}"?`)) {
      return;
    }

    try {
      const response = await this._raiConnection.deleteCompute(name);
      console.log(`Delete compute: ${name}`, response);

      if (response.result) {
        this._listComputes();
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async _listComputes() {
    try {
      const response = await this._raiConnection.listComputes();
      console.log(`List computes: `, response);

      if (response.result) {
        this.computesList = response.result.computes;
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async _listDatabases() {
    try {
      const response = await this._raiConnection.listDatabases();
      console.log(`List databases: `, response);

      if (response.result) {
        this.databasesList = response.result.databases;
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async _connectToDatabase(dbname) {
    try {
      const response = await this._raiConnection.connectToDatabase(dbname, null);
      console.log('Connect to database: ', response);
    }
    catch(error) {
      console.error(error);
    }
  }

  async _createDatabase(dbname, compute, overwrite) {
    try {
      const response = await this._raiConnection.createDatabase(dbname, compute, overwrite);
      console.log('Create database: ', response);

      if (response.result) {
        this._listDatabases();
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async _runQuery(dbname, computeName, query) {
    try {
      const response = await this._raiConnection.query(dbname, computeName, query);
      console.log('Query: ', response);
    }
    catch(error) {
      console.error(error);
    }
  }

  async _updateDatabase(dbname, defaultComputeName, removeDefaultCompute) {
    try {
      const response = await this._raiConnection.updateDatabase(dbname, defaultComputeName, removeDefaultCompute);
      console.log('Update database: ', response);

      if (response.result) {
        this._listDatabases();
        this._listComputes();
      }
    }
    catch(error) {
      console.error(error);
    }
  }
}

export default TestHarness;
customElements.define('test-harness', TestHarness);
