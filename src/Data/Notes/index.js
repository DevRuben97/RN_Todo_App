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