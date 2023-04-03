import { TaskInformation } from './TaskInformation';
import { TaskActionType } from '../../types/TaskActionType';
import { TaskActivity } from '../TaskActivity';
import { ViewEntity, DataSource, ViewColumn } from 'typeorm';
import { Task } from '../Task';



@ViewEntity({
  expression: (connection: DataSource) => connection
    .createQueryBuilder()
    .from(TaskInformation, 't')
    .innerJoin(TaskActivity, 'k', 't.id = k."taskId"')
    .select([
      'k.id as id',
      'k."taskId" as "taskId"',
      't."status" as "status"',
      't."name" as "taskName"',
      't."userId" as "userId"',
      't."orgId" as "orgId"',
      't."orgName" as "orgName"',
      'k."createdAt" as "createdAt"',
      'k."by" as "by"',
      'k."type" as "type"',
      'k."info" as "info"',
    ]),
  dependsOn: [TaskInformation, TaskActivity]
}) export class TaskActivityInformation {
  @ViewColumn()
  id: string;

  @ViewColumn()
  taskId: string;

  @ViewColumn()
  status: string;

  @ViewColumn()
  taskName: string;

  @ViewColumn()
  userId: string;

  @ViewColumn()
  orgId: string;

  @ViewColumn()
  orgName: string;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  by: string;

  @ViewColumn()
  type: TaskActionType;

  @ViewColumn()
  info: any;
}
