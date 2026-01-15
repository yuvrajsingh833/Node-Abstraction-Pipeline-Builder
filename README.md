# VectorShift Pipeline Builder

A full-stack pipeline builder application built with React and FastAPI. This project allows users to create, visualize, and analyze data processing pipelines using a drag-and-drop interface.

## 🚀 Features

### Frontend Features
- **Drag-and-Drop Interface**: Intuitive node-based pipeline builder using ReactFlow
- **Node Abstraction**: Reusable `BaseNode` component for easy node creation
- **9 Node Types**: 
  - Input Node - Data input with configurable types
  - Output Node - Data output with configurable types
  - LLM Node - Large Language Model integration
  - Text Node - Text processing with dynamic variable extraction
  - Number Node - Numeric operations (Integer/Float)
  - Condition Node - Conditional logic with true/false branches
  - Transform Node - Data transformation operations
  - Filter Node - Data filtering with multiple criteria
  - Merge Node - Merge multiple inputs with various strategies
- **Dynamic Text Node**: 
  - Auto-resizing based on content
  - Variable extraction from `{{ variableName }}` syntax
  - Dynamic input handles for extracted variables
- **Modern UI**: Beautiful gradient design with smooth animations
- **Pipeline Analysis**: Submit pipelines for DAG validation and statistics

### Backend Features
- **Pipeline Parsing**: RESTful API endpoint for pipeline analysis
- **DAG Detection**: Validates if pipeline is a Directed Acyclic Graph using Kahn's algorithm
- **Statistics**: Calculates number of nodes and edges in the pipeline
- **CORS Support**: Configured for frontend-backend communication

## 📁 Project Structure

```
VectorShift_Assignment/
├── backend/
│   ├── main.py              # FastAPI backend server
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── nodes/          # Node components
│   │   │   ├── BaseNode.js # Base node abstraction
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── textNode.js
│   │   │   ├── numberNode.js
│   │   │   ├── conditionNode.js
│   │   │   ├── transformNode.js
│   │   │   ├── filterNode.js
│   │   │   └── mergeNode.js
│   │   ├── App.js          # Main app component
│   │   ├── ui.js           # Pipeline UI component
│   │   ├── toolbar.js      # Node toolbar
│   │   ├── submit.js       # Submit button with API integration
│   │   └── store.js        # Zustand state management
│   ├── package.json
│   └── README.md
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **macOS/Linux**: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## 📖 Usage

### Creating a Pipeline

1. **Add Nodes**: Drag nodes from the toolbar onto the canvas
2. **Connect Nodes**: Click and drag from output handles to input handles to create connections
3. **Configure Nodes**: Click on nodes to configure their properties
4. **Text Node Variables**: Use `{{ variableName }}` syntax in Text nodes to create dynamic input handles
5. **Submit Pipeline**: Click the "Submit Pipeline" button to analyze your pipeline

### Node Types

#### Input Node
- Configure input name and type (Text/File)
- Has one output handle

#### Output Node
- Configure output name and type (Text/Image)
- Has one input handle

#### LLM Node
- Has two input handles (system, prompt)
- Has one output handle (response)

#### Text Node
- Enter text with optional variables: `{{ variableName }}`
- Automatically creates input handles for each variable
- Auto-resizes based on content
- Has one output handle

#### Number Node
- Configure number type (Integer/Float)
- Set numeric value
- Has one output handle

#### Condition Node
- Configure condition type (equals, greater, less, contains)
- Set comparison value
- Has one input handle and two output handles (true/false)

#### Transform Node
- Configure transform type (uppercase, lowercase, trim, reverse, custom)
- Has one input handle and one output handle

#### Filter Node
- Configure filter criteria (all, contains, startsWith, endsWith, length)
- Has one input handle and two output handles (filtered/rejected)

#### Merge Node
- Configure merge strategy (concat, sum, average, join)
- Has three input handles and one output handle

## 🔌 API Endpoints

### POST `/pipelines/parse`

Analyzes a pipeline and returns statistics.

**Request:**
- Content-Type: `application/x-www-form-urlencoded`
- Body: `pipeline` (JSON string containing nodes and edges)

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/pipelines/parse" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "pipeline={\"nodes\":[...],\"edges\":[...]}"
```

## 🏗️ Architecture

### Node Abstraction

The `BaseNode` component provides a reusable abstraction for all node types:

```javascript
<BaseNode
  id={id}
  data={data}
  title="Node Title"
  className="custom-node"
  inputHandles={[{ id: 'input1', label: 'Input' }]}
  outputHandles={[{ id: 'output1', label: 'Output' }]}
  minWidth={200}
  minHeight={80}
>
  {/* Node content */}
</BaseNode>
```

This abstraction:
- Reduces code duplication
- Ensures consistent styling
- Simplifies node creation
- Makes it easy to add new node types

### State Management

The application uses Zustand for state management, storing:
- Nodes and edges
- Node ID generation
- Connection handling

### DAG Detection

The backend uses Kahn's algorithm for topological sorting to detect cycles:
1. Build adjacency list and in-degree count
2. Start with nodes having in-degree 0
3. Process nodes and reduce in-degrees
4. If all nodes are processed, it's a DAG

## 🎨 Styling

The application features a modern, unified design:
- Gradient backgrounds
- Smooth hover animations
- Consistent color scheme
- Responsive layout
- Card-based node design

## 🧪 Testing

### Backend Testing
```bash
cd backend
# Test the endpoint
curl http://localhost:8000/
```

### Frontend Testing
The frontend includes React testing setup. Run tests with:
```bash
cd frontend
npm test
```

## 📝 Technologies Used

### Frontend
- **React** - UI framework
- **ReactFlow** - Node-based graph visualization
- **Zustand** - State management
- **CSS3** - Styling

### Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Python** - Programming language

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use**: Change the port in uvicorn command: `uvicorn main:app --reload --port 8001`
- **CORS errors**: Ensure the frontend URL matches the CORS configuration in `main.py`

### Frontend Issues
- **Node modules issues**: Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **Port already in use**: React will automatically suggest an alternative port

## 📄 License

This project is part of a technical assessment for VectorShift.

## 👤 Contact

For questions, please reach out to recruiting@vectorshift.ai
