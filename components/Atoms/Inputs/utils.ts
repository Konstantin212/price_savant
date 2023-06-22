import { Option } from '@/components/Atoms/Inputs/CreatableSelect'

export const createSuggestions = async <
  T extends { domain: string; name: string; logo: string }
>(
  inputValue: string,
  optionFn: (input: string) => Promise<T[]>
) => {
  if (inputValue) {
    // Fetch data from the API based on the inputValue
    const data: T[] = await optionFn(inputValue)
    let options: Option[] = []

    if (data) {
      // Process the API response data
      options = data.map((item: T) => ({
        value: item.domain,
        label: item.name,
        icon: item.logo,
      }))
    }

    // If no options found, include the ability to create a new option
    if (options && options.length === 0) {
      options.push({ value: inputValue, label: `Create new: ${inputValue}` })
    }

    return options || []
  }

  return []
}
