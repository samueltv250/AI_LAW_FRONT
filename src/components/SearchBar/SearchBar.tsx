import React, { useState } from 'react';
import { IonIcon } from "@ionic/react";
import { searchOutline, chevronUpOutline, hourglassOutline } from "ionicons/icons";
import Switch from "react-switch";

function SearchBar({ onSearch, results, onResultClick, setResults}: { onSearch: Function, results: any[], onResultClick: Function, setResults: Function }) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Meaning");

  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [isFilterPressed, setFilterPressed] = useState(false);
  const modeMapping: { [key: string]: string } = {
    'Meaning': 'Contenido',
    'Word': 'Titulo'
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setResults([]); // Clear results before searching

    try {
      await onSearch(query, selectedFilters, selectedMode);
    } catch (error) {
      console.error('Error during search:', error);
    }
    setIsLoading(false); // End loading
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prevFilters => 
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };
  const toggleModeDropdown = () => {
    setModeDropdownOpen(!modeDropdownOpen);
  };
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setFilterPressed(!isFilterPressed);
  };

  return (
    <div className="relative">
      {results.length > 0 && (
  <ul className="absolute w-full text-black left-0 top-0 transform translate-y-[-100%] bg-white border border-gray-700 rounded-md shadow-md z-20 max-h-[50vh] overflow-y-auto">
  {results.map(result => (
            <li 
              key={result.doc_id} 
              onClick={() => onResultClick(result.doc_id)}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
            >
              <div><strong>{result.doc_title}</strong></div>
              <div style={{ fontSize: 'smaller' }}>{result.content_hit}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between dark:bg-[#40414f] bg-white dark:border-white border-gray-700 border-2 rounded-md shadow-md">
        <div className="flex-grow p-2">
          <input
            type="text"
            className="w-full px-2 py-1 outline-none dark:bg-transparent dark:text-white"
            placeholder="Inguesa tu busqueda legal aqui..."
            color='81b0ff'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            disabled={isLoading}
          />
        </div>
      
        <div className="relative p-4">
  <label className="flex items-center">

    <span className="mr-2 text-black dark:text-white">{modeMapping[selectedMode]}</span>
    <Switch
      onChange={() => setSelectedMode(prevMode => prevMode === 'Meaning' ? 'Word' : 'Meaning')}
      checked={selectedMode === 'Meaning'}
      offColor="#767577"
      onColor="#81b0ff"
      offHandleColor="#f4f3f4"
      onHandleColor="#2693e6"
      handleDiameter={30}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={20}
      width={48}
      className="react-switch"
    />
  </label>
</div>
        <div className="md:block hidden"></div>
        <div className="relative"
        // onMouseEnter={() => setModeDropdownOpen(true)}
        // onMouseLeave={() => setDropdownOpen(false)}
        >
            <div className="p-4">
            <button
  type="button"
  className={`px-3 border-l dark:border-gray-600 border-gray-200 ${isFilterPressed ? 'opacity-50' : ''}`}
  onClick={toggleDropdown}
  disabled={isLoading}
  style={{ color: 'white' }}
>
  Filter <IonIcon icon={chevronUpOutline} />
</button>
          </div>
          {dropdownOpen && (
            <ul className="absolute right-0 z-20 w-40 bottom-full mb-1 bg-white border border-gray-700 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {[
    "DECRETO LEY",
    "DECRETO",
    "LEY",
    "RESOLUCION",
    "ACUERDO",
    "OPINION",
    "RESOLICUCION",
    "CIRCULAR",
    "RESUELTO",
    // "CONTRATO DE COMPRAVENTA",
    
    // "ADENDA",
    // "ACTA",
    // "NOTA",
    // "REQUISITOS",
    // "CONTRATO",
    // "REGLAMENTO",
    // "REUNION",
    "SENTENCIAS",
    // "ESTATUTO",
    // "TEXTO",
    // "CONVOCATORIA",
    // "AVISO",
    // "CONVENIO",
    "ORDEN",
    "EDICTO",
    // "PROTOCOLO",
    // "PACTO",
    // "CODIGO",
    // "ANEXO",
    // "COMUNICADO",
    // "LICITACION",
    // "MANUAL",
    // "MEMORANDUM",
    // "GLOSARIO",
    "SENTENCIA",
    "FALLO",
    // "MEMORANDO",
    // "CRITERIO",
    // "DISCURSO",
    // "INFORME",
  ].map((filter) => (
                <li
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`cursor-pointer p-2 hover:bg-gray-100 ${
                    selectedFilters.includes(filter) ? 'bg-gray-700 text-white' : 'text-gray-700'
                  }`}
                >
                  {filter}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="p-2 border-l dark:border-gray-600 border-gray-200 rounded-r-md flex items-center"
          onClick={handleSearch}
          disabled={isLoading}
          style={{ color: 'white' }}
        >
          {isLoading ? <IonIcon icon={hourglassOutline} /> : <IonIcon icon={searchOutline} />}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
