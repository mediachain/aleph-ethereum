pragma solidity ^0.4.0;

contract SimpleWrite {
  uint public constant REGISTRATION_PRICE_PER_B = 10000;

  // constructor
  function SimpleWrite() {}

  function write(string namespace, bytes payload /* MUST be CBOR */) {
    Write(msg.sender, namespace, payload, payload.length * REGISTRATION_PRICE_PER_B);
  }

  event Write(address payer, string namespace, bytes payload, uint value);
}
