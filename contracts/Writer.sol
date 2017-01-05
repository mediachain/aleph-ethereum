pragma solidity ^0.4.0;

contract Writer {
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

  event Write(
    address payer,
    string namespace,
    bytes body,
    uint fee
  );
}
