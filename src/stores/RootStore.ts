import ExampleStore from "./ExampleStore";

export default class RootStore {
  exampleStore: ExampleStore;

  constructor() {
    this.exampleStore = new ExampleStore(this);
  }
}
