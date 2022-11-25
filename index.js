class Account {

  constructor(userName) {
    this.transactions = [];
    this.userName = userName;
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
  	this.transactions.push(transaction);
  }
}

// abstract class
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    // deposits always allowed evene deposit 0
    return true;
  }
}

// DRIVER CODE (yes, keep everything in one file for now... b/c cog load)
const myAccount = new Account('Chunyu Bai');

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing 20 should  succeed...');
const t2 = new Deposit(20.00, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 10 should be allowed...');
const t3 = new Withdrawal(10.00, myAccount);
console.log('Commit result:', t3.commit());

console.log('Depositing 0 should succeed...');
const t4 = new Deposit(0.00, myAccount);
console.log('Commit result:', t4.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even 0 should true...');
const t5 = new Withdrawal(0.00, myAccount);
console.log('Commit result:', t5.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
