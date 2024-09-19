import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>PDF to Excel Converter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          Convert
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {downloadLink && (
        <a href={downloadLink} download="output.xlsx">
          Download Excel File
        </a>
      )}
    </div>
  );
};

export default App;
