import { Money } from './money.js';

export class Wallet {
  private constructor(
    public readonly id: string,
    private balance: Money,
  ) {}

  static create(id: string, currency: string): Wallet {
    if (!id.trim()) {
      throw new Error('ID da carteira inválido');
    }

    return new Wallet(id, Money.zero(currency));
  }

  getBalance(): Money {
    return this.balance;
  }

  debit(amount: Money): void {
    if (this.balance.currency !== amount.currency) {
      throw new Error('Moeda incompatível com a carteira');
    }

    if (!amount.isPositive()) {
      throw new Error('O débito deve ser maior que zero');
    }

    if (this.balance.isLessThan(amount)) {
      throw new Error('Saldo insuficiente');
    }

    this.balance = this.balance.subtract(amount);
  }

  credit(amount: Money): void {
    if (this.balance.currency !== amount.currency) {
      throw new Error('Moeda incompatível com a carteira');
    }

    if (!amount.isPositive()) {
      throw new Error('O crédito deve ser maior que zero');
    }

    this.balance = this.balance.add(amount);
  }
}
