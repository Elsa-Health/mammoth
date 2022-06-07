import {EMR} from './store';
import {CTCPatient} from './types';
import {deleteDoc, Document, getDocs} from 'papai/collection';
import {CollectionNode} from 'papai/collection/core';
import {List, OrderedMap} from 'immutable';
import {reduceRight} from 'lodash';

type FieldSelector<T> = <F extends string | number>(item: T) => F;
type OrderQueryClause<T> = {type?: 'asc' | 'desc'; field: FieldSelector<T>};

type Query<T> = {
  where?: WhereQueryClause<T>;
  order?: OrderQueryClause<T>;
};

type UnitWhereQuery<T> = (item: T) => boolean;
type WhereQueryClause<T> = {
  $or?: UnitWhereQuery<T>[];
  $and?: UnitWhereQuery<T>[];
};

function queryFrom<T extends Document.Data>(data: List<T>, q: Query<T>) {
  // query information
  const {where, order} = q;

  if (where === undefined) {
    if (order !== undefined) {
      return queryFromOrder(data, order);
    }
  } else {
    if (order === undefined) {
      return queryFromWhere(data, where);
    } else {
      return queryFromOrder(queryFromWhere(data, where), order);
    }
  }

  // if nothing is specified, pass in the same data
  return data;
}

function queryFromOrder<T extends Document.Data>(
  data: List<T>,
  orderClause: OrderQueryClause<T>,
): List<T> {
  const {type = 'asc', field} = orderClause;
  const ascData = data.sortBy(field);
  return type === 'asc' ? ascData : ascData.reverse();
}

function queryFromWhere<T extends Document.Data>(
  data: List<T>,
  whereClause: WhereQueryClause<T>,
): List<T> {
  const {$or = [], $and = []} = whereClause;

  return (
    $or.length !== 0 ? data.filter(row => $or.some(orFn => orFn(row))) : data
  ).filter(row => $and.every(andFn => andFn(row)));
}

export async function queryCollection<T extends Document.Data>(
  collection: CollectionNode<T>,
  query: Query<T>,
) {
  const data = await getDocs(collection);

  if (data === null) {
    return List([]);
  }

  return queryFrom(
    List(data.map(([_, doc]) => doc).filter(d => d !== null)),
    query,
  );
}
