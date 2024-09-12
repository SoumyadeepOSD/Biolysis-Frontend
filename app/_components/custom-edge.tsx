import React from 'react';

interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  label?: string;
  onLabelContextMenu: (event: React.MouseEvent, edgeId: string) => void;
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  onLabelContextMenu,
}) => {
  // Swap source and target coordinates to reverse the direction
  const edgePath = `M${targetX},${targetY} L${sourceX},${sourceY}`; // Draw the edge from target to source to reverse the direction

  // Calculate midpoint for label positioning
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <>
      {/* Define marker for arrow */}
      <defs>
        <marker
          id={`arrowhead-${id}`} // Unique marker ID for each edge
          markerWidth="10"
          markerHeight="7"
          refX="9" // Adjust refX to ensure arrow points at the end of the path
          refY="3.5"
          orient="auto" // Ensure it points in the correct direction
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
      </defs>

      {/* Edge path with arrowhead marker */}
      <path 
        id={id} 
        d={edgePath} 
        stroke="black" 
        fill="none" 
        markerEnd={`url(#arrowhead-${id})`} // Add markerEnd with unique arrowhead
      />

      {label && (
        <foreignObject
          width={100}
          height={30}
          x={midX - 50}
          y={midY - 15}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer', // Indicate that it's interactive
            }}
            onContextMenu={(e) => onLabelContextMenu(e, id)} // Handle right-click
          >
            <p style={{ margin: 0, fontSize: '10px', fontWeight: 'bold', width: 'fit-content' }}>
              {label}
            </p>
          </div>
        </foreignObject>
      )}
    </>
  );
};

export default CustomEdge;
