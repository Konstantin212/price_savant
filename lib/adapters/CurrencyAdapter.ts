export class CurrencyAdapter {
  constructor(readonly price: string | number) {
    this.price = price
  }

  getCentPrice(): number {
    if (!this.price) return 0

    return Number(this.price) * 100
  }

  getReadablePrice(): number {
    if (!this.price) return 0

    return Number(this.price) / 100
  }
}
