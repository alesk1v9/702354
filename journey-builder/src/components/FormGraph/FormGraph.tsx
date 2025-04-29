import { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from '../CustomNode';
import Modal from '../Modal/Modal';

const nodeTypes = {
  custom: CustomNode,
};

export default function FormGraph() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [forms, setForms] = useState<any[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodeClick = (e: React.MouseEvent, node: Node) => {
    setIsOpen(true);
    setSelectedNode(node);
  };

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph');
        const data = await res.json();

        const initialNodes: Node[] = data.nodes.map((node: any) => ({
          id: node.id,
          type: 'custom',
          data: { label: node.data.name,
            componentKey: node.data.component_key,
            componentType: node.data.component_type,
            componentId: node.data.component_id,
            inputMapping: node.data.input_mapping,
            prerequisites: node.data.prerequisites,
            originalType: node.type,
          },
          position: { x: node.position.x, y: node.position.y },
        }));

        const initialEdges: Edge[] = data.edges.map((edge: any) => ({
          id: edge.source + '-' + edge.target,
          source: edge.source,
          target: edge.target,
          type: 'smoothstep',
        }));

        setEdges(initialEdges);
        setNodes(initialNodes);
        setForms(data.forms);

      } catch (error) {
        console.error('Erro ao buscar grafo:', error);
      }
    };

    fetchGraph();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full h-full">
      <ReactFlow 
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={onNodeClick}
      style={{ backgroundColor: '#bfdbfe'}}
      />
      <Modal
      isOpen={isOpen}
      selectedNode={selectedNode}
      onClose={() => setIsOpen(false)}
      nodes={nodes}
      forms={forms}
      />
      </div>
    </div>
  );
}
