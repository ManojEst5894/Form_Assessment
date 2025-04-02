"use client";
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
import "./page.scss"; 

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

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]); 
    setIsModalOpen(false); 
  };

  const cancelBatchDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="data-model-container">
      <TableContainer
        title="Batch Action Data Table"
        description="Manage your data"
        className="table-container"
      >
        <DataTable
          rows={rows}
          headers={initialHeaders}
          onSelectionChange={({ selectedRows }: { selectedRows: { id: string }[] }) =>
            setSelectedRows(selectedRows.map((row) => row.id))
          }
        >
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
                <TableToolbar className="table-toolbar">
                  <TableBatchActions {...batchActionProps} className="batch-actions">
                    <TableBatchAction
                      renderIcon={TrashCan}
                      onClick={handleDeleteClick}
                      className="batch-action-delete"
                    >
                      Delete
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent className="toolbar-content">
                    <TableToolbarSearch
                      onChange={(event: "" | Partial<React.ChangeEventHandler<HTMLInputElement>>, value?: string) => {
                        if (typeof event !== "string" && event?.target) {
                          onInputChange(event as React.ChangeEvent<HTMLInputElement>);
                        }
                      }}
                      className="toolbar-search"
                    />
                    <Button
                      onClick={() => alert("Add new row")}
                      kind="primary"
                      className="add-new-button"
                    >
                      Add new
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table className="data-table">
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

                {/* Confirmation Modal */}
                <Modal
                  open={isModalOpen}
                  modalHeading="Delete Confirmation"
                  primaryButtonText="Confirm"
                  secondaryButtonText="Cancel"
                  onRequestClose={cancelBatchDelete}
                  onRequestSubmit={handleConfirmDelete}
                  className="confirmation-modal"
                >
                  <p>Are you sure you want to delete the selected rows? This action cannot be undone.</p>
                </Modal>
              </>
            );
          }}
        </DataTable>
      </TableContainer>
    </div>
  );
};

export default DataModel;
