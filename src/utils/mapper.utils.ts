export class Mapper {
  public static mapObject<TSource extends object, TTarget extends object>(
    source: TSource,
    target: TTarget
  ): TTarget {
    for (const key in source) {
      if (key in target) {
        (target as any)[key] = (source as any)[key];
      }
    }
    return target;
  }

  /**
   * Mapea un arreglo de objetos de origen a un nuevo arreglo de instancias de una clase de destino.
   * @param {object} sourceArray El arreglo de objetos a mapear.
   * @param {object} targetClass El constructor de la clase de destino.
   * @returns {object[]} Un nuevo arreglo de instancias de la clase de destino.
   */
  public static mapArray<TSource extends object, TTarget extends object>(
    sourceArray: TSource[],
    targetClass: new (...args: any[]) => TTarget
  ): TTarget[] {
    return sourceArray.map((item) => {
      return Mapper.mapObject(item, new targetClass());
    });
  }
}
