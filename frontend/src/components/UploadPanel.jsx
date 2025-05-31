import React, { useState } from 'react';

const UploadPanel = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload-doc`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStatus(data.message || "Uploaded!");
    } catch (error) {
      setStatus("Upload failed.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow text-white w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3">Upload Document (Admin Panel)</h2>
      <input type="file" accept=".pdf,.txt,.docx" onChange={(e) => setFile(e.target.files[0])} className="mb-3" />
      <button onClick={handleUpload} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
};

export default UploadPanel;
