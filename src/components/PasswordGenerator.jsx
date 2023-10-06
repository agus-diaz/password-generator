import React, { useState } from 'react';

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let allChars = '';
  let password = '';

  if (includeUppercase) allChars += uppercaseChars;
  if (includeLowercase) allChars += lowercaseChars;
  if (includeNumbers) allChars += numberChars;
  if (includeSpecialChars) allChars += specialChars;

  if (allChars === '') {
    return 'Selecciona al menos un tipo de carácter.';
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
}

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGeneratePassword = () => {
    if (length > 30) {
      setErrorMessage('La longitud máxima de la contraseña es de 30 caracteres.');
      setPassword('');
    } else {
      const newPassword = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars);
      setPassword(newPassword);
      setErrorMessage('');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Contraseña copiada al portapapeles.');
  };

  return (

    <div className="App">
      <h1>Generador de Contraseñas</h1>
      <div>
        <label>Longitud de la Contraseña: {length}</label>
        <input
          type="range"
          min="1"
          max="30"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      
      <div>
        <label>Incluir Mayúsculas:</label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
        />
      </div>

      <div>
        <label>Incluir Minúsculas:</label>
        <input
          type="checkbox"
          checked={includeLowercase}
          onChange={() => setIncludeLowercase(!includeLowercase)}
        />
      </div>

      <div>
        <label>Incluir Números:</label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </div>

      <div>
        <label>Incluir Caracteres Especiales:</label>
        <input
          type="checkbox"
          checked={includeSpecialChars}
          onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
        />
      </div>

      <button className="btn" onClick={handleGeneratePassword}>Generar Contraseña</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {password && (
        <div>
          <h2>Contraseña Generada:</h2>
          <p>{password}</p>
          <button className="btn" onClick={handleCopyToClipboard}>Copiar al Portapapeles</button>
        </div>
      )}
      
    </div>
  );
}

export default App;