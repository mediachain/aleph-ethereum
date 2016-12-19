pragma solidity ^0.4.0;

import "./OrderPayment.sol";

/*
 * Main SimpleWrite Token contract
 */
contract SimpleWrite is OrderPayment {

  uint public constant REGISTRATION_PRICE = 10000;

  // constructor
  function SimpleWrite()
    OrderPayment() {}

  /*
   * registerSong
   * Register new song into a namespace
   *
   * string namespace: namespace
   * string song: song id
   */
  function write(string namespace, bytes payload /* MUST be CBOR */) {
    placeOrder(namespace, payload, REGISTRATION_PRICE);
  }

  // // internal methods
  // function placeDeposit(uint value) internal {
  //   transfer(this, value);
  // }

  // function sendDeposit(Order order, address account) internal {
  //   // this.tranfer makes the call external, making
  //   // msg.sender == this inside transfer
  //   this.transfer(account, order.value);
  // }
}
