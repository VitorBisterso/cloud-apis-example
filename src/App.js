import React, { useState } from 'react';
import ReactJson from 'react-json-view'

import { API_KEY, API_SECRET, BASIC_AUTH_TOKEN } from './env'

import './styles.css';

const BASE_URL = 'https://api.imagga.com/v2'
const TAGS = 'tags'
const COLORS = 'colors'
const FACES = 'faces'

export default function App() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});

  async function makeRequest(url) {
    if (!image) return;

    setLoading(true)
    setRes({})
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        accept: 'application/json',
        user: `${API_KEY}:${API_SECRET}`,
        authorization: `Basic ${BASIC_AUTH_TOKEN}`
      }  
    })
    .then(response => response.json())
    .then(response => {
      setRes(response);
      setLoading(false);
    })
    .catch(e => {
      console.log(e)
      setLoading(false)
    });
  }

  function getTags() {
    makeRequest(`http://localhost:4000/fetch/${BASE_URL}/tags?image_url=${image}`)
  }
  function getColors() {
    makeRequest(`http://localhost:4000/fetch/${BASE_URL}/colors?image_url=${image}`)
  }
  function getFaces() {
    makeRequest(`http://localhost:4000/fetch/${BASE_URL}/faces/detections?image_url=${image}`)
  }

  function handleButtonClick(type) {
    switch (type) {
      case TAGS:
        getTags()
        break;
      case COLORS:
        getColors()
        break;
      case FACES:
        getFaces()
        break;
      default:
        break;
    }
  }

  if (loading) return <h1 style={{ margin: 'auto' }}>carregando...</h1>

  function renderImage() {
    if (!image) return <h2 style={{ margin: 'auto' }}>Submeta uma imagem para análise</h2>

    return <img src={image} alt="uploaded" />
  }

  function renderResponse() {
    if (!res || Object.keys(res).length <= 0) return null;
    
    return <ReactJson src={res} />
  }

  return (
    <div className="container">
      <h1 style={{ margin: 'auto' }}>
        Exemplo de consumo de APIs de visão computacional
      </h1>
      
      <div className="buttons">
        <input placeholder="url de imagem" type="text" onChange={e => setImage(e.target.value)} />
      </div>
      <div className="buttons">
        <button onClick={() => handleButtonClick(TAGS)}>
          tags
        </button>
        <button onClick={() => handleButtonClick(COLORS)}>
          cores predominantes
        </button>
        <button onClick={() => handleButtonClick(FACES)}>
          rostos
        </button>
      </div>
      {renderImage()}
      {renderResponse()}
    </div>
  );
}
