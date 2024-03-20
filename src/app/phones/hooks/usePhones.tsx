import { useState } from "react";

import { Tag } from "primereact/tag";

import { Copied, RowsData } from "@/phones/interfaces/phones";

export const usePhones = () => {
  const [phone, setPhone] = useState();
  const [operator, setOperator] = useState(null);
  const [copied, setCopied] = useState<Copied>({
    success: false,
    value: "",
  });

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const handleChangeOperator = (e: any) => {
    setOperator(e.value);
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

  return {
    allowEdit,
    handleChangeOperator,
    numberBodyTemplate,
    operator,
    phone,
    setPhone,
  };
};
