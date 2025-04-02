'use client';

import React from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

interface DataTableProps {
  readonly rows: Array<{ id: string; cells: Array<{ id: string; value: string }> }> | null | undefined;
  readonly headers: Array<{ key: string; header: string }> | null | undefined;
}

function DataTableComponent({ rows, headers }: DataTableProps) {
  if (!rows || !headers) {
    return <div>No data available</div>;
  }

  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getHeaderProps, getRowProps }) => (
        <TableContainer title="Data Table" description="Example data table">
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })} key={header.key} onClick={getHeaderProps({ header }).onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })} key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
}

export default DataTableComponent;