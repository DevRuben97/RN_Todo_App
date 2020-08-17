
export function generateIds() {
    return Math.random() * 1000000;
}

export function getDate(){

  const date= new Date();

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}