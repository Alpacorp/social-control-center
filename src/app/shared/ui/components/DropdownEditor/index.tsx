import { Dropdown } from "primereact/dropdown";

export const DropdownEditor = (
  optionsEdit: {
    value: string | undefined;
    editorCallback: (arg0: string) => void | undefined;
  },
  data: []
) => {
  return (
    <Dropdown
      value={optionsEdit.value}
      onChange={(e) => optionsEdit.editorCallback(e.target.value)}
      options={data}
    />
  );
};
