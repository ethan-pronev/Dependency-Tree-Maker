const assert = require('chai').assert;

const createDependencyTree = require('../src/createTree');
const moduleToDistro = require('../src/moduleToDistro');

describe('Tests for createTree', function() {
    //deepEqual performs a deep comparison rather than checking for equality (two objects with the same contents are not tchnically equal)
    it('test1', function() {
        assert.deepEqual(createDependencyTree('~MYTEST-A'), {'~MYTEST-B':{'~MYTEST-C':{}}, '~MYTEST-C':{}});
    });
    it('test2', function() {
        assert.deepEqual(createDependencyTree('~MYTEST-B'), {'~MYTEST-C':{}});
    });
    it('test3', function() {
        assert.deepEqual(createDependencyTree('~MYTEST-C'), {});
    });
    it('test4', function() {
        assert.throw(function() { createDependencyTree('~MYTEST-D') }, Error, 'Could not find the parent distro to module "~MYTEST-F1"');
    });
    it('test5', function() {
        assert.throw(function() { createDependencyTree('~MYTEST-E') }, Error, 'Could not find metadata for distro "~MYTEST-G"');
    });
});

describe('Tests for moduleToDistro', function() {
    it('test1', function() {
        assert.equal(moduleToDistro('DateTime::Duration'), 'DateTime');
    });
    it('test2', function() {
        assert.equal(moduleToDistro('~MYTEST-A1'), '~MYTEST-A');
    });
    it('test3', function() {
        assert.equal(moduleToDistro('~MYTEST-C3'), '~MYTEST-C');
    });
    it('test4', function() {
        assert.throw(function() { moduleToDistro('~MYTEST-F1') }, Error, 'Could not find the parent distro to module "~MYTEST-F1"');
    });
    it('test5', function() {
        assert.equal(moduleToDistro('~MYTEST-G1'), '~MYTEST-G');
    });
});