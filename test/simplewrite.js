const cbor = require('borc')
const { b58MultihashForBuffer } = require('aleph/lib/common/util')
const { EthereumPublisherId } = require('aleph/lib/peer/identity')
const { makeSimpleStatement } = require('aleph/lib/metadata/statement')


contract('SimpleWrite', function(accounts) {
  describe('creation', function(){
    it("can create contract", function(done) {
      SimpleWrite.new()
        .then(function(c) {
          assert(!!c)
        })
        .then(done)
    });

    it("owned by creator", function(done) {
      let c;
      const creator = accounts[3];
      SimpleWrite.new({from: creator})
        .then(function(_c) {
          c = _c;
          return c.owner();
        })
        .then(function(owner) {
          assert.equal(owner, creator);
        })
        .then(done)
    });

  });

  describe('write', function(){
    it("emits write event", function(done) {
      const caller = accounts[1]
      const creator = accounts[3]
      const namespace = 'mediachain.test'
      const body = {'foo': 'bar'}
      const bodyBytes = cbor.encode(body)
      const bodyHex = '0x' + bodyBytes.toString('hex')
      const bodyHash = b58MultihashForBuffer(bodyBytes)
      const price = 1000

      console.log('caller account: ', caller)
      EthereumPublisherId.fromRPCMethod(caller, web3.eth.sign)
        .then(publisherId => makeSimpleStatement(publisherId, namespace, {object: bodyHash}))
        .then(stmt => {
          const signature = '0x' +  stmt.signature.toString('hex')
          console.log('stmt:', stmt)

          SimpleWrite.new(price, {from: creator})
            .then((s) => {
              let we = s.Write()
              we.watch((err, event) =>{
                assert.equal(event.args.payer, caller, "payer")
                assert.equal(event.args.namespace, namespace, "namespace")
                assert.equal(event.args.body, bodyHex, "body (hex)")
                assert.equal(event.args.fee.toNumber(), (bodyHex.length/2 - 1) * price, "fee")
                we.stopWatching()
                done()
              })

              return s.write(namespace, bodyHex, signature, {from: caller})
            })
        })
    })
  })
});
