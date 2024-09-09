/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import axios from 'axios';
import CompoundMetaData from '../_components/compound-metadata';
import LoadingComponent from '../_components/loading-component';

const MoleculeViewer = dynamic(() => import('../_components/molecular-structure/molecular-structure'), { ssr: false });

const CompoundForm = () => {
  const [compoundData, setCompoundData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [smileStructure, setSmileStructure] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [compoundName, setCompoundName] = useState<string>('');

  const fetchCompoundData = async () => {
    if (!query) {
      toast({
        title: 'Error',
        description: 'Please enter a compound name',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      // Fetch compound name via API
      const res = await axios.get(`/api/extraction-response?query=${query}`);
      const ExtractedcompoundName = res.data.data.response;
      setCompoundName(ExtractedcompoundName);
      // Fetch compound details using extracted name
      const API_URL = process.env.NEXT_PUBLIC_DATA_URL;
      const response = await axios.get(`${API_URL}/${ExtractedcompoundName}/JSON`);
      const compound = response.data.PC_Compounds?.[0];

      if (compound) {
        setCompoundData(compound);

        // Extract SMILES formula for rendering
        const smilesFormula = compound.props.find(
          (prop: any) => prop.urn.label === 'SMILES' && prop.urn.name === 'Canonical'
        )?.value?.sval;

        setSmileStructure(smilesFormula || 'SMILES formula not found');
      } else {
        toast({
          title: 'Error',
          description: 'Compound not found',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch compound data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-center mb-4 gap-3">
        <Input
          placeholder="Enter compound name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={fetchCompoundData} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </div>
      {/* Molecule Viewer Component */}
      {compoundData && (
        <section className="mt-4 flex flex-col md:flex-row items-start w-full gap-40">
          <div>
            <h2 className="text-lg font-bold">Compound Dash Diagram</h2>
            <MoleculeViewer structure={smileStructure} id="smiles" />
          </div>
          {/* Render compound details */}
          <section>
            <div className="mt-4">
              <p><strong>Smile structure:</strong>{smileStructure}</p>
              <CompoundMetaData compoundData={compoundData} compoundName={compoundName} />
            </div>
          </section>
        </section>
      )}
      {loading&&<LoadingComponent/>}
      <Toaster />
    </div>
  );
};

export default CompoundForm;
