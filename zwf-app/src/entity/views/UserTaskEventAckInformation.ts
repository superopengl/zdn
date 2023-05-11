import { TaskTagsTag } from '../TaskTagsTag';
import { Role } from '../../types/Role';
import { ViewEntity, DataSource, ViewColumn } from 'typeorm';
import { Femplate } from '../Femplate';
import { Task } from '../Task';
import { TaskStatus } from '../../types/TaskStatus';
import { Org } from '../Org';
import { User } from '../User';
import { UserProfile } from '../UserProfile';
import { Tag } from '../Tag';
import { OrgClient } from '../OrgClient';
import { TaskEvent } from '../TaskEvent';
import { TaskEventAck } from '../TaskEventAck';
import { OrgClientInformation } from './OrgClientInformation';
import { TaskEventType } from '../../types/TaskEventType';
import { OrgMemberInformation } from './OrgMemberInformation';
import { TaskWatchlist } from '../TaskWatchlist';

@ViewEntity({
  expression: (connection: DataSource) => connection
    .createQueryBuilder()
    .from(Task, 't')
    .innerJoin(TaskEvent, 'e', `e."taskId" = t.id`)
    .innerJoin(TaskWatchlist, 'w', `w."taskId" = t."id"`)
    .leftJoin(TaskEventAck, 'a', 'a."userId" = w."userId" AND a."taskEventId" = e.id')
    .where(`e.by != w."userId"`)
    .select([
      'e.id as "eventId"',
      'w."userId" as "userId"',
      't."orgId" as "orgId"',
      't."orgClientId" as "orgClientId"',
      't.id as "taskId"',
      't.name as "taskName"',
      'e."type" as "type"',
      'e."info" as "info"',
      'e."createdAt" as "eventAt"',
      'e."by" as "eventBy"',
      'a."ackAt" as "ackAt"',
    ])
    .orderBy('e."createdAt"', 'DESC'),
  dependsOn: [Task, OrgMemberInformation, TaskEvent, TaskEventAck, TaskWatchlist]
}) export class UserTaskEventAckInformation {
  @ViewColumn()
  eventId: string;

  @ViewColumn()
  userId: string;

  @ViewColumn()
  orgId: string;

  @ViewColumn()
  orgClientId: string;

  @ViewColumn()
  taskId: string;

  @ViewColumn()
  taskName: string;

  @ViewColumn()
  type: TaskEventType;

  @ViewColumn()
  info: any;

  @ViewColumn()
  eventAt: Date;

  @ViewColumn()
  eventBy: string;

  @ViewColumn()
  ackAt: Date;
}