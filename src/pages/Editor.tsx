import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType,
} from "reactflow";
import type { Connection, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";
import { toPng } from "html-to-image";

type Data = { label: string; kind?: "default" | "shape" | "text" };

const initialNodes: Node<Data>[] = [
  {
    id: "root",
    position: { x: 220, y: 160 },
    data: { label: "Idea principal", kind: "default" },
    type: "default",
  },
];

export default function Editor() {
  // estado de nodos y aristas (tipado explícito para evitar 'any')
  const [nodes, setNodes, onNodesChange] = useNodesState<Data>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  // referencia al contenedor del lienzo para exportar PNG
  const canvasRef = useRef<HTMLDivElement>(null);

  // color activo para los conectores (cambia con los puntos de color)
  const connectorColorRef = useRef<string>("#3b82f6"); // azul por defecto

  // conectar nodos con flecha y color actual
  const onConnect = useCallback(
    (c: Connection) => {
      setEdges((eds: Edge[]) =>
        addEdge(
          {
            ...c,
            markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
            style: { stroke: connectorColorRef.current },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // helpers para crear nodos con distintas "clases" visuales
  const addNodeBase = (data: Data) => {
    const id = crypto.randomUUID();
    setNodes((nds: Node<Data>[]) => [
      ...nds,
      {
        id,
        position: {
          x: 260 + Math.random() * 140,
          y: 200 + Math.random() * 140,
        },
        data,
        type: "default",
        style:
          data.kind === "shape"
            ? {
                borderRadius: 12,
                padding: 8,
                border: "1px solid #e5e7eb",
                background: "#f8fafc",
              }
            : data.kind === "text"
            ? {
                border: "none",
                background: "transparent",
                boxShadow: "none",
                padding: 0,
              }
            : undefined,
      },
    ]);
  };

  const addNode = () => addNodeBase({ label: "Nuevo nodo", kind: "default" });
  const addShape = () => addNodeBase({ label: "Nueva figura", kind: "shape" });
  const addText = () => addNodeBase({ label: "Texto", kind: "text" });

  // borrar lo seleccionado
  const deleteSelection = () => {
    setNodes((nds: Node<Data>[]) => nds.filter((n) => !n.selected));
    setEdges((eds: Edge[]) => eds.filter((e) => !e.selected));
  };

  // guardar/cargar en localStorage
  const saveLocal = () => {
    localStorage.setItem("mm-graph", JSON.stringify({ nodes, edges }));
    alert("Guardado en este navegador.");
  };

  const loadLocal = () => {
    const raw = localStorage.getItem("mm-graph");
    if (!raw) return;
    const g = JSON.parse(raw) as { nodes: Node<Data>[]; edges: Edge[] };
    setNodes(g.nodes);
    setEdges(g.edges);
  };

  // exportar a PNG
  const exportPNG = async () => {
    if (!canvasRef.current) return;
    const dataUrl = await toPng(canvasRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "mindmap.png";
    a.click();
  };

  // doble clic para renombrar nodos
  const onNodeDoubleClick = (_: any, node: Node<Data>) => {
    const txt = prompt("Editar texto:", node.data.label);
    if (txt !== null) {
      setNodes((nds: Node<Data>[]) =>
        nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label: txt } } : n))
      );
    }
  };

  // atajos de teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && k === "s") {
        e.preventDefault();
        saveLocal();
      }
      if ((e.ctrlKey || e.metaKey) && k === "e") {
        e.preventDefault();
        exportPNG();
      }
      if (e.key === "Delete") {
        deleteSelection();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nodes, edges]);

  return (
    <main className="editor-wrap">
      {/* Sidebar izquierda */}
      <aside className="sidebar">
        <button className="btn block" onClick={addNode}>
          Add Node
        </button>
        <button className="btn block" onClick={addShape}>
          Add Shape
        </button>
        <button className="btn block" onClick={addText}>
          Add Text
        </button>

        <div className="sidebar-section">
          <div className="label">Connectors</div>
          <div className="dot-row">
            <button
              className="dot red"
              title="Red"
              onClick={() => (connectorColorRef.current = "#ef4444")}
            />
            <button
              className="dot blue"
              title="Blue"
              onClick={() => (connectorColorRef.current = "#3b82f6")}
            />
            <button
              className="dot yellow"
              title="Yellow"
              onClick={() => (connectorColorRef.current = "#eab308")}
            />
          </div>
        </div>

        <div className="sidebar-section">
          <button className="btn block" onClick={deleteSelection}>
            Delete Selection
          </button>
          <button className="btn block" onClick={saveLocal}>
            Save (local)
          </button>
          <button className="btn block" onClick={loadLocal}>
            Load (local)
          </button>
          <button className="btn block" onClick={exportPNG}>
            Export PNG
          </button>
        </div>
      </aside>

      {/* Lienzo */}
      <div className="canvas-wrap">
        <div className="toolbar">Drag &amp; Drop to Create Your Mind Map</div>
        <div ref={canvasRef} className="canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDoubleClick={onNodeDoubleClick}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background gap={16} />
          </ReactFlow>
        </div>
      </div>
    </main>
  );
}