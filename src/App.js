import { BrowserRouter, Routes, Route } from "react-router-dom";
import PDFReader from "./components/pdf-reader/PDFReader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PDFReader />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
