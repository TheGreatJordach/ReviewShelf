export function HandleError(
  target:any,
  propertyKey:string,
  descriptor:PropertyDescriptor,
){
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args:unknown[]){
    try {
      const result = await originalMethod.apply(this, args);
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }
  return descriptor;
}
