import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { usePhones } from "../../hooks/usePhones";

export const Phones = () => {
  const { phones, allowEdit, onRowEditComplete, numberEditor, textEditor } =
    usePhones();

  return (
    <div className="card">
      <DataTable
        value={phones}
        tableStyle={{ minWidth: "50rem" }}
        editMode="row"
        dataKey="_id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        loading={phones.length === 0}
        onRowEditComplete={onRowEditComplete}
        resizableColumns
        showGridlines
      >
        <Column
          field="_id"
          header="_id"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => numberEditor(options as any)}
          field="number"
          header="Number"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => textEditor(options as any)}
          field="operator"
          header="Operator"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => textEditor(options as any)}
          field="comment"
          header="Comment"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          rowEditor={allowEdit}
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
};
