import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { TextEditor } from "@/app/shared/ui/components/TextEditor";

import { useProfiles } from "@/profiles/hooks/useProfiles";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { DropdownEditor } from "@/app/shared/ui/components/DropdownEditor";

import genders from "@/profiles/data/genders.json";
import cities from "@/profiles/data/cities.json";
import { DataTable } from "primereact/datatable";

export const Profiles = () => {
  const {
    allowEdit,
    handleDeleteSelected,
    handleSubmitProfile,
    idBodyTemplate,
    idOldBodyTemplate,
    onRowEditComplete,
    profile,
    profiles,
    selectedProfile,
    setProfile,
    setSelectedProfile,
    status,
  } = useProfiles();

  return (
    <section
      style={{
        marginTop: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmitProfile}
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
              id="profilename"
              value={profile.profilename}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, profilename: e.target.value }))
              }
              required
            />
            <label htmlFor="profilename">Nombres</label>
          </span>
        </div>
        <span className="p-float-label">
          <InputText
            id="profilelastname"
            value={profile.profilelastname}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                profilelastname: e.target.value,
              }))
            }
          />
          <label htmlFor="profilelastname">Apellidos</label>
        </span>
        <div className="card flex justify-content-center">
          <Dropdown
            value={profile.gender}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, gender: e.target.value } as any))
            }
            options={genders}
            optionLabel={profile.gender ? "value" : "label"}
            placeholder="Selecciona el género"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <span className="p-float-label">
          <InputText
            id="profession"
            value={profile.profession}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, profession: e.target.value }))
            }
          />
          <label htmlFor="profession">Profesión</label>
        </span>
        <div className="card flex justify-content-center">
          <Dropdown
            value={profile.city}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, city: e.target.value } as any))
            }
            options={cities}
            optionLabel={profile.city ? "value" : "label"}
            placeholder="Selecciona el departamento"
            className="w-full md:w-14rem"
            required
            showClear
          />
        </div>
        <span className="p-float-label">
          <Calendar
            id="birthdate"
            value={new Date(profile.birthdate)}
            onChange={(e) =>
              setProfile((prev) => ({
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
            !profile.profilename ||
            !profile.profilelastname ||
            !profile ||
            !profile.gender ||
            !profile.profession ||
            !profile.city ||
            !profile.birthdate
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
        {selectedProfile && selectedProfile[0] && (
          <>
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => handleDeleteSelected(selectedProfile as any)}
              disabled={!selectedProfile}
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
        value={profiles}
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
        selection={selectedProfile}
        selectionMode={"checkbox" as any}
        onSelectionChange={(event: any) => setSelectedProfile(event.value)}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "10%" }}
          exportable={false}
        ></Column>
        <Column
          field="_id"
          filter
          header="Id New"
          sortable
          sortField="_id"
          showFilterOperator
          style={{ width: "120%" }}
          body={idBodyTemplate}
        ></Column>
        <Column
          field="idold"
          filter
          header="ID Old"
          sortable
          style={{ width: "60%" }}
          body={idOldBodyTemplate}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="profilename"
          header="Nombres"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="profilelastname"
          header="Apellidos"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => DropdownEditor(options as any, genders as any)}
          field="gender"
          header="Género"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="profession"
          header="Profesión"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => TextEditor(options as any)}
          field="birthdate"
          header="Fecha de Nacimiento"
          sortable
          style={{ width: "10%" }}
        ></Column>
        <Column
          editor={(options) => DropdownEditor(options as any, cities as any)}
          field="city"
          header="Ciudad"
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
