
import { describe, expect, it } from 'vitest';
import { IdempotencyService } from './idempotency.service';

describe('IdempotencyService', () => {
  it('deve indicar que um evento novo não foi processado', () => {
    const service = new IdempotencyService();

    expect(service.hasBeenProcessed('bet-123')).toBe(false);
  });

  it('deve reconhecer um evento já registrado', () => {
    const service = new IdempotencyService();

    service.markAsProcessed('bet-123');

    expect(service.hasBeenProcessed('bet-123')).toBe(true);
  });

  it('não deve aceitar um ID vazio', () => {
    const service = new IdempotencyService();

    expect(() => service.markAsProcessed('')).toThrow(
      'ID do evento inválido',
    );
  });
});
