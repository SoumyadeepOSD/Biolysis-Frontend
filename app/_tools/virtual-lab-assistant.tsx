/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
} from '@xyflow/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import '@xyflow/react/dist/style.css';
import { toolTipElements } from '@/constant/tooltip-items';
import { ArrowBigRightDash, FlaskConical, Settings } from 'lucide-react';
import CustomNode from '../_components/custom-node';
import CustomEdge from '../_components/custom-edge';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import "../globals.css";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Remarkable } from 'remarkable';
const md = new Remarkable();



const VirtualLabAssistant = () => {
  const [nodeId, setNodeId] = useState(3);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [selectedEdgeLabelId, setSelectedEdgeLabelId] = useState<string | null>(null);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [nodeLabel, setNodeLabel] = useState('');
  const [edgeLabel, setEdgeLabel] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  
  // New state variables for label context menu
  const [isLabelContextMenuVisible, setLabelContextMenuVisible] = useState(false);
  const [labelContextMenuPosition, setLabelContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedLabelEdgeId, setSelectedLabelEdgeId] = useState<string | null>(null);
  const [touchStartTime, setTouchStartTime] = useState<number | null>(null);

  const initialNodes: any[] = [];
  const initialEdges: any[] = [{
    type: '',
    source: '',
    target: '',
    id: '',
    label: 'default label',
  }];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => {
      const edgeWithLabel = {
        ...params,
        type: 'customEdge', // Use custom edge type
        label: 'New Connection',
      };
      setEdges((eds) => addEdge(edgeWithLabel, eds));
    },
    [setEdges]
  );

  const addNewNode = (elementName: string) => {
    const newNode = {
      id: `${nodeId}`,
      type: 'customNode',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: elementName }
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((prevId) => prevId + 1);
  };

  const onNodeContextMenu = (event: any, node: any) => {
    event.preventDefault();
    setSelectedNodeId(node.id);
    setNodeLabel(node.data.label);
    setContextMenuPosition({ x: event.clientX - 500, y: event.clientY - 300 });
    setTooltipVisible(true);
    setSelectedEdgeLabelId(null);
    setSelectedLabelEdgeId(null);
  };


  // Handle touch start for long press on nodes
  const onNodeTouchStart = (event: any, node: any) => {
    setTouchStartTime(Date.now());
  };


  // Handle touch end for long press on nodes
  const onNodeTouchEnd = (event: any, node: any) => {
    const touchDuration = Date.now() - (touchStartTime || 0);
    if (touchDuration > 500) {
      // Long press detected
      onNodeContextMenu(event, node);
    }
    setTouchStartTime(null);
  };


  const nodeTypes = {
    customNode: (props: any) => (
      <CustomNode
        {...props}
        onContextMenu={(event: any) => onNodeContextMenu(event, props)}
        onTouchStart={(event: any) => onNodeTouchStart(event, props)}
        onTouchEnd={(event: any) => onNodeTouchEnd(event, props)}
      />
    ),
  };


  const onEdgeClick = (_: any, edge: any) => {
    setSelectedEdgeId(edge.id);
    setSelectedEdgeLabelId(null);
  };

  // Handle right-click on edge label
  const onEdgeLabelContextMenu = (event: React.MouseEvent, edgeId: string) => {
    event.preventDefault();
    const selectedEdge = edges.find((edge) => edge.id === edgeId);
    if (selectedEdge) {
      setEdgeLabel(selectedEdge.label || '');
    }
    setSelectedLabelEdgeId(edgeId);
    setLabelContextMenuPosition({ x: event.clientX, y: event.clientY });
    setLabelContextMenuVisible(true);
  };

  // Handle touch start for long press on edges
  const onEdgeTouchStart = (event: any, edge: any) => {
    setTouchStartTime(Date.now());
  };

  // Handle touch end for long press on edges
  const onEdgeTouchEnd = (event: any, edge: any) => {
    const touchDuration = Date.now() - (touchStartTime ?? 0);
    if (touchDuration > 500) {
      setSelectedLabelEdgeId(edge.id);
      setLabelContextMenuPosition({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
      setLabelContextMenuVisible(true);  // Show context menu with delete button
    }
    setTouchStartTime(null);
  };

  const edgeTypes = {
    customEdge: (props: any) => (
      <CustomEdge
        {...props}
        onTouchStart={(event: any) => onEdgeTouchStart(event, props)}
        onTouchEnd={(event: any) => onEdgeTouchEnd(event, props)}
        onLabelContextMenu={onEdgeLabelContextMenu} // Pass the existing handler
      />
    ),
  };



  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        if (selectedEdgeId) {
          setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdgeId));
          setSelectedEdgeId(null);
        }
        if (selectedNodeId) {
          setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
          setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
          setSelectedNodeId(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedEdgeId, selectedNodeId, setEdges, setNodes]);

  const handleNodeLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(e.target.value);
  };

  const handleEdgeLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdgeLabel(e.target.value);
  };

  const applyLabelChange = () => {
    if (selectedNodeId) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNodeId ? { ...node, data: { label: nodeLabel } } : node
        )
      );
    }
    if (selectedEdgeLabelId) {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === selectedEdgeLabelId ? { ...edge, data: { label: edgeLabel } } : edge
        )
      );
    }
    if (selectedLabelEdgeId) {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === selectedLabelEdgeId ? { ...edge, data: { label: edgeLabel } } : edge
        )
      );
    }
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setSelectedEdgeLabelId(null);
    setSelectedLabelEdgeId(null);
    setTooltipVisible(false);
    setLabelContextMenuVisible(false);
  };

  const deleteNodeOrEdge = () => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
    }
    if (selectedEdgeId) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdgeId));
    }
    setTooltipVisible(false);
  };

  const cancelContextMenu = () => {
    setTooltipVisible(false);
    setLabelContextMenuVisible(false);
    setSelectedLabelEdgeId(null);
  };

  const [query, setQuery] = useState("");
  const [expRes, setExpRes] = useState("");
  const [loading, setLoading] = useState(false);
  // Call Agent API and Execute Lab
  const executeLabWithAgent = async () => {
    if (nodes.length < 2 && edges.length < 2) {
      toast({
        title: 'Error',
        description: 'Please make connection between two nodes first',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      const customQuery = edges.map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);

        // Only proceed if both source and target nodes are found
        if (sourceNode && targetNode) {
          return `${targetNode.data.label} ${edge.label} ${sourceNode.data.label}`;
        }
        return '';
      }).filter(Boolean).join(', ')
      const res = await axios.get(`/api/virtual-response?query=${customQuery}`);
      if (res.status === 200) {
        const response = res.data.data.response;
        setExpRes(response);
        toast({
          title: 'Success',
          description: 'Lab executed successfully.',
          variant: "default",
          style: {
            color: "white",
            backgroundColor: "green",
          }
        })
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }

  const deleteEdge = (edgeId: string | null) => {
    if (edgeId) {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
      setSelectedEdgeId(null); // Clear the selection after deletion
      setSelectedLabelEdgeId(null); // Clear the label context menu selection after deletion
      setLabelContextMenuVisible(false); // Hide the context menu after deletion
    }
  };


  return (
    <div className="p-4">
      <Toaster />
      <div className="flex gap-3 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Choose Lab Component</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Lab Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {toolTipElements.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setSelectedCategoryName(category.name);
                }}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {selectedCategoryName && <ArrowBigRightDash size={24} color="black" />}
        {selectedCategoryId && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <p className="text-white">
                  Choose Item from {selectedCategoryName}
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Items</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {toolTipElements
                .find((category) => category.id === selectedCategoryId)
                ?.items.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => addNewNode(item)}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {selectedCategoryName && <ArrowBigRightDash size={24} color="black" />}
        <Button onClick={executeLabWithAgent} className="bg-blue-950 text-cyan-400">
          Execute Lab <Settings className={cn(`${loading && 'animate-spin'}`)} color='cyan' />
        </Button>
        {/* Result */}
        {expRes && <AlertDialog>
          <AlertDialogTrigger>
            <Button>
              Show Lab Result
              <FlaskConical />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black">
            <AlertDialogHeader>
              <AlertDialogTitle className="bg-purple-800 rounded-lg px-2 py-2">Your Lab Report</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                <p dangerouslySetInnerHTML={{ __html: md.render(expRes) }} style={{ color: 'cyan', fontSize: '14px' }} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>}
      </div>
      <div className="w-full h-[66vh] bg-slate-200 rounded-lg mt-3">
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeClick={onEdgeClick}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background color="#ccc" variant={BackgroundVariant.Cross} />
        </ReactFlow>
        {/* Node/Edge Context Menu */}
        {isTooltipVisible && (
          <div
            className="absolute z-50 p-4 bg-white border border-gray-300 rounded-lg shadow-md"
            style={{ left: contextMenuPosition.x + 300, top: contextMenuPosition.y + 300 }}
          >
            <input
              type="text"
              value={nodeLabel}
              onChange={handleNodeLabelChange}
              className="p-1 mb-2 border border-gray-300 rounded"
            />
            <div className="flex gap-2">
              <Button onClick={applyLabelChange}>
                {'Rename Edge'}
              </Button>
              <Button variant="destructive" onClick={deleteNodeOrEdge}>
                Delete
              </Button>
              <Button onClick={cancelContextMenu}>Cancel</Button>
            </div>
          </div>
        )}
        {/* Label Context Menu */}
        {isLabelContextMenuVisible && (
          <div
            className="absolute z-50 p-4 top-0 bg-white border border-gray-300 rounded-lg shadow-md"
            style={{ left: labelContextMenuPosition.x - 150, top: labelContextMenuPosition.y }}
          >
            <Input
              type="text"
              value={edgeLabel}  /* Ensure edgeLabel has a fallback to an empty string */
              onChange={handleEdgeLabelChange}  /* Handle input change */
              className="p-1 mb-2 border border-gray-300 rounded"
              placeholder="Enter edge label"  /* Add a placeholder for clarity */
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const edgeIndex = edges.findIndex(e => e.id === selectedLabelEdgeId);
                  if (edgeIndex !== -1) {
                    const updatedEdges = [...edges];
                    updatedEdges[edgeIndex] = {
                      ...updatedEdges[edgeIndex],
                      label: edgeLabel || '',  // Update the edge label
                    };
                    setEdges(updatedEdges);  // Update the state with new edges
                    setLabelContextMenuVisible(false);  // Hide context menu
                    setTooltipVisible(false);  // Optionally hide tooltip
                  }
                }}
              >
                Change
              </Button>
              {/* Delete button for edges */}
              <Button
                variant="destructive"
                onClick={() => {
                  deleteEdge(selectedLabelEdgeId); // Call the function to delete the edge
                }}
              >
                Delete
              </Button>
              <Button onClick={cancelContextMenu}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualLabAssistant;
