import React, { ReactElement, ReactNode } from 'react'
import DataTable, { IDataTableProps } from 'react-data-table-component'
import Loader from '../Loader'
import Pagination from '@shared/Pagination'
import styles from './index.module.css'

export interface TableProps extends IDataTableProps {
  isLoading?: boolean
  emptyMessage?: string
  sortField?: string
  sortAsc?: boolean
  className?: string
  chainIds: number[]
}

function Empty({
  message,
  chainIds
}: {
  message?: string
  chainIds: number[]
}): ReactElement {
  return (
    <div className={styles.empty}>
      {chainIds.length === 0
        ? 'No network selected'
        : message || 'No results found'}
    </div>
  )
}

export default function Table({
  data,
  columns,
  isLoading,
  emptyMessage,
  pagination,
  paginationPerPage,
  sortField,
  sortAsc,
  className,
  chainIds,
  ...props
}: TableProps): ReactElement {
  return (
    <DataTable
      columns={columns}
      data={data}
      className={className ? styles.table + ` ${className}` : styles.table}
      noHeader
      pagination={pagination || data?.length >= 9}
      paginationPerPage={paginationPerPage || 10}
      noDataComponent={<Empty message={emptyMessage} chainIds={chainIds} />}
      progressPending={isLoading}
      progressComponent={<Loader />}
      paginationComponent={Pagination as unknown as ReactNode}
      defaultSortField={sortField}
      defaultSortAsc={sortAsc}
      {...props}
    />
  )
}
