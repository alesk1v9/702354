import { useState, useEffect } from "react";
import { ModalProps } from "../../types/modal";

const getAllPrerequisites = (selectedNode: any, nodes: any): string[] => {
  let allPrerequisites: string[] = [];
  selectedNode.data.prerequisites.forEach((prerequisite: string) => {
    allPrerequisites.push(prerequisite);
    const prerequisiteNode = nodes.find((node: any) => node.id === prerequisite);
    if (prerequisiteNode) {
      allPrerequisites = allPrerequisites.concat(getAllPrerequisites(prerequisiteNode, nodes));
    }
  });

  return [...new Set(allPrerequisites)];
};

const Modal = ({ isOpen, selectedNode, onClose, nodes, forms }: ModalProps) => {
  const [inputMapping, setInputMapping] = useState<{ [key: string]: string }>({});
  const [availableForms, setAvailableForms] = useState<string[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);

  const handleSave = () => {
    if (selectedNode) {
      selectedNode.data.inputMapping = inputMapping;
    }
    onClose();
  };

  useEffect(() => {
    if(isOpen && selectedNode) {
      const componentId = selectedNode.data.componentId;
      const form = forms.find((f) => f.id === componentId);

      if (form && form.field_schema && form.field_schema.properties) {
        const fields = Object.keys(form.field_schema.properties);
        setAvailableFields(fields);
      } else {
        setAvailableFields([]);
      }
      const formsAvailable = getAllPrerequisites(selectedNode, nodes);
      setAvailableForms(formsAvailable);
    }
  }, [isOpen, selectedNode, forms, nodes]);

  if (!isOpen || !selectedNode) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[400px] text-center">
        <h2 className="text-lg font-bold mb-4">{selectedNode.data.label}</h2>

        <ul className="space-y-4">
          {availableFields.map((item: string, index: number) => (
            <li key={index} className="text-sm text-gray-700">
              {item}
              <select
                className="mt-2 block w-full p-2 border rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={inputMapping[item] || ""}
                onChange={(e) => {
                  const selectedFormId = e.target.value;
                  setInputMapping((prev) => ({
                    ...prev,
                    [item]: selectedFormId,
                  }));
                }}
              >
                <option value="">Select source form</option>
                {availableForms.map((formId: string, index: number) => {
                  const formNode = nodes.find((node) => node.id === formId);
                  const label = formNode ? formNode.data.label : formId;
                  return (
                    <option key={index} value={`${formId}.${item}`}>
                      {label}.{item}
                    </option>
                  );
                })}
                <option value={`global.${item}`}>Global Data</option>
              </select>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-1/2 mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-1/2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;