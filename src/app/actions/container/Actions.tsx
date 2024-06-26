import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { TextEditor } from "@/app/shared/ui/components/TextEditor";

import { Dropdown } from "primereact/dropdown";
import { DropdownEditor } from "@/app/shared/ui/components/DropdownEditor";

import { DataTable } from "primereact/datatable";
import { useActions } from "@/actions/hooks/useActions";

import socialmedia from "@/actions/data/socialmedia.json";
import typeaction from "@/actions/data/typeaction.json";
import { useEffect, useState } from "react";
import { useCheckRoleUser } from "@/app/shared/hooks/useCheckRoleUser/useCheckRoleUser";

export const Actions = () => {
  const {
    allowEdit,
    handleDeleteSelected,
    handleSubmitAction,
    idBodyTemplate,
    idOldBodyTemplate,
    handleGetActionsById,
    idNewBodyTemplate,
    onRowEditComplete,
    action,
    actions,
    selectedAction,
    setAction,
    setSelectedAction,
    status,
  } = useActions();

  const [isAdmin] = useCheckRoleUser();

  const [customers, setCustomers] = useState([] as any);

  const handleGetCustomers = async () => {
    try {
      const response = await fetch("/api/customers/");
      const data = await response.json();
      setCustomers(data.customers);
    } catch (error) {
      console.error("GET /api/customers/ failed:", error);
    }
  };

  useEffect(() => {
    handleGetCustomers();
  }, []);

  return (
    <section
      style={{
        marginTop: "2rem",
      }}
    >
      <form onSubmit={() => handleGetActionsById(action.idprofile)}>
        <div>
          <span className="p-float-label">
            <InputText
              id="idprofile"
              value={action.idprofile}
              onChange={(e) =>
                setAction((prev) => ({ ...prev, idprofile: e.target.value }))
              }
              required
            />
            <label htmlFor="idprofile">Buscar Id Perfil</label>
          </span>
        </div>
      </form>
      <form
        onSubmit={handleSubmitAction}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          margin: "2rem 0 4rem 0",
        }}
      >
        <div className="card flex justify-content-center">
          <Dropdown
            value={action.socialmedia}
            onChange={(e) =>
              setAction(
                (prev) => ({ ...prev, socialmedia: e.target.value } as any)
              )
            }
            options={socialmedia}
            optionLabel={action.socialmedia ? "value" : "label"}
            placeholder="Selecciona la red social"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <span className="p-float-label">
          <InputText
            id="urlmention"
            value={action.urlmention}
            onChange={(e) =>
              setAction((prev) => ({ ...prev, urlmention: e.target.value }))
            }
          />
          <label htmlFor="profession">Url Mención:</label>
        </span>
        <div className="card flex justify-content-center">
          <Dropdown
            value={action.customer}
            onChange={(e) =>
              setAction(
                (prev) => ({ ...prev, customer: e.target.value } as any)
              )
            }
            options={customers.map((customer: any) => ({
              label: customer.customer,
              value: customer.customer,
            }))}
            optionLabel={action.customer ? "value" : "label"}
            placeholder="Selecciona la campaña:"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <div className="card flex justify-content-center">
          <Dropdown
            value={action.typeaction}
            onChange={(e) =>
              setAction(
                (prev) => ({ ...prev, typeaction: e.target.value } as any)
              )
            }
            options={typeaction}
            optionLabel={action.typeaction ? "value" : "label"}
            placeholder="Selecciona el tipo de acción:"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <Button
          label="Registrar"
          raised
          disabled={
            !action.idprofile ||
            !action.socialmedia ||
            !action.urlmention ||
            !action.customer ||
            !action.typeaction
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
        selectionMode={isAdmin && ("checkbox" as any)}
        onSelectionChange={(event: any) => setSelectedAction(event.value)}
      >
        {isAdmin && (
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "10%" }}
          ></Column>
        )}
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
          body={idNewBodyTemplate}
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
          editor={(options) =>
            DropdownEditor(options as any, socialmedia as any)
          }
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
          filter
          style={{ width: "20%", maxWidth: "20rem" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="customer"
          filter
          header="Cliente"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) =>
            DropdownEditor(options as any, typeaction as any)
          }
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
