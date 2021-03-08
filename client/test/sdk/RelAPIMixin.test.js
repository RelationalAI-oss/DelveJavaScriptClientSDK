const assert = require('assert');
import LocalConnection from '../../src/sdk/LocalConnection.js';

const dbname = `sdk-unit-tests-db`;
const uniqueDbname = `${dbname}-${(new Date).getTime()}`;
const defaultSources = ["intrinsics", "stdlib", "ml"];

// Helper function to determine set equality elementwise
const setsEqual = (a,b) => a.size === b.size && [...a].every(v => b.has(v))
let lc = new LocalConnection();

const initializeDatabase = () => it('initializes the database for tests', () => {
  return lc.createDatabase(dbname, true).then(res => {
    assert.strictEqual(res.result.problems.length, 0);
    assert.strictEqual(res.error, null);
  });
}).timeout(60000);

describe('RelAPIMixin', () => {

  describe('#createDatabase', () => {
    it('creates a database with create-and-overwrite', () => {
      return lc.createDatabase(dbname, true).then(res => {
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.error, null);
      });
    }).timeout(60000);
    it('is able to ping the database', () => {
      return lc.connectToDatabase(dbname).then(res => {
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.error, null);
      });
    }).timeout(60000);
    it('should return error status 422 when we create again without overwrite', () => {
      return lc.createDatabase(dbname, false).then(res => {
        assert.strictEqual(res.result, null);
        assert.notStrictEqual(res.error, null);
        assert.strictEqual(res.error.status, 422);
      });
    }).timeout(60000);
    it(`creates a new database called ${uniqueDbname} without overwrite when it does not already exist`, () => {
      return lc.createDatabase(uniqueDbname, false).then(res => {
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.error, null);
      });
    }).timeout(60000);
  });

  describe('#source management', () => {
    initializeDatabase();

    it(`test-1.delve should include the keys [${defaultSources.join()}]`, () => {
      return lc.listSources(dbname).then(res => {
        assert.notStrictEqual(res.result.actions, null);
        assert.notStrictEqual(res.result.actions[0], null);
        assert.notStrictEqual(res.result.actions[0].result, null);
        assert.notStrictEqual(res.result.actions[0].result.sources, null);
        assert(setsEqual(new Set(res.result.actions[0].result.sources.map(x => x.name)), new Set(defaultSources)));
      });
    }).timeout(60000);
    it(`should install 'def foo = {(1,);(2,);(3,)}' without error into test-1.delve via #installSource`, () => {
      return lc.installSource(dbname, 'test-1.delve', 'def foo = {(1,);(2,);(3,)}').then(res => {
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.error, null);
      });
    }).timeout(60000);
    it(`should list test-1.delve in the result for #listSources`, () => {
      return lc.listSources(dbname).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.result.actions[0].result.sources.length, defaultSources.length + 1);
        let match = false;
        for (let i = 0; i < (defaultSources.length + 1); i++) {
          if (res.result.actions[0].result.sources[i].name === 'test-1.delve') {
            match = true;
          }
        }
        assert(match);
      });
    }).timeout(60000);
    it(`should fail to install 'def foo = ' into test-1.delve`, () => {
      return lc.installSource(dbname, 'test-1.delve', 'def foo = ').then(res => {
        assert.strictEqual(res.error, null);
        assert.notStrictEqual(res.result, null);
        assert.notStrictEqual(res.result.problems.length, 0);
      });
    }).timeout(60000);
    it(`should delete source test-1.delve`, () => {
      return lc.deleteSource(dbname, 'test-1.delve').then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
      });
    }).timeout(60000);
    it(`should be only ${defaultSources.length} sources installed now`, () => {
      return lc.listSources(dbname).then(res => {
        assert.strictEqual(res.result.actions[0].result.sources.length, defaultSources.length);
      });
    }).timeout(60000);
  });

  describe('#query', () => {
    initializeDatabase();

    it('def bar = 2', () => {
      return lc.query(dbname, 'def bar = 2', true, ['bar']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.result.actions[0].result.output[0].columns[0][0], 2);
      });
    }).timeout(60000);
    it('def p = {(1,);(2,);(3,)}', () => {
      return lc.query(dbname, 'def p = {(1,);(2,);(3,)}', true, ['p']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        assert(setsEqual(new Set(res.result.actions[0].result.output[0].columns[0]), new Set([1,2,3])));
      });
    }).timeout(60000);
    it('def p = {(1, 5); (2, 7); (3, 9)}', () => {
      return lc.query(dbname, 'def p = {(1, 5); (2, 7); (3, 9)}', true, ['p']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        let success = [];
        success = [[1,2,3],[5,7,9]].map((X,i) => {
          return setsEqual(new Set(X), new Set(res.result.actions[0].result.output[0].columns[i]));
        });
        assert.deepStrictEqual(success, [true, true]);
      });
    }).timeout(60000);
  });

  describe('#top-level query', () => {
    initializeDatabase();

    it('def bar = 2', () => {
      return lc.query(dbname, 'def bar = 2\ndef output = bar').then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.result.output[0].columns[0][0], 2);
      });
    }).timeout(60000);
    it('def p = {(1,);(2,);(3,)}', () => {
      return lc.query(dbname, 'def p = {(1,);(2,);(3,)}\ndef output = p').then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        assert(setsEqual(new Set(res.result.output[0].columns[0]), new Set([1,2,3])));
      });
    }).timeout(60000);
    it('def p = {(1, 5); (2, 7); (3, 9)}', () => {
      return lc.query(dbname, 'def p = {(1, 5); (2, 7); (3, 9)}\ndef output = p').then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        let success = [];
        success = [[1,2,3],[5,7,9]].map((X,i) => {
          return setsEqual(new Set(X), new Set(res.result.output[0].columns[i]));
        });
        assert.deepStrictEqual(success, [true, true]);
      });
    }).timeout(60000);
  });

  describe('#both standard and top-level query', () => {
    initializeDatabase();

    it('def bar = 2', () => {
      return lc.query(dbname, 'def bar = 2\ndef output = bar', true, ['bar']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.result.actions[0].result.output[0].columns[0][0], 2);
        assert.strictEqual(res.result.output[0].columns[0][0], 2);
      });
    }).timeout(60000);
    it('def p = {(1,);(2,);(3,)}', () => {
      return lc.query(dbname, 'def p = {(1,);(2,);(3,)}\ndef output = p', true, ['p']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        assert(setsEqual(new Set(res.result.actions[0].result.output[0].columns[0]), new Set([1,2,3])));
        assert(setsEqual(new Set(res.result.output[0].columns[0]), new Set([1,2,3])));
      });
    }).timeout(60000);
    it('def p = {(1, 5); (2, 7); (3, 9)}', () => {
      return lc.query(dbname, 'def p = {(1, 5); (2, 7); (3, 9)}\ndef output = p', true, ['p']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
        let success = [];
        success = [[1,2,3],[5,7,9]].map((X,i) => {
          return setsEqual(new Set(X), new Set(res.result.actions[0].result.output[0].columns[i]));
        });
        assert.deepStrictEqual(success, [true, true]);
        success = [[1,2,3],[5,7,9]].map((X,i) => {
          return setsEqual(new Set(X), new Set(res.result.output[0].columns[i]));
        });
        assert.deepStrictEqual(success, [true, true]);
      });
    }).timeout(60000);
    it(`'ic {}' should give 422 error`, () => {
      return lc.query(dbname, 'ic {}').then(res => {
        assert.notStrictEqual(res.error, null);
        assert.strictEqual(res.error.status, 422);
        // TODO(rjb) - Need to resolve issue #45
        // https://github.com/RelationalAI/rai-ux/issues/45
        //
        //assert.notStrictEqual(res.result, null);
      });
    }).timeout(60000);
    it(`'def p =' should return problems`, () => {
      return lc.query(dbname, 'def p =', true, ['p']).then(res => {
        assert.strictEqual(res.error, null);
        assert(res.result.problems.length > 0);
      });
    }).timeout(60000);
  });

  describe('#query with update', () => {
    initializeDatabase();

    const incrementQuery =
    `
    def insert[:x] = x + 1
    def delete[:x] = x
    def output = x
    `;

    it(`should install 'def insert[:x] = 1' without error into 'test.delve' via #installSource`, () => {
      return lc.installSource(dbname, 'test.delve', 'def insert[:x] = 1').then(res => {
        assert.strictEqual(res.result.problems.length, 0);
        assert.strictEqual(res.error, null);
      });
    }).timeout(60000);
    it('should return 2 via incrementing x', () => {
      return lc.query(dbname, incrementQuery, false, [':x']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.output[0].columns[0][0], 2);
      });
    }).timeout(60000);
    it('should return 3 via incrementing x again', () => {
      return lc.query(dbname, incrementQuery, false, [':x']).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.output[0].columns[0][0], 3);
      });
    }).timeout(60000);
    it('should do something for listEdb', () => {
      return lc.listEdb(dbname, 'x').then(res => {
        assert.strictEqual(res.error, null);
      });
    }).timeout(60000);
  });

  describe('#cardinality', () => {
    initializeDatabase();

    it(`def cardinalityTest = {(1,); (2,); (3,)} should insert without error`, () => {
      return lc.query(dbname, 'def insert[:cardinalityTest] = {(1,); (2,); (3,)}', false).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
      });
    }).timeout(60000);
    it('should return cardinality 3', () => {
      return lc.cardinality(dbname, 'cardinalityTest').then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.actions[0].result.result[0].columns[0][0], 3);
      });
    }).timeout(60000);
  });

  describe('#listEdb', () => {
    initializeDatabase();

    it(`def foo = {(1,); (2,); (3,)} and def foo = 'Hi' should insert without error`, () => {
      return lc.query(dbname, `def insert[:foo] = {(1,); (2,); (3,)}\ndef insert[:foo] = "Hi"`, false).then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.problems.length, 0);
      });
    }).timeout(60000);
    it(`listEdb should return information on relation foo`, () => {
      return lc.listEdb(dbname, 'foo').then(res => {
        assert.strictEqual(res.error, null);
        assert.strictEqual(res.result.actions[0].result.rels.length, 2);
        assert.strictEqual(res.result.actions[0].result.rels[0].name, 'foo');
        assert.strictEqual(res.result.actions[0].result.rels[0].type, 'RelKey');
        assert.strictEqual(res.result.actions[0].result.rels[1].name, 'foo');
        assert.strictEqual(res.result.actions[0].result.rels[1].type, 'RelKey');
      });
    }).timeout(60000);
  });
});
