import { ViewEntity, DataSource, ViewColumn, PrimaryColumn } from 'typeorm';
import { User } from '../User';
import { UserProfile } from '../UserProfile';
import { Org } from '../Org';
import { Role } from '../../types/Role';
import { UserStatus } from '../../types/UserStatus';
import { UserLoginType } from '../../types/UserLoginType';


@ViewEntity({
  expression: (connection: DataSource) => connection.createQueryBuilder()
    .from(User, 'u')
    .leftJoin(UserProfile, 'p', 'p.id = u."profileId"')
    .leftJoin(Org, 'o', 'o.id = u."orgId"')
    // .leftJoin(OrgCurrentSubscriptionInformation, 's', 's."orgId" = u."orgId"')
    // .leftJoin(LicenseTicket, 't', 't."orgId" = u."orgId" AND t."userId" = u.id')
    .leftJoin(q => q
      .from('user_tags_tag', 'tg')
      .groupBy('tg."userId"')
      .select([
        'tg."userId" as "userId"',
        'array_agg(tg."tagId") as tags'
      ]),
      'tg', 'tg."userId" = u.id')
    .select([
      'u.id as id',
      'o.id as "orgId"',
      'p.id as "profileId"',
      'u.role as role',
      'u.status as status',
      'u."emailHash" as "emailHash"',
      'u."loginType" as "loginType"',
      'u."resetPasswordToken" as "resetPasswordToken"',
      'p.email as email',
      'p."givenName" as "givenName"',
      'p.surname as surname',
      'o.name as "orgName"',
      'u."orgOwner" as "orgOwner"',
      'p."avatarFileId" as "avatarFileId"',
      'p."avatarColorHex" as "avatarColorHex"',
      'tg.tags as tags',
    ]),
  dependsOn: [User, UserProfile, Org]
})
export class UserInformation {
  @ViewColumn()
  @PrimaryColumn()
  id: string;

  @ViewColumn()
  emailHash: string;

  @ViewColumn()
  loginType: UserLoginType;

  @ViewColumn()
  resetPasswordToken: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  orgName: string;

  @ViewColumn()
  givenName: string;

  @ViewColumn()
  surname: string;

  @ViewColumn()
  role!: Role;

  @ViewColumn()
  orgId: string;

  @ViewColumn()
  profileId: string;

  @ViewColumn()
  status!: UserStatus;

  @ViewColumn()
  orgOwner: boolean;

  @ViewColumn()
  avatarFileId: string;

  @ViewColumn()
  avatarColorHex: string;

  @ViewColumn()
  tags: string[];
}
