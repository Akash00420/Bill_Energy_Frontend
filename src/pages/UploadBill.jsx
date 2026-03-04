import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBill } from "../Reducer/BillSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const UploadBill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.bill);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    await dispatch(uploadBill(file));
    navigate("/dashboard");
  };

  if (loading) return <Loader />;

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>📤 Upload Your Bill</h2>
        <p>We'll analyse it instantly and show you how to save money.</p>

        <form onSubmit={handleUpload}>
          <div
            className="dropzone"
            style={dragging ? { borderColor: "#1e88e5", background: "#e0f2fe" } : {}}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); setFile(e.dataTransfer.files[0]); }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div className="drop-icon">{file ? "✅" : "📄"}</div>
            <div className="drop-title">
              {file ? file.name : "Drop your bill here or click to browse"}
            </div>
            <div className="drop-sub">Supports PDF, JPG, PNG up to 10MB</div>
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="upload-formats">
            <span className="format-tag">✅ MSEDCL</span>
            <span className="format-tag">✅ BESCOM</span>
            <span className="format-tag">✅ TPDDL</span>
            <span className="format-tag">✅ KSEB</span>
            <span className="format-tag">+ more</span>
          </div>

          <button type="submit" className="btn-upload-submit">⚡ Analyse My Bill</button>
        </form>
      </div>
    </div>
  );
};

export default UploadBill;