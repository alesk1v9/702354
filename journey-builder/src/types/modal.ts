import { Node } from "reactflow";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedNode: Node | null;
    nodes: Node[];
    forms: any[];
};