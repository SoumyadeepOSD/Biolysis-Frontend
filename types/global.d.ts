// types/global.d.ts

import { RDKitModule } from '@rdkit/rdkit';

declare global {
  interface Window {
    initRDKitModule: () => Promise<RDKitModule>;
    RDKit?: RDKitModule;
  }
}
