import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App(props) {
  const [fileSelected, setFileSelected] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles);
      acceptedFiles.map((e) => setFileSelected(e));
    }
  }, []);
  const onDropRejected = useCallback((e) => {
    e.map((element) => {
      element.errors.map((error) => {
        console.log(error);
        if (error.code === "file-too-large") {
          alert("O arquivo enviado supera o limite de 45MB");
        }
        if (error.code === "too-many-files") {
          alert("Selecione apenas 1 arquivo.");
        }
      });
    });
    // console.log(`Rejected ${e}`);
    // console.log(e);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 45 * 1024 * 1024,
    multiple: false,
    onDropRejected,
  });
  const baseStyle = {
    flex: 1,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  const activeStyle = {
    borderColor: "#2196f3",
  };
  const acceptStyle = {
    borderColor: "#00e676",
  };
  const rejectStyle = {
    borderColor: "#ff1744",
  };

  return (
    <div className="container">
      <div
        {...getRootProps({
          style: {
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
          },
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte os arquivos aqui.</p>
        ) : (
          <p>Clique ou arraste o arquivo para selecionar</p>
        )}
      </div>
      {fileSelected.name && (
        <div
          style={{
            display: "flex",
            justifyContent: `center`,
            marginTop: 20,
            color: `#00e676`,
            background: `#FAFAFA`,
            padding: 20,
          }}
        >
          {fileSelected.name}{" "}
          <button
            style={{
              borderRadius: 50,
              marginLeft: 8,
              background: `#ff0000`,
              color: `white`,
              fontSize: `10pt`,
              border: `none`,
              paddingLeft: 10,
              paddingRight: 10,
              height: `auto`,
            }}
            onClick={() => {
              setFileSelected({});
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
