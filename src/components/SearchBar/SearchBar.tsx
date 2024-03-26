import React, { useState } from 'react';
import { IonIcon } from "@ionic/react";
import { searchOutline, chevronUpOutline, hourglassOutline } from "ionicons/icons";

function SearchBar({ onSearch, results, onResultClick }: { onSearch: Function, results: any[], onResultClick: Function }) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>('');

  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // results = results || [];
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
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
  };

  return (
    <div className="relative">
      {results.length > 0 && (
  <ul className="absolute w-full left-0 top-0 transform translate-y-[-100%] bg-white border border-gray-700 rounded-md shadow-md z-20 max-h-[50vh] overflow-y-auto">
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
            placeholder="Enter your search query"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            disabled={isLoading}
          />
        </div>
        <div className="relative">
          <button
            type="button"
            className="px-3 border-l dark:border-gray-600 border-gray-200"
            onClick={toggleDropdown}
            disabled={isLoading}
            style={{ color: 'white' }}
          >
            Filter <IonIcon icon={chevronUpOutline} />
          </button>
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
    "CONTRATO DE COMPRAVENTA",
    "FALLO",
    "ADENDA",
    "ACTA",
    "NOTA",
    "REQUISITOS",
    "CONTRATO",
    "REGLAMENTO",
    "REUNION",
    "SENTENCIAS",
    "ESTATUTO",
    "TEXTO",
    "CONVOCATORIA",
    "AVISO",
    "CONVENIO",
    "ORDEN",
    "EDICTO",
    "PROTOCOLO",
    "PACTO",
    "CODIGO",
    "ANEXO",
    "COMUNICADO",
    "LICITACION",
    "MANUAL",
    "MEMORANDUM",
    "GLOSARIO",
    "SENTENCIA",
    "MEMORANDO",
    "CRITERIO",
    "DISCURSO",
    "INFORME",].map((filter) => (
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
        <div className="relative">
          <button
            type="button"
            className="px-3 border-l dark:border-gray-600 border-gray-200"
            onClick={toggleModeDropdown}
            disabled={isLoading}
            style={{ color: 'white' }}
          >
            Mode <IonIcon icon={chevronUpOutline} />
          </button>
          {modeDropdownOpen && (
            <ul className="absolute right-0 z-20 w-40 bottom-full mb-1 bg-white border border-gray-700 rounded-md shadow-lg">
              {/* Mode Options */}
              {["Word", "Meaning"].map((mode) => (
                <li
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`cursor-pointer p-2 hover:bg-gray-100 ${
                    selectedMode === mode ? 'bg-gray-700 text-white' : 'text-gray-700'
                  }`}
                >
                  {mode}
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
