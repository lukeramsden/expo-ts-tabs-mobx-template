import { makeAutoObservable } from "mobx";

import RootStore from "./RootStore";

export default class ExampleStore {
  rootStore: RootStore;
  exampleStoreValue: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.exampleStoreValue = "Example Store Value";
    makeAutoObservable(this, { rootStore: false });
  }
}
