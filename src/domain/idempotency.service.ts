
export class IdempotencyService {
  private readonly processedEvents = new Set<string>();

  hasBeenProcessed(eventId: string): boolean {
    return this.processedEvents.has(eventId);
  }

  markAsProcessed(eventId: string): void {
    if (!eventId.trim()) {
      throw new Error('ID do evento inválido');
    }

    this.processedEvents.add(eventId);
  }
}
