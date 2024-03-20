import { useCallback, useEffect, useState } from "react";

import { Copied, Product, RowsData, Status } from "@/phones/interfaces/phones";
import { Tag } from "primereact/tag";

export const usePhones = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [phone, setPhone] = useState();
  const [operator, setOperator] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [status, setStatus] = useState<Status>({
    show: false,
    value: "",
    notification: "",
    res: "ok",
  });
  const [copied, setCopied] = useState<Copied>({
    success: false,
    value: "",
  });

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const handleGetPhones = async () => {
    try {
      const response = await fetch("/api/phones/");
      const data = await response.json();
      setPhones(data.phones);
    } catch (error) {
      console.error("GET /api/phones/ failed:", error);
    }
  };

  const handleChangeOperator = (event: {
    value: any;
    target: { value: any };
  }) => {
    setOperator(event.value);
  };

  const onRowEditComplete = async (event: { newData: any; index: any }) => {
    let { newData, index } = event;
    let _products = [...phones];
    _products[index] = newData;
    setPhones(_products);

    try {
      const response = await fetch(`/api/phones/${newData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("Failed to update the phone record");
      }
      await response.json();
    } catch (error) {
      console.error("Failed to update the phone record:", error);
    }
  };

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
    handleGetPhones();
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
    handleGetPhones();
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

  const handleEmptyForm = () => {
    setPhone("" as any);
    setOperator(null);
    setComment("");
  };

  const closestatus = useCallback(() => {
    if (status.show) {
      setTimeout(() => {
        setStatus({ show: false, value: "", notification: "", res: "ok" });
      }, 5000);
    }
  }, [status]);

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

  useEffect(() => {
    closestatus();
  }, [closestatus]);

  useEffect(() => {
    handleGetPhones();
  }, []);

  return {
    allowEdit,
    closestatus,
    comment,
    handleChangeOperator,
    handleDeleteSelected,
    handleEmptyForm,
    handleGetPhones,
    handleSubmitPhone,
    numberBodyTemplate,
    onRowEditComplete,
    operator,
    phone,
    phones,
    selectedPhone,
    setComment,
    setOperator,
    setPhone,
    setSelectedPhone,
    showAlertDelete,
    status,
  };
};
