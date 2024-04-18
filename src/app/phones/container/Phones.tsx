import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { NumberEditor } from "@/app/shared/ui/components/NumberEditor";
import { TextEditor } from "@/app/shared/ui/components/TextEditor";

import { usePhones } from "@/phones/hooks/usePhones";

import operators from "@/phones/data/operators.json";

export const Phones = () => {
  const {
    allowEdit,
    comment,
    handleDeleteSelected,
    handleSubmitPhone,
    numberBodyTemplate,
    operator,
    onRowEditComplete,
    phone,
    phones,
    selectedPhone,
    setComment,
    setPhone,
    setSelectedPhone,
    handleChangeOperator,
    status,
  } = usePhones();

  return (
    <section
      style={{
        marginTop: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmitPhone}
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
              value={phone}
              onValueChange={(e) => setPhone(e.value as any)}
              useGrouping={false}
              required
            />
            <label htmlFor="number-input">Número Telefónico:</label>
          </span>
        </div>
        <div className="card flex justify-content-center">
          <Dropdown
            value={operator}
            onChange={handleChangeOperator}
            options={operators}
            optionLabel={operator ? "value" : "label"}
            placeholder="Selecciona el operador"
            className="w-full md:w-14rem"
            required
            showClear
          />
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
          disabled={phone === 0 || !phone}
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
        {selectedPhone && selectedPhone[0] && (
          <>
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => handleDeleteSelected(selectedPhone as any)}
              disabled={!selectedPhone}
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
        value={phones}
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
        selection={selectedPhone}
        selectionMode={"checkbox" as any}
        onSelectionChange={(event: any) => setSelectedPhone(event.value)}
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
          filter
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
