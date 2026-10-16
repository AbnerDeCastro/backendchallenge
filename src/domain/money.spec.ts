
import { describe, expect, it } from 'vitest';
import { Money } from './money';

describe('Money', () => {
  it('deve criar um valor monetário válido', () => {
    const money = Money.from({
      amount: '25.00',
      currency: 'BRL',
    });

    expect(money.toString()).toBe('25.00');
    expect(money.currency).toBe('BRL');
  });

  it('deve somar dois valores', () => {
    const first = Money.from({
      amount: '10.50',
      currency: 'BRL',
    });

    const second = Money.from({
      amount: '5.25',
      currency: 'BRL',
    });

    expect(first.add(second).toString()).toBe('15.75');
  });

  it('deve permitir resultado negativo na subtração', () => {
    const first = Money.from({
      amount: '10.00',
      currency: 'BRL',
    });

    const second = Money.from({
      amount: '15.00',
      currency: 'BRL',
    });

    const result = first.subtract(second);

    expect(result.toString()).toBe('-5.00');
    expect(result.isNegative()).toBe(true);
  });

  it('deve rejeitar valores com mais de duas casas decimais', () => {
    expect(() =>
      Money.from({
        amount: '10.123',
        currency: 'BRL',
      }),
    ).toThrow('Valor monetário inválido');
  });

  it('deve rejeitar operações com moedas diferentes', () => {
    const brl = Money.from({
      amount: '10.00',
      currency: 'BRL',
    });

    const usd = Money.from({
      amount: '5.00',
      currency: 'USD',
    });

    expect(() => brl.add(usd)).toThrow(
      'Não é possível operar com moedas diferentes',
    );
  });
});

it('deve preservar os valores originais após uma soma', () => {
  const primeiro = Money.from({
    amount: '10.00',
    currency: 'BRL',
  });

  const segundo = Money.from({
    amount: '5.00',
    currency: 'BRL',
  });

  const resultado = primeiro.add(segundo);

  expect(resultado.toString()).toBe('15.00');
  expect(primeiro.toString()).toBe('10.00');
  expect(segundo.toString()).toBe('5.00');
});

it('deve subtrair dois valores corretamente', () => {
  const primeiro = Money.from({
    amount: '20.00',
    currency: 'BRL',
  });

  const segundo = Money.from({
    amount: '7.50',
    currency: 'BRL',
  });

  expect(primeiro.subtract(segundo).toString()).toBe('12.50');
});
