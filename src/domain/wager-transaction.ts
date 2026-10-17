import { Money } from './money.js';

export enum WagerTransactionStatus {
  BET = 'BET',
  WIN = 'WIN',
  LOSS = 'LOSS',
  REFUND = 'REFUND',
  ROLLBACK = 'ROLLBACK',
}

export interface WagerTransactionProps {
  id: string;
  walletId: string;
  amount: Money;
  status: WagerTransactionStatus;
}

export class WagerTransaction {
  private constructor(
    public readonly id: string,
    public readonly walletId: string,
    public readonly amount: Money,
    private status: WagerTransactionStatus,
  ) {}

  static create(props: WagerTransactionProps): WagerTransaction {
    if (!props.id.trim()) {
      throw new Error('ID da transação inválido');
    }

    if (!props.walletId.trim()) {
      throw new Error('ID da carteira inválido');
    }

    if (props.amount.isZero() || props.amount.isNegative()) {
      throw new Error('O valor da transação deve ser positivo');
    }

    if (props.status !== WagerTransactionStatus.BET) {
      throw new Error('Uma nova transação deve começar como BET');
    }

    return new WagerTransaction(
      props.id,
      props.walletId,
      props.amount,
      props.status,
    );
  }

  static rehydrate(props: WagerTransactionProps): WagerTransaction {
    return new WagerTransaction(
      props.id,
      props.walletId,
      props.amount,
      props.status,
    );
  }

  getStatus(): WagerTransactionStatus {
    return this.status;
  }

  finish(result: WagerTransactionStatus): void {
    if (this.status !== WagerTransactionStatus.BET) {
      throw new Error('A transação já foi finalizada');
    }

    const validResults: WagerTransactionStatus[] = [
      WagerTransactionStatus.WIN,
      WagerTransactionStatus.LOSS,
      WagerTransactionStatus.REFUND,
      WagerTransactionStatus.ROLLBACK,
    ];

    if (!validResults.includes(result)) {
      throw new Error('Resultado final inválido');
    }

    this.status = result;
  }
}
