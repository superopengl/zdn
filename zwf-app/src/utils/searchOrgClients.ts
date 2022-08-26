import { OrgClientStatInformation } from './../entity/views/OrgClientStatInformation';
import { getRepository } from 'typeorm';
import { assert } from './assert';
import { OrgClientInformation } from '../entity/views/OrgClientInformation';
import { db } from '../db';

export type StockUserParams = {
  text?: string;
  page: number;
  size: number;
  orderField: string;
  orderDirection: 'ASC' | 'DESC';
  tags: string[];
};

export async function searchOrgClients(orgId: string, queryInfo: StockUserParams) {
  const { text, page, size, orderField, orderDirection, tags } = queryInfo;

  const pageNo = page || 1;
  const pageSize = size || 50;
  assert(pageNo >= 1 && pageSize > 0, 400, 'Invalid page and size parameter');

  let query = db.getRepository(OrgClientStatInformation)
    .createQueryBuilder()
    .where('"orgId" = :orgId', { orgId });

  if (text) {
    query = query.andWhere('(email ILIKE :text OR "givenName" ILIKE :text OR "surname" ILIKE :text)', { text: `%${text}%` });
  }

  if (tags?.length) {
    query = query.andWhere('(tags && array[:...tags]::uuid[]) IS TRUE', { tags });
  }

  const count = await query.getCount();

  const data = await query.orderBy(orderField, orderDirection)
    // .addOrderBy('email', 'ASC')
    .offset((pageNo - 1) * pageSize)
    .limit(pageSize)
    .getMany();

  return {
    count,
    page: pageNo,
    data
  };
}
