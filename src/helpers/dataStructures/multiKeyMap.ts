type Submap<KeyType = any, ValueType = any> = Map<KeyType | Symbol, Submap<KeyType, ValueType> | ValueType>

export default class MultiKeyMap<KeyType = any, ValueType = any> {
  private readonly _defaultValue: ValueType;
  private readonly _impl: Submap<KeyType, ValueType>;
  private static _leafSymbol = Symbol("_leaf_symbol");

  private static assertUsableKey(key: any) {
    if (key === this._leafSymbol) throw new Error("This key value is used for the implementation of the data structure, therefore unusable.");
  }

  private traverse(keys: KeyType[]) {
    let cur = this._impl;
    for (let key of keys) {
      MultiKeyMap.assertUsableKey(key);
      if (!cur.has(key)) cur.set(key, new Map());
      const childMap = cur.get(key)!;
      if (!(childMap instanceof Map)) {
        throw new Error("Implementation error.");
      }
      cur = childMap;
    }
    return cur;
  }

  constructor(defaultValue: ValueType, keyPairs?: [KeyType[], ValueType][]) {
    this._defaultValue = defaultValue;
    this._impl = new Map();
    if (keyPairs) {
      for (let [path, val] of keyPairs) {
        this.set(path, val);
      }
    }
  }

  set(path: KeyType[], value: ValueType): this {
    let leafMap = this.traverse(path);
    leafMap.set(MultiKeyMap._leafSymbol, value);
    return this;
  }

  get(path: KeyType[]): ValueType {
    let leafMap = this.traverse(path);
    if (!leafMap.has(MultiKeyMap._leafSymbol)) {
      return this._defaultValue;
    }
    return leafMap.get(MultiKeyMap._leafSymbol) as ValueType;
  }

  private* traverseRecursively(submap: Submap<KeyType, ValueType>, path: KeyType[]): IterableIterator<[KeyType[], ValueType]> {
    for (let [key, value] of submap.entries()) {
      if (key === MultiKeyMap._leafSymbol) {
        yield [path, value as ValueType];
      } else {
        const subpath: KeyType[] = [...path, key] as KeyType[];
        const submap = value as Submap<KeyType, ValueType>;
        for (let [recursivePath, recursiveValue] of this.traverseRecursively(submap, subpath)) {
          yield [recursivePath, recursiveValue];
        }
      }
    }
  }

  *entries() {
    for (let [path, value] of this.traverseRecursively(this._impl, [])) {
      yield [path, value];
    }
  }
}
