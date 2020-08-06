import storage from '../index';


const TASK_KEY= "@MyStore:Task"

export async function getList(){

    const items= await storage.getData(TASK_KEY);

    if (items===null){
        return [];
    }

    return items;

}

export async function saveList(items){

  return await storage.saveData(TASK_KEY, items);
}