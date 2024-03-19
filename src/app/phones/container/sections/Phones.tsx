import { useCallback, useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import { usePhones } from "@/phones/hooks/usePhones";
import { Tag } from "primereact/tag";

export interface RowsData {
  _id: string;
  number: string;
  operator: string;
  comment: string;
}

export interface Status {
  show: boolean;
  value: string;
  notification: string;
  res: "ok" | "error";
}

export interface Copied {
  success: boolean;
  value: string;
}

export const Phones = () => {
  const {
    phones,
    allowEdit,
    onRowEditComplete,
    numberEditor,
    textEditor,
    setPhones,
    handleFetch,
  } = usePhones();

  const [phone, setPhone] = useState();
  const [operator, setOperator] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedPhone, setSelectedPhone] = useState(null);

  const [copied, setCopied] = useState<Copied>({
    success: false,
    value: "",
  });

  const [status, setStatus] = useState<Status>({
    show: false,
    value: "",
    notification: "",
    res: "ok",
  });

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
        setPhones([...phones, phone]);
        setStatus({
          show: true,
          value: `Número ${phone.number} Registrado exitosamente!`,
          notification: "insert",
          res: "ok",
        });
      })
      .catch((error) => {
        setStatus({
          show: true,
          value: `Registro fallido! Error: ${error.message}`,
          notification: "insert",
          res: "error",
        });
      });

    handleEmptyForm();
    handleFetch();
  };

  const handleEmptyForm = () => {
    setPhone("" as any);
    setOperator(null);
    setComment("");
  };

  const handleChangeOperator = (e: any) => {
    setOperator(e.value);
  };

  const showAlertDelete = (rows: RowsData[]) => {
    const complementaryText = `${rows.length} ${
      rows.length > 1 ? "registros" : "registro"
    }`;

    const confirm = prompt(
      `¿Estás seguro de eliminar ${complementaryText}. Escriba "borr4r ${complementaryText}" para confirmar.`
    );
    if (confirm === `borr4r ${complementaryText}`) {
      return true;
    } else {
      alert("Eliminación cancelada");
      return false;
    }
  };

  const handleDeleteSelected = (rows: RowsData[]) => {
    if (!showAlertDelete(rows)) {
      return;
    }

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
        alert(
          `Eliminación exitosa de ${phones.length} ${
            phones.length > 1 ? "registros" : "registro"
          }!`
        );
        setSelectedPhone(null);
      })
      .catch((error) => {
        alert(`Eliminación fallida! Error: ${error.message}`);
      });
    handleFetch();
  };

  const numberBodyTemplate = (rowData: RowsData) => {
    return (
      <div>
        <button
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "1rem",
          }}
          onClick={(e) => {
            navigator.clipboard.writeText(rowData.number);
            setCopied({ success: true, value: rowData.number });
            setTimeout(() => {
              setCopied({ success: false, value: "" });
            }, 3000);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigator.clipboard.writeText(rowData.number);
              setCopied({ success: true, value: rowData.number });
              setTimeout(() => {
                setCopied({ success: false, value: "" });
              }, 3000);
            }
          }}
        >
          {rowData.number}
        </button>
        {copied.success && copied.value === rowData.number && (
          <Tag
            value="Copiado!"
            severity="success"
            style={{ marginLeft: "1rem", height: "1rem" }}
          />
        )}
      </div>
    );
  };

  const closestatus = useCallback(() => {
    if (status.show) {
      setTimeout(() => {
        setStatus({ show: false, value: "", notification: "", res: "ok" });
      }, 5000);
    }
  }, [status]);

  useEffect(() => {
    closestatus();
  }, [closestatus]);

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
                severity={
                  status.value.includes("exitoso") ? "success" : "danger"
                }
                style={{ marginLeft: "1rem" }}
                icon={
                  status.value.includes("exitoso")
                    ? "pi pi-check"
                    : "pi pi-times"
                }
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
        ></Column>
        <Column
          editor={(options) => numberEditor(options as any)}
          field="number"
          header="Número"
          sortable
          style={{ width: "20%" }}
          body={numberBodyTemplate}
        ></Column>
        <Column
          editor={(options) => textEditor(options as any)}
          field="operator"
          header="Operador"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          editor={(options) => textEditor(options as any)}
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
