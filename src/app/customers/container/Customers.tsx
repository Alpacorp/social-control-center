import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { NumberEditor } from "@/app/shared/ui/components/NumberEditor";
import { TextEditor } from "@/app/shared/ui/components/TextEditor";

import { useCustomers } from "@/customers/hooks/useCustomers";

export const Customers = () => {
  const {
    allowEdit,
    comment,
    handleDeleteSelected,
    handleSubmitCustomer,
    numberBodyTemplate,
    onRowEditComplete,
    customer,
    customers,
    selectedCustomer,
    setComment,
    setCustomer,
    setSelectedCustomer,
    status,
  } = useCustomers();

  return (
    <section
      style={{
        marginTop: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmitCustomer}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          margin: "2rem 0 4rem 0",
        }}
      >
        <div>
          <span className="p-float-label">
            <InputNumber
              id="number-input"
              value={customer}
              onValueChange={(e) => setCustomer(e.value as any)}
              useGrouping={false}
              required
            />
            <label htmlFor="number-input">Number</label>
          </span>
        </div>
        <span className="p-float-label">
          <InputText
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <label htmlFor="comment">Comentarios</label>
        </span>
        <Button
          label="Registrar"
          raised
          disabled={customer === 0 || !customer}
          className="mt-4"
        />
        {status.show && status.notification === "insert" && (
          <Tag
            value={status ? status.value : ""}
            severity={status.res === "ok" ? "success" : "danger"}
            style={{ marginLeft: "1rem" }}
            icon={status.res === "ok" ? "pi pi-check" : "pi pi-times"}
          />
        )}
      </form>
      <div style={{ height: "39px", marginBottom: "20px" }}>
        {selectedCustomer && selectedCustomer[0] && (
          <>
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => handleDeleteSelected(selectedCustomer as any)}
              disabled={!selectedCustomer}
            />

            {status.show && status.notification === "delete" && (
              <Tag
                value={status ? status.value : ""}
                severity={status.res === "ok" ? "success" : "danger"}
                style={{ marginLeft: "1rem" }}
                icon={status.res === "ok" ? "pi pi-check" : "pi pi-times"}
              />
            )}
          </>
        )}
      </div>

      <DataTable
        value={customers}
        tableStyle={{ minWidth: "50rem" }}
        editMode="row"
        dataKey="_id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
        onRowEditComplete={onRowEditComplete}
        resizableColumns
        showGridlines
        removableSort
        reorderableColumns
        selection={selectedCustomer}
        selectionMode={"checkbox" as any}
        onSelectionChange={(event: any) => setSelectedCustomer(event.value)}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "10%" }}
          exportable={false}
        ></Column>
        <Column
          field="_id"
          header="Identificador"
          sortable
          sortField="_id"
          showFilterOperator
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => NumberEditor(options as any)}
          field="number"
          header="Número"
          sortable
          style={{ width: "20%" }}
          body={numberBodyTemplate}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="operator"
          header="Operador"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="comment"
          header="Comentarios adicionales"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          rowEditor={allowEdit}
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
          field="action"
          header="Acciones"
        ></Column>
      </DataTable>
    </section>
  );
};
