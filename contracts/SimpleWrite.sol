pragma solidity ^0.4.0;

import "zeppelin-solidity/contracts/Ownable.sol";

contract SimpleWrite is Ownable {
  uint public REGISTRATION_PRICE_PER_B;

  // constructor
  function SimpleWrite(uint price) {
    REGISTRATION_PRICE_PER_B = price;
  }

  /*
  message Statement {
  string id = 1;
  string publisher = 2;
  string namespace = 3;
  StatementBody body = 4;
  int64 timestamp = 5;
  bytes signature = 6;
  }
  */

  function write(string namespace, bytes body /* MUST be CBOR */, bytes signature) {
    Write(msg.sender, namespace, body, body.length * REGISTRATION_PRICE_PER_B);
  }

  event Write(
    address payer,
    string namespace,
    bytes body,
    uint fee
  );
}
