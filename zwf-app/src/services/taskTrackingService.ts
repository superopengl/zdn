import { getUtcNow } from './../utils/getUtcNow';
import { TaskTracking } from './../entity/TaskTracking';
import { TaskActionType } from './../types/TaskActionType';
import { EntityManager } from 'typeorm';
import { assert } from '../utils/assert';
import { Task } from '../entity/Task';
import { TaskTrackingLastAccess } from '../entity/TaskTrackingLastAccess';

async function insertNewTrackingEntity(m: EntityManager, action: TaskActionType, taskId: string, by: string, info?: any) {
  assert(taskId, 500);
  const entity = new TaskTracking();
  entity.action = action;
  entity.taskId = taskId;
  entity.by = by;
  entity.info = info;
  const result = await m.save(entity);
  await nudgeTrackingAccess(m, taskId, by);
  return result;
}

export async function nudgeTrackingAccess(m: EntityManager, taskId: string, userId: string) {
  await m.createQueryBuilder()
    .insert()
    .into(TaskTrackingLastAccess)
    .values({ taskId, userId })
    .onConflict(`("taskId", "userId") DO UPDATE SET "lastAccessAt" = now()`)
    .execute();
}

export async function logTaskCreated(m: EntityManager, taskId: string, by: string) {
  return await insertNewTrackingEntity(m, TaskActionType.Created, taskId, by);
}

export async function logTaskAssigned(m: EntityManager, taskId: string, by: string, assigneeId: string) {
  return await insertNewTrackingEntity(m, TaskActionType.Assigned, taskId, by, assigneeId);
}

export async function logTaskRenamed(m: EntityManager, taskId: string, by: string, newName: string) {
  return await insertNewTrackingEntity(m, TaskActionType.Assigned, taskId, by, newName);
}

export async function logTaskRequestedClientForInfo(m: EntityManager, taskId: string, by: string) {
  return await insertNewTrackingEntity(m, TaskActionType.RequestedClientForInfo, taskId, by);
}

export async function logTaskRequestedClientForSign(m: EntityManager, taskId: string, by: string) {
  return await insertNewTrackingEntity(m, TaskActionType.RequestedClientForSign, taskId, by);
}

export async function logTaskClientSubmitted(m: EntityManager, taskId: string) {
  const task = await m.findOne(Task, taskId);
  assert(task, 500);
  return await insertNewTrackingEntity(m, TaskActionType.ClientSubmitted, taskId, task.userId);
}

export async function logTaskClientSigned(m: EntityManager, taskId: string) {
  const task = await m.findOne(Task, taskId);
  assert(task, 500);
  return await insertNewTrackingEntity(m, TaskActionType.ClientSigned, taskId, task.userId);
}

export async function logTaskCompleted(m: EntityManager, taskId: string, by: string) {
  return await insertNewTrackingEntity(m, TaskActionType.Completed, taskId, by);
}

export async function logTaskArchived(m: EntityManager, taskId: string, by: string) {
  return await insertNewTrackingEntity(m, TaskActionType.Archived, taskId, by);
}

export async function logTaskMovedToToDo(m: EntityManager, taskId: string, by: string) {
  return await insertNewTrackingEntity(m, TaskActionType.MovedToToDo, taskId, by);
}

export async function logTaskMovedToInProgress(m: EntityManager, taskId: string, by: string) {
  return await insertNewTrackingEntity(m, TaskActionType.MovedToInProgress, taskId, by);
}

export async function logTaskChat(m: EntityManager, taskId: string, by: string, message: string) {
  return await insertNewTrackingEntity(m, TaskActionType.Chat, taskId, by, message);
}