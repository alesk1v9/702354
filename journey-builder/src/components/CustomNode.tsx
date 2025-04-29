import { Handle, Position } from "reactflow"

const CustomNode = ({ data }: any) => {
  return (
    <div className="p-2 bg-white border rounded shadow-md text-center">
        <Handle type="target" position={Position.Left}/>
        <div>{data.label}</div>
        <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default CustomNode