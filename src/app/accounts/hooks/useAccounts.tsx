import { useCallback, useEffect, useState } from "react";

import { Tag } from "primereact/tag";
import {
  Account,
  Copied,
  RowsData,
  Status,
} from "@/accounts/interfaces/accounts";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  console.log("accounts", accounts);

  const [selectedAccount, setSelectedAccount] = useState(null);
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
  const [account, setAccount] = useState({
    idprofile: "",
    email: "",
    typeaccount: "",
    username: "",
    passaccount: "",
    status: "",
    comments: "",
    phone: "",
    revision: "",
  });

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const handleGetAccountsById = async (idprofile: string) => {
    try {
      const url = `/api/accounts/${idprofile}`;
      console.log("URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("data accounts filtered by id", data);
      setAccounts(data);
    } catch (error) {
      console.error("GET /api/accounts failed:", error);
    }
  };

  const onRowEditComplete = async (event: {
    newData: any;
    index: any;
  }): Promise<void> => {
    let { newData, index } = event;
    let _actions = [...accounts];
    _actions[index] = newData;
    setAccounts(_actions);

    try {
      const response = await fetch(`/api/accounts/${newData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("Failed to update the accounts record");
      }
      await response.json();
    } catch (error) {
      console.error("Failed to update the accounts record:", error);
    }
  };

  const handleSubmitAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/api/accounts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create the account record");
        }
        return response.json();
      })
      .then((account) => {
        setAccounts([...accounts, account]);
        handleEmptyForm();
        handleGetAccountsById(account.idprofile);
        setStatus({
          show: true,
          value: `Perfil '${account.profilename}' Registrado exitosamente!`,
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
      fetch(`/api/accounts/${row._id}`, {
        method: "DELETE",
      })
    );

    Promise.all(deletePromises)
      .then((responses) => {
        const allSuccessful = responses.every((response) => response.ok);
        if (!allSuccessful) {
          throw new Error("Failed to delete some accounts records");
        }
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((accounts) => {
        alert(
          `Eliminación exitosa de ${accounts.length} ${
            accounts.length > 1 ? "registros" : "registro"
          }!`
        );
        setSelectedAccount(null);
      })
      .catch((error) => {
        alert(`Eliminación fallida! Error: ${error.message}`);
      });
    handleGetAccountsById(account.idprofile);
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
    setAccount({
      idprofile: account.idprofile,
      email: "",
      typeaccount: "",
      username: "",
      passaccount: "",
      status: "",
      comments: "",
      phone: "",
      revision: "",
    });
  };

  const closestatus = useCallback(() => {
    if (status.show) {
      setTimeout(() => {
        setStatus({ show: false, value: "", notification: "", res: "ok" });
      }, 5000);
    }
  }, [status]);

  const idBodyTemplate = (rowData: RowsData) => {
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
            navigator.clipboard.writeText(rowData._id);
            setCopied({ success: true, value: rowData._id });
            setTimeout(() => {
              setCopied({ success: false, value: "" });
            }, 3000);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigator.clipboard.writeText(rowData._id);
              setCopied({ success: true, value: rowData._id });
              setTimeout(() => {
                setCopied({ success: false, value: "" });
              }, 3000);
            }
          }}
        >
          {rowData._id}
        </button>
        {copied.success && copied.value === rowData._id && (
          <Tag
            value="Copiado!"
            severity="success"
            style={{ marginLeft: "1rem", height: "1rem" }}
          />
        )}
      </div>
    );
  };

  const idNewBodyTemplate = (rowData: RowsData) => {
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
            navigator.clipboard.writeText(rowData.idprofile);
            setCopied({ success: true, value: rowData.idprofile });
            setTimeout(() => {
              setCopied({ success: false, value: "" });
            }, 3000);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigator.clipboard.writeText(rowData.idprofile);
              setCopied({ success: true, value: rowData.idprofile });
              setTimeout(() => {
                setCopied({ success: false, value: "" });
              }, 3000);
            }
          }}
        >
          {rowData.idprofile}
        </button>
        {copied.success && copied.value === rowData.idprofile && (
          <Tag
            value="Copiado!"
            severity="success"
            style={{ marginLeft: "1rem", height: "1rem" }}
          />
        )}
      </div>
    );
  };

  const idOldBodyTemplate = (rowData: RowsData) => {
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
            navigator.clipboard.writeText(rowData.idprofileold);
            setCopied({ success: true, value: rowData.idprofileold });
            setTimeout(() => {
              setCopied({ success: false, value: "" });
            }, 3000);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigator.clipboard.writeText(rowData.idprofileold);
              setCopied({ success: true, value: rowData.idprofileold });
              setTimeout(() => {
                setCopied({ success: false, value: "" });
              }, 3000);
            }
          }}
        >
          {rowData.idprofileold}
        </button>
        {copied.success && copied.value === rowData.idprofileold && (
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
    if (account.idprofile) {
      handleGetAccountsById(account.idprofile);
    }
  }, [account.idprofile]);

  return {
    allowEdit,
    closestatus,
    handleDeleteSelected,
    handleGetAccountsById,
    handleEmptyForm,
    handleSubmitAccount,
    idBodyTemplate,
    idNewBodyTemplate,
    idOldBodyTemplate,
    onRowEditComplete,
    account,
    accounts,
    selectedAccount,
    setAccount,
    setSelectedAccount,
    showAlertDelete,
    status,
  };
};
