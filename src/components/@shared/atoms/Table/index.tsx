import React, { ReactElement, ReactNode } from 'react'
import DataTable, { IDataTableProps } from 'react-data-table-component'
import Loader from '../Loader'
import Pagination from '@shared/Pagination'
import styles from './index.module.css'
import { useUserPreferences } from '@context/UserPreferences'

export interface TableProps extends IDataTableProps {
  isLoading?: boolean
  emptyMessage?: string
  sortField?: string
  sortAsc?: boolean
  className?: string
}

function Empty({ message }: { message?: string }): ReactElement {
  return <div className={styles.empty}>{message || 'No results found'}</div>
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
      noDataComponent={<Empty message={emptyMessage} />}
      progressPending={isLoading}
      progressComponent={<Loader />}
      paginationComponent={Pagination as unknown as ReactNode}
      defaultSortField={sortField}
      defaultSortAsc={sortAsc}
      {...props}
    />
  )
}
