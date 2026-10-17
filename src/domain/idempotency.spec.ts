
import { describe, expect, it } from 'vitest';

describe('Idempotência', () => {
  it('deve reconhecer um evento que já foi processado', () => {
    const processedEvents = new Set<string>();

    const firstAttempt = processedEvents.has('bet-123');

    if (!firstAttempt) {
      processedEvents.add('bet-123');
    }

    const secondAttempt = processedEvents.has('bet-123');

    expect(firstAttempt).toBe(false);
    expect(secondAttempt).toBe(true);
  });
});
