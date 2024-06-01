import { useCallback, useEffect, useState } from "react";

import { Tag } from "primereact/tag";
import {
  Copied,
  Profile,
  RowsData,
  Status,
} from "@/profiles/interfaces/profiles";

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  console.log("profiles", profiles);

  const [selectedProfile, setSelectedProfile] = useState(null);
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
  const [profile, setProfile] = useState({
    profilename: "",
    profilelastname: "",
    gender: "",
    profession: "",
    birthdate: new Date().toISOString().split("T")[0],
    city: "",
  });

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const handleGetProfiles = async () => {
    try {
      const response = await fetch("/api/profiles/");
      const data = await response.json();
      setProfiles(data.profiles);
    } catch (error) {
      console.error("GET /api/profiles/ failed:", error);
    }
  };

  const onRowEditComplete = async (event: {
    newData: any;
    index: any;
  }): Promise<void> => {
    let { newData, index } = event;
    let _profiles = [...profiles];
    _profiles[index] = newData;
    setProfiles(_profiles);

    try {
      const response = await fetch(`/api/profiles/${newData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("Failed to update the profiles record");
      }
      await response.json();
    } catch (error) {
      console.error("Failed to update the profiles record:", error);
    }
  };

  const handleSubmitProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/api/profiles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create the profile record");
        }
        return response.json();
      })
      .then((profile) => {
        setProfiles([...profiles, profile]);
        handleEmptyForm();
        handleGetProfiles();
        setStatus({
          show: true,
          value: `Perfil '${profile.profilename}' Registrado exitosamente!`,
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
      fetch(`/api/profiles/${row._id}`, {
        method: "DELETE",
      })
    );

    Promise.all(deletePromises)
      .then((responses) => {
        const allSuccessful = responses.every((response) => response.ok);
        if (!allSuccessful) {
          throw new Error("Failed to delete some profile records");
        }
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((profiles) => {
        alert(
          `Eliminación exitosa de ${profiles.length} ${
            profiles.length > 1 ? "registros" : "registro"
          }!`
        );
        setSelectedProfile(null);
      })
      .catch((error) => {
        alert(`Eliminación fallida! Error: ${error.message}`);
      });
    handleGetProfiles();
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
    setProfile({
      profilename: "",
      profilelastname: "",
      gender: "",
      profession: "",
      birthdate: "",
      city: "",
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
    handleGetProfiles();
  }, []);

  return {
    allowEdit,
    closestatus,
    handleDeleteSelected,
    handleEmptyForm,
    handleGetProfiles,
    handleSubmitProfile,
    idBodyTemplate,
    idOldBodyTemplate,
    onRowEditComplete,
    profile,
    profiles,
    selectedProfile,
    setProfile,
    setSelectedProfile,
    showAlertDelete,
    status,
  };
};
