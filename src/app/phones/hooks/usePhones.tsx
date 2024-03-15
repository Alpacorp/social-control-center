import { useEffect, useState } from "react";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { Product } from "@/phones/interfaces/phones";

export const usePhones = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const handleFetch = async () => {
    try {
      const response = await fetch("/api/phones/");
      const data = await response.json();
      setPhones(data.phones);
    } catch (error) {
      console.error("GET /api/phones/ failed:", error);
    }
  };

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const onRowEditComplete = async (event: { newData: any; index: any }) => {
    let { newData, index } = event;
    let _products = [...phones];
    _products[index] = newData;
    setPhones(_products);

    console.log("newData:", newData);

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
      const updatedPhone = await response.json();
      console.log("Updated phone:", updatedPhone);
    } catch (error) {
      console.error("Failed to update the phone record:", error);
    }
  };

  const numberEditor = (options: {
    value: number | null | undefined;
    editorCallback: (arg0: Nullable<number | null>) => void;
  }) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        useGrouping={false}
      />
    );
  };

  const textEditor = (options: {
    value: string | undefined;
    editorCallback: (arg0: string) => void | undefined;
  }) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return {
    phones,
    allowEdit,
    onRowEditComplete,
    numberEditor,
    textEditor,
  };
};
