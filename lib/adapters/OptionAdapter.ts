type Data<Row> = Row[] | null
type FieldNames<Row> = [keyof Row, keyof Row, keyof Row]
interface IOptionAdapter<Row> {
  data: Data<Row>
  fieldNames: FieldNames<Row>
}

// fieldNames -> should have 3 elements, [label, value, image]

export class OptionAdapter<Row extends Record<string, any>>
  implements IOptionAdapter<Row>
{
  data: Data<Row>
  fieldNames: FieldNames<Row>
  constructor(data: Data<Row>, fieldNames: FieldNames<Row>) {
    this.data = data
    this.fieldNames = fieldNames
  }

  transformData() {
    if (!this.data) return []

    const [labelKey, valueKey, imageKey] = this.fieldNames

    return this.data.map((d) => ({
      label: d[labelKey].toString(),
      value: d[valueKey].toString(),
      image: d[imageKey].toString(),
    }))
  }
}
