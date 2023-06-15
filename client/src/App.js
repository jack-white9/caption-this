import { DragDropFile } from "./components/DragDropFile";
import "./App.css";

export const App = () => {
  return (
    <div className="page-container">
      <h1 className="page-header">Give me a caption for...</h1>
      <DragDropFile />
    </div>
  );
};
