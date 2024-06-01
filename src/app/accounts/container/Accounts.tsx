import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { TextEditor } from "@/app/shared/ui/components/TextEditor";

import { Dropdown } from "primereact/dropdown";
import { DropdownEditor } from "@/app/shared/ui/components/DropdownEditor";

import { DataTable } from "primereact/datatable";

import socialmedia from "@/accounts/data/socialmedia.json";
import statusAccount from "@/accounts/data/statusAccount.json";
import revisionAccount from "@/accounts/data/revisionAccount.json";

import { useEffect, useState } from "react";
import { useAccounts } from "@/accounts/hooks/useAccounts";
import { InputNumber } from "primereact/inputnumber";
import { useCheckRoleUser } from "@/app/shared/hooks/useCheckRoleUser/useCheckRoleUser";

export const Accounts = () => {
  const {
    allowEdit,
    handleDeleteSelected,
    handleSubmitAccount,
    idBodyTemplate,
    idOldBodyTemplate,
    handleGetAccountsById,
    idNewBodyTemplate,
    onRowEditComplete,
    account,
    accounts,
    selectedAccount,
    setAccount,
    setSelectedAccount,
    status,
  } = useAccounts();

  const [isAdmin] = useCheckRoleUser();

  const [customers, setCustomers] = useState([] as any);

  const handleGetCustomers = async () => {
    try {
      const response = await fetch("/api/accounts/");
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
      <form onSubmit={() => handleGetAccountsById(account.idprofile)}>
        <div>
          <span className="p-float-label">
            <InputText
              id="idprofile"
              value={account.idprofile}
              onChange={(e) =>
                setAccount((prev) => ({ ...prev, idprofile: e.target.value }))
              }
              required
            />
            <label htmlFor="idprofile">Buscar Id Perfil</label>
          </span>
        </div>
      </form>
      <form
        onSubmit={handleSubmitAccount}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          margin: "2rem 0 4rem 0",
        }}
      >
        <span className="p-float-label">
          <InputText
            id="email"
            value={account.email}
            onChange={(e) =>
              setAccount((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <label htmlFor="email">Correo Electrónico:</label>
        </span>
        <div className="card flex justify-content-center">
          <Dropdown
            value={account.typeaccount}
            onChange={(e) =>
              setAccount(
                (prev) => ({ ...prev, typeaccount: e.target.value } as any)
              )
            }
            options={socialmedia}
            optionLabel={account.typeaccount ? "value" : "label"}
            placeholder="Selecciona el tipo de cuenta:"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <div>
          <span className="p-float-label">
            <InputNumber
              id="number-input"
              value={account.phone}
              onValueChange={(e) =>
                setAccount((prev) => ({ ...prev, phone: e.value } as any))
              }
              useGrouping={false}
              required
            />
            <label htmlFor="number-input">Número Telefónico:</label>
          </span>
        </div>
        <span className="p-float-label">
          <InputText
            id="username"
            value={account.username}
            onChange={(e) =>
              setAccount((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <label htmlFor="username">Nombre Usuario:</label>
        </span>
        <span className="p-float-label">
          <InputText
            id="passaccount"
            value={account.passaccount}
            onChange={(e) =>
              setAccount((prev) => ({ ...prev, passaccount: e.target.value }))
            }
          />
          <label htmlFor="passaccount">Contraseña:</label>
        </span>
        <div className="card flex justify-content-center">
          <Dropdown
            value={account.status}
            onChange={(e) =>
              setAccount((prev) => ({ ...prev, status: e.target.value } as any))
            }
            options={statusAccount}
            optionLabel={account.status ? "value" : "label"}
            placeholder="Selecciona el estado:"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <div className="card flex justify-content-center">
          <Dropdown
            value={account.revision}
            onChange={(e) =>
              setAccount(
                (prev) => ({ ...prev, revision: e.target.value } as any)
              )
            }
            options={revisionAccount}
            optionLabel={account.revision ? "value" : "label"}
            placeholder="Revisión:"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <span className="p-float-label">
          <InputText
            id="comments"
            value={account.comments}
            onChange={(e) =>
              setAccount((prev) => ({ ...prev, comments: e.target.value }))
            }
          />
          <label htmlFor="comments">Comentarios adicionales:</label>
        </span>
        <Button
          label="Registrar"
          raised
          disabled={
            !account.idprofile ||
            !account.email ||
            !account.typeaccount ||
            !account.username ||
            !account.passaccount ||
            !account.status ||
            !account.revision
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
        {selectedAccount && selectedAccount[0] && (
          <>
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => handleDeleteSelected(selectedAccount as any)}
              disabled={!selectedAccount}
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
        value={accounts}
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
        selection={selectedAccount}
        selectionMode={"checkbox" as any}
        onSelectionChange={(event: any) => setSelectedAccount(event.value)}
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
          header="Id account"
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
          editor={(options) => TextEditor(options as any)}
          field="email"
          header="Correo Electrónico"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) =>
            DropdownEditor(options as any, socialmedia as any)
          }
          field="typeaccount"
          header="Red Social"
          sortable
          filter
          style={{ width: "20%", maxWidth: "20rem" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="username"
          filter
          header="Usuario"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="passaccount"
          header="Contraseña"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="phone"
          header="Número Telefónico"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) =>
            DropdownEditor(options as any, statusAccount as any)
          }
          field="status"
          header="Estado Cuenta"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) =>
            DropdownEditor(options as any, revisionAccount as any)
          }
          field="revision"
          header="Revisión"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="comments"
          header="Anotaciones"
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
