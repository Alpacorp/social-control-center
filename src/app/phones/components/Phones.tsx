import { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { VirtualScrollerLazyEvent } from "primereact/virtualscroller";

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
      >
        <Column
          field="_id"
          header="_id"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="number"
          header="Number"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="operator"
          header="Operator"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="comment"
          header="Comment"
          sortable
          style={{ width: "20%" }}
        ></Column>
      </DataTable>
    </div>
  );
};
