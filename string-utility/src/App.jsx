import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCopy, FaRegTrashAlt } from "react-icons/fa";

// Utility Class
class StringUtility {
  constructor(text) {
    this.text = text;
  }

  toUpper() {
    return this.text.toUpperCase();
  }

  toLower() {
    return this.text.toLowerCase();
  }

  reverse() {
    return this.text.split("").reverse().join("");
  }

  countVowels() {
    return [...this.text].filter((char) => "aeiouAEIOU".includes(char)).length;
  }

  wordCount() {
    if (this.text.trim() === "") return 0;
    return this.text.trim().split(/\s+/).length;
  }

  characterCount() {
    return this.text.trim().length;
  }

  lengthFinder() {
    return this.text.length;
  }

  toCamelCase() {
    const words = this.text.toLowerCase().split(/\s+/);
    if (!words.length) return "";
    return words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  }

  toSnakeCase() {
    return this.text.toLowerCase().trim().split(/\s+/).join("_");
  }

  pascalCase() {
    return this.text.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  }

  titleCase() {
    return this.text.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  }

  swapCase() {
    return [...this.text].map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");
  }

  dotCase() {
    return this.text.toLowerCase().trim().split(/\s+/).join(".");
  }
}

// Component
function App() {
  const [inputText, setInputText] = useState("Type your text here to transform it");
  const [utility, setUtility] = useState(new StringUtility(inputText));
  const [activeTab, setActiveTab] = useState("case");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setUtility(new StringUtility(inputText));
  }, [inputText]);

  const transformations = [
    { id: "upper", name: "UPPERCASE", method: "toUpper", category: "case" },
    { id: "lower", name: "lowercase", method: "toLower", category: "case" },
    { id: "camel", name: "camelCase", method: "toCamelCase", category: "case" },
    { id: "snake", name: "snake_case", method: "toSnakeCase", category: "case" },
    { id: "pascal", name: "PascalCase", method: "pascalCase", category: "case" },
    { id: "title", name: "Title Case", method: "titleCase", category: "case" },
    { id: "swap", name: "sWaP cAsE", method: "swapCase", category: "case" },
    { id: "dot", name: "dot.case", method: "dotCase", category: "case" },
    { id: "reverse", name: "Reverse", method: "reverse", category: "manipulation" },
    { id: "vowels", name: "Vowel Count", method: "countVowels", category: "analytics" },
    { id: "words", name: "Word Count", method: "wordCount", category: "analytics" },
    { id: "chars", name: "Character Count", method: "characterCount", category: "analytics" },
    { id: "length", name: "Length", method: "lengthFinder", category: "analytics" },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog",
    "Hello World! Welcome to String Utility",
    "React is a JavaScript library for building user interfaces",
    "Tailwind CSS is a utility-first CSS framework",
  ];

  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      <h1 className="text-center mb-4 display-5 fw-bold" style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
        String Utility Transformer
      </h1>

      <div className="mb-4">
        <textarea
          className="form-control mb-2 shadow-sm"
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ fontSize: "1.1rem", borderRadius: "0.5rem" }}
          placeholder="Type or paste your text here..."
        />
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button 
            className="btn btn-danger me-2 d-flex align-items-center"
            onClick={() => setInputText("")}
            aria-label="Clear text area"
          >
            <FaRegTrashAlt className="me-1" />
            Clear
          </button>
          <span className="fw-semibold me-2">Sample Texts:</span>
          {sampleTexts.map((text, idx) => (
            <button 
              key={idx} 
              className="btn btn-outline-primary btn-sm text-truncate" 
              style={{ maxWidth: '160px' }} 
              title={text} 
              onClick={() => setInputText(text)}
            >
              {text.length > 25 ? text.substring(0, 22) + "..." : text}
            </button>
          ))}
        </div>
      </div>

      <ul className="nav nav-tabs mb-3 justify-content-center shadow-sm rounded" role="tablist" style={{cursor: "pointer"}}>
        <li className="nav-item" role="presentation">
          <button 
            className={`nav-link ${activeTab === "case" ? "active" : ""}`} 
            onClick={() => setActiveTab("case")}
            aria-current={activeTab === "case" ? "page" : undefined}
          >
            Case
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className={`nav-link ${activeTab === "manipulation" ? "active" : ""}`} 
            onClick={() => setActiveTab("manipulation")}
          >
            Manipulation
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className={`nav-link ${activeTab === "analytics" ? "active" : ""}`} 
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </li>
      </ul>

      <div className="row gy-4">
        {transformations
          .filter(t => t.category === activeTab)
          .map(t => {
            const result = utility[t.method]();
            return (
              <div className="col-md-6 col-lg-4" key={t.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-header d-flex justify-content-between align-items-center bg-primary bg-opacity-10">
                    <strong className="fs-5">{t.name}</strong>
                    <button 
                      className={`btn btn-sm ${copiedId === t.id ? "btn-success" : "btn-outline-secondary"}`} 
                      onClick={() => handleCopy(result.toString(), t.id)}
                      aria-label={`Copy result of ${t.name}`}
                      title={copiedId === t.id ? "Copied!" : "Copy"}
                    >
                      <FaCopy />
                    </button>
                  </div>
                  <div className="card-body d-flex align-items-center justify-content-center p-3" style={{minHeight: "60px", wordBreak: "break-word", fontSize: "1.1rem", backgroundColor: "#f9f9f9", borderRadius: "0.3rem"}}>
                    {result.toString()}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <footer className="text-center mt-5 text-muted">
        <p className="mb-0" style={{fontSize: "0.9rem"}}>
          Made with <span style={{color:"red"}}>❤️</span> using React + Bootstrap + React Icons
        </p>
      </footer>
    </div>
  );
}

export default App;

