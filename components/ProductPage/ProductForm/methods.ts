import { toast } from 'react-toastify'

type Photo = {
  id: number
  width: number
  height: number
  urls: { large: string; regular: string; raw: string; small: string }
  color: string | null
  user: {
    username: string
    name: string
  }
}

export const fetchImages = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setGeneratedImages: (images: string[]) => void
) => {
  if (e.target.value) {
    try {
      // Make an API call to Unsplash to search for images based on the productName
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${e.target.value}&per_page=3&orientation=squarish`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
          },
        }
      )
      const data = await response.json()

      // Retrieve the first image URL from the search results

      if (Array.isArray(data.results) && data.results.length) {
        const generatedImagesUrls = data.results.map(
          ({ urls: { small } }: Photo) => small
        )
        // Update the state with the generated image URL
        setGeneratedImages(generatedImagesUrls)
      } else {
        toast.error("We didn't find any images matched your product")
      }
    } catch (error) {
      toast.error('Server error')
    }
  } else {
    setGeneratedImages([])
  }
}
