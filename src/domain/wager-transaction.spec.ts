
import { describe, expect, it } from 'vitest';
import { Money } from './money';
import {
  WagerTransaction,
  WagerTransactionStatus,
} from './wager-transaction';

describe('WagerTransaction', () => {
  function createBet() {
    return WagerTransaction.create({
      id: 'transaction-1',
      walletId: 'wallet-1',
      amount: Money.from({
        amount: '25.00',
        currency: 'BRL',
      }),
      status: WagerTransactionStatus.BET,
    });
  }

  it('deve criar uma transação com status BET', () => {
    const transaction = createBet();

    expect(transaction.getStatus()).toBe(
      WagerTransactionStatus.BET,
    );
  });

  it('deve finalizar uma aposta com WIN', () => {
    const transaction = createBet();

    transaction.finish(WagerTransactionStatus.WIN);

    expect(transaction.getStatus()).toBe(
      WagerTransactionStatus.WIN,
    );
  });

  it('não deve permitir finalizar uma transação duas vezes', () => {
    const transaction = createBet();

    transaction.finish(WagerTransactionStatus.LOSS);

    expect(() =>
      transaction.finish(WagerTransactionStatus.WIN),
    ).toThrow('A transação já foi finalizada');
  });

  it('não deve criar uma transação com valor zero', () => {
    expect(() =>
      WagerTransaction.create({
        id: 'transaction-1',
        walletId: 'wallet-1',
        amount: Money.zero('BRL'),
        status: WagerTransactionStatus.BET,
      }),
    ).toThrow('O valor da transação deve ser positivo');
  });
});
