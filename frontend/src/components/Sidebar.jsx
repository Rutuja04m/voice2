import React from "react";

export default function Sidebar({ onUpload }) {
  const [file, setFile] = React.useState(null);

  function handleFileChange(e) {
    const f = e.target.files[0];
    setFile(f);
  }

  async function handleUpload() {
    if (file) {
      await onUpload(file);
      setFile(null);
    }
  }

  return (
    <aside className="w-64 p-4 border-r h-full bg-gray-100 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold">Upload Document</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file} className="btn-primary mt-2">
        Upload
      </button>
    </aside>
  );
}
