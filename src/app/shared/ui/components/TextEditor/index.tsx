import { InputText } from "primereact/inputtext";

export const TextEditor = (options: {
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
