import { useCallback, useEffect, useState } from "react";

import { Tag } from "primereact/tag";
import {
  Copied,
  Customer,
  RowsData,
  Status,
} from "@/customers/interfaces/customers";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState("");
  const [comment, setComment] = useState("");

  console.log("customer", customer);
  console.log("comment:", comment);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [status, setStatus] = useState<Status>({
    show: false,
    value: "",
    notification: "",
    res: "ok",
  });

  console.log("status", status);

  const [copied, setCopied] = useState<Copied>({
    success: false,
    value: "",
  });

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const handleGetCustomers = async () => {
    try {
      const response = await fetch("/api/customers/");
      const data = await response.json();
      setCustomers(data.customers);
    } catch (error) {
      console.error("GET /api/customers/ failed:", error);
    }
  };

  const onRowEditComplete = async (event: {
    newData: any;
    index: any;
  }): Promise<void> => {
    let { newData, index } = event;
    let _customers = [...customers];
    _customers[index] = newData;
    setCustomers(_customers);

    try {
      const response = await fetch(`/api/customers/${newData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("Failed to update the customer record");
      }
      await response.json();
    } catch (error) {
      console.error("Failed to update the customer record:", error);
    }
  };

  const handleSubmitCustomer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/api/customers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer,
        comment,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create the customer record");
        }
        return response.json();
      })
      .then((customer) => {
        setCustomers([...customers, customer]);
        handleEmptyForm();
        handleGetCustomers();
        setStatus({
          show: true,
          value: `Cliente '${customer.customer}' Registrado exitosamente!`,
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
  };

  const handleDeleteSelected = (rows: RowsData[]) => {
    if (!showAlertDelete(rows)) {
      return;
    }

    const deletePromises = rows.map((row) =>
      fetch(`/api/customers/${row._id}`, {
        method: "DELETE",
      })
    );

    Promise.all(deletePromises)
      .then((responses) => {
        const allSuccessful = responses.every((response) => response.ok);
        if (!allSuccessful) {
          throw new Error("Failed to delete some customer records");
        }
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((customers) => {
        alert(
          `Eliminación exitosa de ${customers.length} ${
            customers.length > 1 ? "registros" : "registro"
          }!`
        );
        setSelectedCustomer(null);
      })
      .catch((error) => {
        alert(`Eliminación fallida! Error: ${error.message}`);
      });
    handleGetCustomers();
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
    setCustomer("" as any);
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
            navigator.clipboard.writeText(rowData.customer);
            setCopied({ success: true, value: rowData.customer });
            setTimeout(() => {
              setCopied({ success: false, value: "" });
            }, 3000);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigator.clipboard.writeText(rowData.customer);
              setCopied({ success: true, value: rowData.customer });
              setTimeout(() => {
                setCopied({ success: false, value: "" });
              }, 3000);
            }
          }}
        >
          {rowData.customer}
        </button>
        {copied.success && copied.value === rowData.customer && (
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
    handleGetCustomers();
  }, []);

  return {
    allowEdit,
    closestatus,
    comment,
    handleDeleteSelected,
    handleEmptyForm,
    handleGetCustomers,
    handleSubmitCustomer,
    numberBodyTemplate,
    onRowEditComplete,
    customer,
    customers,
    selectedCustomer,
    setComment,
    setCustomer,
    setSelectedCustomer,
    showAlertDelete,
    status,
  };
};
