export class CountryDataItem {
  public constructor(init: Partial<CountryDataItem>) {
      Object.assign(this, init);
  }

  public X: number;
  public USA: number;
  public China: number;
  public Russia: number;
  public Switch1: number;
  public Switch2: number;

}
export class CountryData extends Array<CountryDataItem> {
  public constructor() {
      super();
      this.push(new CountryDataItem(
      {
          X: 0,
          USA: 34,
          China: 21,
          Russia: 19,
          Switch1: 0,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 5,
          USA: 43,
          China: 26,
          Russia: 24,
          Switch1: 0,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 10,
          USA: 66,
          China: 29,
          Russia: 28,
          Switch1: -1,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 15,
          USA: 69,
          China: 32,
          Russia: 26,
          Switch1: 0,
          Switch2: 1,
      }));
      this.push(new CountryDataItem(
      {
          X: 20,
          USA: 58,
          China: 47,
          Russia: 38,
          Switch1: 0,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 25,
          USA: 40,
          China: 46,
          Russia: 31,
          Switch1: 0,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 30,
          USA: 78,
          China: 50,
          Russia: 19,
          Switch1: 0,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 35,
          USA: 13,
          China: 90,
          Russia: 52,
          Switch1: 0,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 40,
          USA: 78,
          China: 132,
          Russia: 50,
          Switch1: 1,
          Switch2: 2,
      }));
      this.push(new CountryDataItem(
      {
          X: 45,
          USA: 40,
          China: 134,
          Russia: 34,
          Switch1: 0,
          Switch2: 3,
      }));
      this.push(new CountryDataItem(
      {
          X: 50,
          USA: 80,
          China: 96,
          Russia: 38,
          Switch1: 0,
          Switch2: 2,
      }));
  }
}