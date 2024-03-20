import { InputNumber } from "primereact/inputnumber";
import { Nullable } from "primereact/ts-helpers";

export const NumberEditor = (options: {
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
