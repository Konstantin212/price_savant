interface IOptionAdapter<Row> {
  data: Row[]
  fieldNames: [keyof Row, keyof Row, keyof Row]
}

// fieldNames -> should have 3 elements, [label, value, image]

export class OptionAdapter<Row> implements IOptionAdapter<Row> {
  data: Row[]
  fieldNames: [keyof Row, keyof Row, keyof Row]
  constructor(data: Row[], fieldNames: [keyof Row, keyof Row, keyof Row]) {
    this.data = data
    this.fieldNames = fieldNames
  }

  transformData() {
    const [labelKey, valueKey, imageKey] = this.fieldNames

    return this.data.map((d) => ({
      label: `${d[labelKey]}`,
      value: d[valueKey],
      image: d[imageKey],
    }))
  }
}
