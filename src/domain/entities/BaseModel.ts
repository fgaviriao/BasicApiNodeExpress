export abstract class BaseModel {
  /**
   * Copia los valores del objeto donde los nombres de las propiedades coincidan.
   * @param source El objeto de origen del cual se copiarán las propiedades.
   * @returns La misma instancia de la clase, con las propiedades actualizadas.
   */
  public copy<T extends object>(source: T): this {
    for (const key in source) {
      if (key in this) {
        (this as any)[key] = (source as any)[key];
      }
    }
    return this;
  }
  /**
   * Mapea un arreglo de objetos de origen a un nuevo arreglo de instancias de la clase actual.
   * @param sourceArray El arreglo de objetos a mapear.
   * @returns Un nuevo arreglo de instancias de la clase, con las propiedades copiadas.
   */
  public mapArray<T extends object>(sourceArray: T[]): this[] {
    return sourceArray.map((item) => {
      const newInstance = Object.create(this);
      newInstance.copy(item);
      return newInstance;
    });
  }
}
