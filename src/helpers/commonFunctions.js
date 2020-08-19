
export function generateIds() {
    return Math.random() * 1000000;
}

export function getDate(){

  const date= new Date();

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}


export function orderArrayByDate(list){

  let array= Array.from(list);

  array = array.sort((a,b)=> {
    const dateOne= new Date(a.date);
    const dateTwo= new Date(b.date);

    return dateTwo > dateOne;
  })

  return array;
}