# Biolysis 🧬

[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=488886&theme=dark)](https://www.producthunt.com/posts/biolysis?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-biolysis)

Biolysis is an AI-powered all-in-one platform designed specifically for Chemists and Microbiologists. It provides advanced tools for molecular visualization, chemical analysis, and virtual laboratory experimentation.

## 🌟 Features

### 1. Molecular Visualization
- **2D Structure Generation**: Generate and view detailed 2D structural diagrams of compounds
- **3D Molecular Visualization**: Interactive 3D visualization with rotation and manipulation capabilities
- **Bond Analysis**: View and analyze different types of chemical bonds
- **Atomic Structure**: Detailed view of atomic arrangements and molecular geometry

### 2. Chemical Analysis
- **Compound Information**:
  - IUPAC nomenclature
  - Molecular formula and mass
  - Structural complexity
  - Bond information
  - Chiral properties
  - Rotatable bonds
- **Reaction Analysis**:
  - Reaction mechanisms
  - Catalyst requirements
  - Temperature and humidity conditions
  - Process parameters
  - Product prediction

### 3. Virtual Laboratory
- **Experiment Simulation**:
  - Design and simulate chemical reactions
  - Analyze reaction conditions
  - Document experimental procedures
  - Safety protocol integration
- **Equipment Management**:
  - General apparatus tracking
  - Reaction vessel management
  - Catalyst and reagent inventory
  - Safety equipment monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/biolysis-frontend.git
cd biolysis-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14
- **UI Components**: 
  - NextUI
  - Radix UI
  - Tailwind CSS
- **3D Visualization**: 
  - Three.js
  - React Three Fiber
- **Chemical Analysis**: 
  - RDKit
  - Plotly.js
- **State Management**: React Hooks
- **API Integration**: Axios

## 📚 Key Dependencies

```json
{
  "@rdkit/rdkit": "^2024.3.5-1.0.0",
  "@react-three/drei": "^9.112.0",
  "@react-three/fiber": "^8.17.6",
  "next": "14.2.8",
  "react": "^18",
  "three": "^0.168.0"
}
```

## 🔧 Configuration

The project uses environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_DATA_URL=your_api_url_here
```

## 🧪 Usage Examples

### Molecular Visualization
```typescript
// Example of using the 3D visualization component
<Visualize3D compoundName="aspirin" />
```

### Chemical Analysis
```typescript
// Example of compound metadata analysis
<CompoundMetaData 
  compoundData={data} 
  compoundName="aspirin" 
  smileStructure="CC(=O)OC1=CC=CC=C1C(=O)O" 
/>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [RDKit](https://www.rdkit.org/) for chemical informatics
- [Three.js](https://threejs.org/) for 3D visualization

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ for the scientific community
