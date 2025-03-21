"use client"
import React, { useState } from "react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
  TableSelectAll,
  TableBatchActions,
  TableBatchAction,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableContainer,
  Button,
  Modal,
} from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";

const initialHeaders = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
];

const initialRows = [
  { id: "1", name: "John Doe", email: "john.doe@example.com" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
  { id: "3", name: "Sam Wilson", email: "sam.wilson@example.com" },
  { id: "4", name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: "5", name: "Bob Brown", email: "bob.brown@example.com" },
];

const DataModel = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBatchDelete = () => {
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setIsModalOpen(false);
  };

  const cancelBatchDelete = () => {
    setIsModalOpen(false);
    setSelectedRows([]);
  };

  return (
    <TableContainer title="Batch Action Data Table" description="Manage your data">
      <DataTable rows={rows} headers={initialHeaders}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <>
              <TableToolbar>
                <TableBatchActions {...batchActionProps}>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Delete
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <TableToolbarSearch onChange={onInputChange} />
                  <Button onClick={() => alert("Add new row")} kind="primary">
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header) => {
                      const { key, ...rest } = getHeaderProps({ header });
                      return (
                        <TableHeader key={header.key} {...rest}>
                          {header.header}
                        </TableHeader>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const { key, ...rest } = getRowProps({ row });
                    return (
                      <TableRow key={row.id} {...rest}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <Modal
                open={isModalOpen}
                modalHeading="Delete Confirmation"
                primaryButtonText="Confirm"
                secondaryButtonText="Cancel"
                onRequestClose={cancelBatchDelete}
                onRequestSubmit={handleBatchDelete}
              >
                <p>Are you sure you want to delete the selected rows? This action cannot be undone.</p>
              </Modal>
            </>
          );
        }}
      </DataTable>
    </TableContainer>
  );
};

export default DataModel;