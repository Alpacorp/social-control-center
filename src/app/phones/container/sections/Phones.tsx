import { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import { usePhones } from "@/phones/hooks/usePhones";

export interface RowsData {
  _id: string;
  number: string;
  operator: string;
  comment: string;
}

export const Phones = () => {
  const {
    phones,
    allowEdit,
    onRowEditComplete,
    numberEditor,
    textEditor,
    setPhones,
  } = usePhones();

  const [phone, setPhone] = useState();
  const [operator, setOperator] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedPhone, setSelectedPhone] = useState(null);

  console.log("selectedPhone:", selectedPhone);

  const operators = [
    { value: "Claro", label: "Claro" },
    { value: "Movistar", label: "Movistar" },
    { value: "Tigo", label: "Tigo" },
    { value: "Virgin Mobile", label: "Virgin Mobile" },
    { value: "Avantel", label: "Avantel" },
    { value: "Flash Mobile", label: "Flash Mobile" },
    { value: "ETB", label: "ETB" },
    { value: "Uff Móvil", label: "Uff Móvil" },
    { value: "WOM", label: "WOM" },
    { value: "Exito Móvil", label: "Exito Móvil" },
  ];

  const handleSubmitPhone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/phones/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: phone,
        operator,
        comment,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create the phone record");
        }
        return response.json();
      })
      .then((phone) => {
        console.log("Created phone:", phone);
        setPhones([...phones, phone]);
      })
      .catch((error) => {
        console.error("Failed to create the phone record:", error);
      });

    handleEmptyForm();
  };

  const handleEmptyForm = () => {
    setPhone("" as any);
    setOperator(null);
    setComment("");
  };

  const handleChangeOperator = (e: any) => {
    setOperator(e.value);
    console.log("operator:", e.value);
  };

  const handleDeleteSelected = (rows: RowsData[]) => {
    const deletePromises = rows.map((row) =>
      fetch(`/api/phones/${row._id}`, {
        method: "DELETE",
      })
    );

    Promise.all(deletePromises)
      .then((responses) => {
        const allSuccessful = responses.every((response) => response.ok);
        if (!allSuccessful) {
          throw new Error("Failed to delete some phone records");
        }
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((phones) => {
        console.log("Deleted phones:", phones);
      })
      .catch((error) => {
        console.error("Failed to delete phone records:", error);
      });
  };

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
            <label htmlFor="number-input">Number</label>
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
      </form>
      <Button
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        onClick={() => handleDeleteSelected(selectedPhone as any)}
        disabled={!selectedPhone}
      />
      <DataTable
        value={phones}
        tableStyle={{ minWidth: "50rem" }}
        editMode="row"
        dataKey="_id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        // loading={
        //   !phones ||
        //   (phones && phones.length === 0) ||
        //   phones === undefined ||
        //   phones === null
        // }
        onRowEditComplete={onRowEditComplete}
        resizableColumns
        showGridlines
        removableSort
        reorderableColumns
        selection={selectedPhone}
        onSelectionChange={(e) => setSelectedPhone(e.value as any)}
      >
        <Column selectionMode="multiple" exportable={false}></Column>
        <Column
          field="_id"
          header="_id"
          sortable
          sortField="_id"
          showFilterOperator
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
    </section>
  );
};
