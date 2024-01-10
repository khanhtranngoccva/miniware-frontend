import {immerable} from "immer";

type Submap<KeyType = any, ValueType = any> = Map<KeyType | Symbol, Submap<KeyType, ValueType> | ValueType>
export default class MultiKeyMap<KeyType = any, ValueType = any> {
  [immerable] = false;
  private readonly _defaultValue: ValueType;
  private _impl: Submap<KeyType, ValueType>;
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
      for (let [key, val] of keyPairs) {
        this.set(key, val);
      }
    }
    this[immerable] = true;
  }

  set(keys: KeyType[], value: ValueType): this {
    let leafMap = this.traverse(keys);
    leafMap.set(MultiKeyMap._leafSymbol, value);
    return this;
  }

  get(keys: KeyType[]): ValueType {
    let leafMap = this.traverse(keys);
    if (!leafMap.has(MultiKeyMap._leafSymbol)) {
      return this._defaultValue;
    }
    return leafMap.get(MultiKeyMap._leafSymbol) as ValueType;
  }
}
