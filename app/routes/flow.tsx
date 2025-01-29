import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

export default function Flow() {
  const nodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: '2', position: { x: 100, y: 100 }, data: { label: 'Node 2' } },
  ];
  const edges = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    <ReactFlowProvider>

        <div style={{ height: '100vh', width: '100%' }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <Background />
            </ReactFlow>
        </div>
    </ReactFlowProvider>
  );
}