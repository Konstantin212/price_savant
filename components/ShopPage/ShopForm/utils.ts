export type AutocompleteShops = {
  name: string
  domain: string
  logo: string
}

export const fetchShopNameSuggestions = async (
  value: string
): Promise<AutocompleteShops[]> => {
  if (value) {
    const res = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`,
      {
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_CLEARBIT_KEY}`,
        },
      }
    )

    return res.json()
  }

  return []
}
