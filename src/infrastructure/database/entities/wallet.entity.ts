
import {
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'wallets' })
export class WalletEntity {
  @PrimaryKey({ type: 'string', length: 36 })
  id!: string;

  @Property({ type: 'string', length: 3 })
  currency!: string;

  @Property({ type: 'string', default: '0.00' })
  balance!: string;

  @Property({ type: 'Date' })
  createdAt: Date = new Date();

  @Property({
    type: 'Date',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}