/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }: any) => {
  return (
    <div className="p-[10px] bg-slate-200 border-[1px] border-slate-400 rounded-lg text-black text-sm">
      <Handle type="source" position={Position.Top} id="top-source" style={{ background: '#555' }} isConnectable />
      <Handle type="target" position={Position.Top} id="top-target" style={{ background: '#555' }} isConnectable />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} id="right-source" style={{ background: '#555' }} isConnectable />
      <Handle type="target" position={Position.Right} id="right-target" style={{ background: '#555' }} isConnectable />
      <Handle type="source" position={Position.Bottom} id="bottom-source" style={{ background: '#555' }} isConnectable />
      <Handle type="target" position={Position.Bottom} id="bottom-target" style={{ background: '#555' }} isConnectable />
      <Handle type="source" position={Position.Left} id="left-source" style={{ background: '#555' }} isConnectable />
      <Handle type="target" position={Position.Left} id="left-target" style={{ background: '#555' }} isConnectable />
    </div>
  );
};

export default CustomNode;
