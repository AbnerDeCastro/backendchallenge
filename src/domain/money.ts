import { Decimal } from 'decimal.js';

export interface MoneyProps {
  amount: string;
  currency: string;
}

export class Money {
  private constructor(
    private readonly value: Decimal,
    public readonly currency: string,
  ) {}

  static from(props: MoneyProps): Money {
    const { amount, currency } = props;

    if (!/^\d+\.\d{2}$/.test(amount)) {
      throw new Error('Valor monetário inválido');
    }

    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new Error('Moeda inválida');
    }

    return new Money(new Decimal(amount), currency);
  }

  static zero(currency: string): Money {
    return Money.from({ amount: '0.00', currency });
  }

  private static createInternal(value: Decimal, currency: string): Money {
    return new Money(value, currency);
  }


add(other: Money): Money {
  this.assertSameCurrency(other);

  return Money.createInternal(
    this.value.plus(other.value),
    this.currency,
  );
}
  subtract(other: Money): Money {
    this.assertSameCurrency(other);

    return Money.createInternal(
      this.value.minus(other.value),
      this.currency,
    );
  }

  negate(): Money {
    return Money.createInternal(
      this.value.negated(),
      this.currency,
    );
  }

  isZero(): boolean {
    return this.value.isZero();
  }

  isPositive(): boolean {
    return this.value.isPositive();
  }

  isNegative(): boolean {
    return this.value.isNegative();
  }

  isLessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.value.lessThan(other.value);
  }

  equals(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.value.equals(other.value);
  }

  toJSON(): MoneyProps {
    return {
      amount: this.toString(),
      currency: this.currency,
    };
  }

  toString(): string {
    return this.value.toFixed(2);
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error('Não é possível operar com moedas diferentes');
    }
  }
}
