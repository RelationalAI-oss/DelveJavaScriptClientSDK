import { html, css, LitElement } from 'lit';
import { Connection } from 'relationalai-sdk';

class TestHarness extends LitElement {

  static get styles() {
    return css`
      #listComputesTxt {
        width: 150px;
        height: 150px;
      }
    `;
  }

  static get properties() {
    return {
      computesList: { type: Array }
    }
  }

  constructor() {
    super();

    this.computesList = [];

    this._accessToken = window.testharness.config.testAccessToken;
    this._raiConnection = new Connection({
      basePath: 'https://azure-ux.relationalai.com',
      accessToken: this._accessToken
    });
  }

  createRenderRoot() {
    const root = super.createRenderRoot();

    root.addEventListener('click', (ev) => {
      const computeName = root.getElementById('computeNameInput').value;

      switch (ev.target.id) {
        case 'createComputeBtn':
          this._createCompute(computeName);
          break;

        case 'deleteComputeBtn':
          this._deleteCompute(computeName);
          break;

        case 'updComputesBtn':
          this._listComputes();
          break;

        case 'connectDBBtn':
          const connectDatabaseName = root.getElementById('connectDBInput').value;
          this._connectToDatabase(connectDatabaseName);
          break;

        default:
          break;
      }
    });

    return root;
  }

  firstUpdated() {
    // Called by Lit on the first render

    super.firstUpdated();
  }

  update(changed) {
    // Called by Lit prior to render

    super.update(changed);
  }

  updated(changed) {
    // Called by Lit at the end of the render cycle

    super.updated(changed);
  }

  render() {
    const computesOutput = JSON.stringify(this.computesList);

    return html`
      <h1>Test Harness</h1>
      <div class="test-section">
        <input type="text" id="computeNameInput" placeholder="Name of compute" />
        <button id="createComputeBtn">Create compute</button>
        <button id="deleteComputeBtn">Delete compute</button>
      </div>
      <div class="test-section">
        <textarea id="listComputesTxt" placeholder="List of computes" value=${computesOutput}></textarea>
        <button id="updComputesBtn">Update computes list</button>
      </div>
      <div class="test-section">
        <input type="text" id="connectDBInput" placeholder="Database name" />
        <button id="connectDBBtn">Connect to database</button>
      </div>
    `;
  }

  _createCompute(name) {
    console.log(`Attempt to create compute ${name}`);
  }

  _deleteCompute(name) {
    console.log(`Attempt to delete compute ${name}`);
  }

  async _listComputes() {
    try {
      const response = await this._raiConnection.listComputes();
      console.log(response.result);
      console.log(response.error);

      if (response.result) {
        this.computesList = response.result.computes;
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  async _connectToDatabase(dbname) {
    try {
      const response = await this._raiConnection.connectToDatabase(dbname);
      console.log(response.result);
      console.log(response.error);
    }
    catch(error) {
      console.error(error);
    }
  }
}

export default TestHarness;
customElements.define('test-harness', TestHarness);
