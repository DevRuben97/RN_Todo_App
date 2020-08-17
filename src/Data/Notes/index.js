import storage from '../index';


const NOTES_KEY= "@MyStore:Note"

export async function getNotesList(){

    const items= await storage.getData(NOTES_KEY);

    if (items===null){
        return [];
    }

    return items;

}

export async function saveNotes(items){

  return await storage.saveData(NOTES_KEY, items);
}

export async function getItem(id){
    const items= await storage.getData(NOTES_KEY);
    
    if (items){

        return items.filter(s=> s.id=== id)[0];
    }
    else{
        return null;
    }
}

export async function addNewItem(data){
    let items= await storage.getData(NOTES_KEY);

    if (items){
        items.push(data);
    }
    else{
        items= [data];
    }

    await storage.saveData(NOTES_KEY, items);
}

export async function deleteItem(id){
    let items= await storage.getData(NOTES_KEY);

    if (items){
        
        items= items.filter(s=> s.id!== id);
    }
    else{
        return false;
    }

    await storage.saveData(NOTES_KEY, items);
}

export async function updateItem(data){
    let items= await storage.getData(NOTES_KEY);

    if (items){
        items.forEach(item => {
            if (item.id=== data.id){
                item.description= data.description;
                item.date= data.date;
            }
        });

        await storage.saveData(NOTES_KEY, items);
    }
    else{
        return false;
    }
}