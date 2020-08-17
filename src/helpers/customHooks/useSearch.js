import {useState} from 'react'

export function useSearch(originArray, entityName){

    const [filters, setFilters]= useState([]);

    function search(value){
        if (value !== "") {
            const filtered = originArray.filter((s) => s[entityName].toLowerCase().includes(value.toLowerCase()));
            setFilters(filtered);
          } else {
              setFilters(data);
          }
    }

    return [filters, search];
}