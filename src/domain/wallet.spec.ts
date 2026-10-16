
import { describe, expect, it } from 'vitest';
import { Money } from './money';
import { Wallet } from './wallet';

describe('Wallet', () => {
  it('deve iniciar com saldo zero', () => {
    const wallet = Wallet.create('wallet-1', 'BRL');

    expect(wallet.getBalance().toString()).toBe('0.00');
  });

  it('deve creditar um valor', () => {
    const wallet = Wallet.create('wallet-1', 'BRL');

    wallet.credit(
      Money.from({ amount: '100.00', currency: 'BRL' }),
    );

    expect(wallet.getBalance().toString()).toBe('100.00');
  });

  it('deve debitar quando houver saldo suficiente', () => {
    const wallet = Wallet.create('wallet-1', 'BRL');

    wallet.credit(
      Money.from({ amount: '100.00', currency: 'BRL' }),
    );

    wallet.debit(
      Money.from({ amount: '30.00', currency: 'BRL' }),
    );

    expect(wallet.getBalance().toString()).toBe('70.00');
  });

  it('não deve permitir saldo negativo', () => {
    const wallet = Wallet.create('wallet-1', 'BRL');

    expect(() =>
      wallet.debit(
        Money.from({ amount: '10.00', currency: 'BRL' }),
      ),
    ).toThrow('Saldo insuficiente');
  });
});
