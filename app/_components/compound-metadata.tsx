/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const CompoundMetaData = ({ compoundData, compoundName, smileStructure }: { compoundData: any, compoundName: string, smileStructure: string }) => {
    return (
        <div className="flex flex-col items-star w-[80%]">
            <p className="text-wrap flex flex-col">
                <span>Smile structure:</span>
                <span>{smileStructure}</span>
            </p>
            <p><strong>Molecular Formula:</strong>
                {compoundData.props.find((prop: any) => prop.urn.label === 'Molecular Formula')?.value?.sval
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Molecular Formula')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Molecular Formula')?.value?.fval
                    || 'N/A'}
            </p>

            <p><strong>Complexity:</strong>
                {compoundData.props.find((prop: any) => prop.urn.label === 'Compound Complexity')?.value?.fval
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Compound Complexity')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Compound Complexity')?.value?.sval
                    || 'N/A'}
            </p>

            <p><strong>IUPAC Name:</strong>
                {compoundData.props.find((prop: any) => prop.urn.label === 'IUPAC Name')?.value?.sval
                    || compoundData.props.find((prop: any) => prop.urn.label === 'IUPAC Name')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.label === 'IUPAC Name')?.value?.fval
                    || 'N/A'}
            </p>

            <p><strong>Hydrogen Bond Acceptor Count:</strong>
                {compoundData.props.find((prop: any) => prop.urn.name === 'Hydrogen Bond Acceptor')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.name === 'Hydrogen Bond Acceptor')?.value?.fval
                    || compoundData.props.find((prop: any) => prop.urn.name === 'Hydrogen Bond Acceptor')?.value?.sval
                    || 'N/A'}
            </p>

            <p><strong>Compound Name:</strong> {compoundName}</p>

            <p><strong>Hydrogen Bond Donor Count:</strong>
                {compoundData.props.find((prop: any) => prop.urn.name === 'Hydrogen Bond Donor')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.name === 'Hydrogen Bond Donor')?.value?.fval
                    || compoundData.props.find((prop: any) => prop.urn.name === 'Hydrogen Bond Donor')?.value?.sval
                    || 'N/A'}
            </p>

            <p><strong>Rotatable Bonds:</strong>
                {compoundData.props.find((prop: any) => prop.urn.name === 'Rotatable Bond')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.name === 'Rotatable Bond')?.value?.fval
                    || compoundData.props.find((prop: any) => prop.urn.name === 'Rotatable Bond')?.value?.sval
                    || 'N/A'}
            </p>

            <p><strong>Molecular Mass:</strong>
                {compoundData.props.find((prop: any) => prop.urn.label === 'Mass')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Mass')?.value?.fval
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Mass')?.value?.sval
                    || 'N/A'}
            </p>

            <p><strong>Molecular Weight:</strong>
                {compoundData.props.find((prop: any) => prop.urn.label === 'Molecular Weight')?.value?.ival
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Molecular Weight')?.value?.fval
                    || compoundData.props.find((prop: any) => prop.urn.label === 'Molecular Weight')?.value?.sval
                    || 'N/A'}
            </p>
            <p><strong>Heavy Atom:</strong> {compoundData.count.heavy_atom}</p>
            <p><strong>Chiral Atoms:</strong> {compoundData.count.atom_chiral}</p>
            <p><strong>Chiral Bonds:</strong> {compoundData.count.bond_chiral}</p>
            <p><strong>Covalent Unit:</strong> {compoundData.count.covalent_unit}</p>
        </div>
    )
}

export default CompoundMetaData