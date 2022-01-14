import { ViewEntity, Connection, ViewColumn, PrimaryColumn } from 'typeorm';
import { SubscriptionStatus } from '../../types/SubscriptionStatus';
import { SubscriptionType } from '../../types/SubscriptionType';
import { Subscription } from '../Subscription';
import { Payment } from '../Payment';
import { CreditTransaction } from '../CreditTransaction';
import { PaymentStatus } from '../../types/PaymentStatus';
import { OrgBasicInformation } from '../views/OrgBasicInformation';
import { OrgPaymentMethod } from '../OrgPaymentMethod';



@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .from(Payment, 'p')
    .innerJoin(OrgPaymentMethod, 'm', 'p."orgPaymentMethodId" = m.id')
    .innerJoin(Subscription, 's', 'p."subscriptionId" = s.id')
    .innerJoin(OrgBasicInformation, 'org', 'p."orgId" = org.id')
    .leftJoin(CreditTransaction, 'c', 'p."creditTransactionId" = c.id')
    .where(`p.status = '${PaymentStatus.Paid}'`)
    .orderBy('p."paidAt"', 'DESC')
    .select([
      'p.id as "paymentId"',
      'p."seqId" as "paymentSeq"',
      's.id as "subscriptionId"',
      'c.id as "creditTransactionId"',
      'p."orgId" as "orgId"',
      `p.geo ->> 'country' as country`,
      's.type as "subscriptionType"',
      's.status as "subscriptionStatus"',
      'org."ownerEmail" as email',
      `to_char(p."paidAt", 'YYYYMMDD-') || lpad(p."seqId"::text, 8, '0') as "receiptNumber"`,
      'p."paidAt" as "paidAt"',
      'p.start as start',
      'p.end as end',
      'coalesce(p.amount, 0) - coalesce(c.amount, 0) as price',
      'coalesce(p.amount, 0) as payable',
      'coalesce(-c.amount, 0) as deduction',
      'm."cardLast4" as "cardLast4"'
    ])
})
export class ReceiptInformation {
  @ViewColumn()
  @PrimaryColumn()
  paymentId: string;

  @ViewColumn()
  paymentSeq: string;

  @ViewColumn()
  subscriptionId: string;

  @ViewColumn()
  creditTransactionId: string;

  @ViewColumn()
  orgId: string;

  @ViewColumn()
  country: string;

  @ViewColumn()
  subscriptionType: SubscriptionType;

  @ViewColumn()
  subscriptionStatus: SubscriptionStatus;

  @ViewColumn()
  email: string;

  @ViewColumn()
  receiptNumber: string;

  @ViewColumn()
  paidAt: Date;

  @ViewColumn()
  start: Date;

  @ViewColumn()
  end: Date;

  @ViewColumn()
  price: number;

  @ViewColumn()
  payable: number;

  @ViewColumn()
  deduction: number;

  @ViewColumn()
  cardLast4: string;
}
