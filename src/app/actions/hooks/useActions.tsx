import { useCallback, useEffect, useState } from "react";

import { Tag } from "primereact/tag";
import { Copied, Action, RowsData, Status } from "@/actions/interfaces/actions";

export const useActions = () => {
  const [actions, setActions] = useState<Action[]>([]);

  console.log("actions", actions);

  const [selectedAction, setSelectedAction] = useState(null);
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
  const [action, setAction] = useState({
    idprofile: "",
    socialmedia: "",
    urlmention: "",
    customer: "",
    typeaction: "",
  });

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const handleGetActionsById = async (idprofile: string) => {
    try {
      const url = `/api/actions/${idprofile}`;
      console.log("URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("data actions filtered by id", data);
      setActions(data);
    } catch (error) {
      console.error("GET /api/actions failed:", error);
    }
  };

  const onRowEditComplete = async (event: {
    newData: any;
    index: any;
  }): Promise<void> => {
    let { newData, index } = event;
    let _actions = [...actions];
    _actions[index] = newData;
    setActions(_actions);

    try {
      const response = await fetch(`/api/actions/${newData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("Failed to update the actions record");
      }
      await response.json();
    } catch (error) {
      console.error("Failed to update the actions record:", error);
    }
  };

  const handleSubmitAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/api/actions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create the action record");
        }
        return response.json();
      })
      .then((action) => {
        setActions([...actions, action]);
        handleEmptyForm();
        handleGetActionsById(action.idprofile);
        setStatus({
          show: true,
          value: `Perfil '${action.profilename}' Registrado exitosamente!`,
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
      fetch(`/api/actions/${row._id}`, {
        method: "DELETE",
      })
    );

    Promise.all(deletePromises)
      .then((responses) => {
        const allSuccessful = responses.every((response) => response.ok);
        if (!allSuccessful) {
          throw new Error("Failed to delete some actions records");
        }
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((actions) => {
        alert(
          `Eliminación exitosa de ${actions.length} ${
            actions.length > 1 ? "registros" : "registro"
          }!`
        );
        setSelectedAction(null);
      })
      .catch((error) => {
        alert(`Eliminación fallida! Error: ${error.message}`);
      });
    handleGetActionsById(action.idprofile);
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
    setAction({
      idprofile: action.idprofile,
      socialmedia: "",
      urlmention: "",
      customer: "",
      typeaction: "",
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
    if (action.idprofile) {
      handleGetActionsById(action.idprofile);
    }
  }, [action.idprofile]);

  return {
    allowEdit,
    closestatus,
    handleDeleteSelected,
    handleGetActionsById,
    handleEmptyForm,
    handleSubmitAction,
    idBodyTemplate,
    idNewBodyTemplate,
    idOldBodyTemplate,
    onRowEditComplete,
    action,
    actions,
    selectedAction,
    setAction,
    setSelectedAction,
    showAlertDelete,
    status,
  };
};
