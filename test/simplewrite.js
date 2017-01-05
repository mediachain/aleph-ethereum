const cbor = require('borc')

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
      var c;
      var creator = accounts[3];
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
      var caller = accounts[1]
      var creator = accounts[3]
      var namespace = 'mediachain.test'
      var body = cbor.encode({'foo': 'bar'})
      var bodyHex = '0x' + body.toString('hex')
      var price = 1000
      SimpleWrite.new(price, {from: creator})
        .then((s) => {
          let we = s.Write()
          we.watch((err, event) =>{
            assert.equal(event.args.payer, caller, "payer")
            assert.equal(event.args.namespace, namespace, "namespace")
            assert.equal(event.args.body, bodyHex, "body (hex)")
            assert.equal(event.args.fee.toNumber(), body.length * price, "fee")
            we.stopWatching()
            done()
          })

          return s.write(namespace, bodyHex, {from: caller})
        })
    })
  })

});
