import { Migration } from '@mikro-orm/migrations';

export class Migration20261017035542 extends Migration {

  override name = 'Migration20261017035542';

  override up(): void | Promise<void> {
    this.addSql(`create table "wallets" ("id" varchar(36) not null, "currency" varchar(3) not null, "balance" varchar(255) not null default '0.00', "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "wallets" cascade;`);
  }

}
