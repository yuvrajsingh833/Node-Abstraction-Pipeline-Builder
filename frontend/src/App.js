import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Pipeline Builder</h1>
        <p className="app-subtitle">Drag and drop nodes to build your pipeline</p>
      </div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
