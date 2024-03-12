import { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { VirtualScrollerLazyEvent } from "primereact/virtualscroller";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";

interface Product {
  _id: string;
  number: string;
  operator: string;
  comment: string;
}

export const Phones = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleFetch = async () => {
    try {
      const response = await fetch("/api/phones/");
      const data = await response.json();
      setProducts(data.phones);
    } catch (error) {
      console.error("GET /api/phones/ failed:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  function loadCarsLazy(event: VirtualScrollerLazyEvent): void {
    throw new Error("Function not implemented.");
  }

  const allowEdit = (rowData: { name: string }) => {
    return rowData.name !== "Blue Band";
  };

  const onRowEditComplete = async (event: { newData: any; index: any }) => {
    let { newData, index } = event;
    let _products = [...products];
    _products[index] = newData;
    setProducts(_products);

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

  return (
    <div className="card">
      <DataTable
        value={products}
        tableStyle={{ minWidth: "50rem" }}
        editMode="row"
        dataKey="_id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        loading={products.length === 0}
        virtualScrollerOptions={{
          lazy: true,
          onLazyLoad: loadCarsLazy,
          itemSize: 50,
        }}
        onRowEditComplete={onRowEditComplete}
      >
        <Column
          field="_id"
          header="_id"
          sortable
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
    </div>
  );
};
