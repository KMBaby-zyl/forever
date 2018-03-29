export function add(a, b){
  console.log('add');
  return a + b;
}


export function extend(obj1, obj2){
  console.log('extend');
  return Object.assign({}, obj1, obj2);
}

