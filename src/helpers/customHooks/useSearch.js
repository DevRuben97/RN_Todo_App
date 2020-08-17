import {useState} from 'react'

export function useSearch(originArray, entityName,value){

    const [filters, setFilters]= useState([]);

    if (value !== "") {
      const filtered = originArray.filter((s) => s[entityName].toLowerCase().includes(value.toLowerCase()));
      setFilters(filtered);
    } else {
        setFilters(data);
    }

    return [filters, setFilters];
}