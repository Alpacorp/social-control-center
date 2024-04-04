import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { TextEditor } from "@/app/shared/ui/components/TextEditor";

import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { DropdownEditor } from "@/app/shared/ui/components/DropdownEditor";

import genders from "@/actions/data/genders.json";
import cities from "@/actions/data/cities.json";
import { DataTable } from "primereact/datatable";
import { useActions } from "@/actions/hooks/useActions";

export const Actions = () => {
  const {
    allowEdit,
    handleDeleteSelected,
    handleSubmitAction,
    idBodyTemplate,
    idOldBodyTemplate,
    onRowEditComplete,
    action,
    actions,
    selectedAction,
    setAction,
    setSelectedAction,
    status,
  } = useActions();

  return (
    <section
      style={{
        marginTop: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmitAction}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          margin: "2rem 0 4rem 0",
        }}
      >
        <div>
          <span className="p-float-label">
            <InputText
              id="actionname"
              value={action.profilename}
              onChange={(e) =>
                setAction((prev) => ({ ...prev, actionname: e.target.value }))
              }
              required
            />
            <label htmlFor="actionname">Nombres</label>
          </span>
        </div>
        <span className="p-float-label">
          <InputText
            id="actionlastname"
            value={action.profilelastname}
            onChange={(e) =>
              setAction((prev) => ({
                ...prev,
                actionlastname: e.target.value,
              }))
            }
          />
          <label htmlFor="actionlastname">Apellidos</label>
        </span>
        <div className="card flex justify-content-center">
          <Dropdown
            value={action.gender}
            onChange={(e) =>
              setAction((prev) => ({ ...prev, gender: e.target.value } as any))
            }
            options={genders}
            optionLabel={action.gender ? "value" : "label"}
            placeholder="Selecciona el género"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <span className="p-float-label">
          <InputText
            id="profession"
            value={action.profession}
            onChange={(e) =>
              setAction((prev) => ({ ...prev, profession: e.target.value }))
            }
          />
          <label htmlFor="profession">Profesión</label>
        </span>
        <div className="card flex justify-content-center">
          <Dropdown
            value={action.city}
            onChange={(e) =>
              setAction((prev) => ({ ...prev, city: e.target.value } as any))
            }
            options={cities}
            optionLabel={action.city ? "value" : "label"}
            placeholder="Selecciona el departamento"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <span className="p-float-label">
          <Calendar
            id="birthdate"
            value={new Date(action.birthdate)}
            onChange={(e) =>
              setAction((prev) => ({
                ...prev,
                birthdate: e.target.value as any,
              }))
            }
          />
          <label htmlFor="birthdate">Fecha de Nacimiento</label>
        </span>
        <Button
          label="Registrar"
          raised
          disabled={
            !action.profilename ||
            !action.profilelastname ||
            !action ||
            !action.gender ||
            !action.profession ||
            !action.city ||
            !action.birthdate
          }
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
        {selectedAction && selectedAction[0] && (
          <>
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => handleDeleteSelected(selectedAction as any)}
              disabled={!selectedAction}
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
        value={actions}
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
        selection={selectedAction}
        selectionMode={"checkbox" as any}
        onSelectionChange={(event: any) => setSelectedAction(event.value)}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "10%" }}
          exportable={false}
        ></Column>
        <Column
          field="_id"
          filter
          header="Id Action"
          sortable
          sortField="_id"
          showFilterOperator
          style={{ width: "120%" }}
          body={idBodyTemplate}
        ></Column>
        <Column
          field="idprofile"
          filter
          header="ID Perfil Nuevo"
          sortable
          style={{ width: "60%" }}
          body={idOldBodyTemplate}
        ></Column>
        <Column
          field="idprofileold"
          filter
          header="ID Perfil Antiguo"
          sortable
          style={{ width: "60%" }}
          body={idOldBodyTemplate}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="socialmedia"
          header="Red Social"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="urlmention"
          header="Url Contenido o Mención"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => DropdownEditor(options as any, genders as any)}
          field="customer"
          header="Cliente"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="typeaction"
          header="Tipo de Acción"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="updatedAt"
          header="Última actualización"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="createdAt"
          header="Fecha registro"
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
