"use server"

import { Client } from "@gradio/client"

interface GradioResponse {
  data?: any
}

interface ProcessedImageResult {
  url?: string
  path?: string
  image?: string
  name?: string
}

const HF_SPACE_BASE_URL = "https://not-lain-background-removal.hf.space"

export async function removeBackground(image: string): Promise<string> {
  // Validate input
  if (!image || typeof image !== "string") {
    throw new Error("Invalid image URL provided")
  }

  let imageBlob: Blob

  try {
    const response = await fetch(image)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
    }
    imageBlob = await response.blob()

    // Validate blob size (optional - prevent processing very large images)
    if (imageBlob.size > 10 * 1024 * 1024) {
      // 10MB limit
      throw new Error("Image too large. Please use an image smaller than 10MB.")
    }
  } catch (error) {
    throw new Error(`Failed to load image: ${error instanceof Error ? error.message : "Unknown error"}`)
  }

  // Helper function to extract URL from response
  const extractImageUrl = async (data: any): Promise<string | null> => {
    if (!data) return null

    if (Array.isArray(data)) {
      return await extractImageUrl(data[0])
    }

    if (typeof data === "string") {
      return data
    }

    if (typeof data === "object") {
      const result = data as ProcessedImageResult
      const url = result.url || result.path || result.image

      if (url) return url

      // Handle file name references
      if (result.name) {
        return `/file=${result.name}`
      }
    }

    return null
  }

  // Helper function to normalize URL
  const normalizeUrl = async (url: string): Promise<string> => {
    if (url.startsWith("http")) return url
    if (url.startsWith("/")) return `${HF_SPACE_BASE_URL}${url}`
    return `${HF_SPACE_BASE_URL}/${url}`
  }

  // Try primary endpoint
  try {
    const client = await Client.connect("not-lain/background-removal")
    const result = (await client.predict("/image", {
      image: imageBlob,
    })) as GradioResponse

    const extractedUrl = await extractImageUrl(result.data)
    if (extractedUrl) {
      return await normalizeUrl(extractedUrl)
    }
  } catch (error) {
    console.warn("Background removal failed:", error)
  }

  throw new Error("Background removal failed. Please try again later.")
}
