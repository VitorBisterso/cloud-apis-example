import React, { useRef, useState } from 'react';

import './styles.css';

export default function App() {
  const fileRef = useRef(null);
  const [image, setImage] = useState('');

  function handleInputFileChange(e) {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return;

    const selectedFile = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);
    fileReader.onload = () => {
       const imageRead = new Image();

       const base64File = fileReader.result;
       imageRead.src = base64File;

       imageRead.onload = () => {
          setImage(base64File);
          fileRef.current.value = '';
       };
    };
  }

  return (
    <div className="container">
      <h1 style={{ margin: 'auto' }}>
        Exemplo de consumo de APIs de visão computacional
      </h1>
      <input
        type="file"
        ref={fileRef}
        onChange={handleInputFileChange}
        hidden
      />
      <button
        style={{ maxWidth: '20%', margin: 'auto' }}
        onClick={() => fileRef.current.click()}
      >
        Submeter imagem
      </button>
      <div className="buttons">
        <button>tags</button>
        <button>cores predominantes</button>
        <button>rostos</button>
      </div>
      <img src={image} alt="uploaded" />
    </div>
  );
}
