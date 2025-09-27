import { useGetImageUrlsQuery, useGetCharacterImagesQuery, useGetUIElementsQuery } from '../services/api'

// Custom hook for managing all images
export const useImages = () => {
  const { data: imageUrls, isLoading, error } = useGetImageUrlsQuery()
  
  return {
    imageUrls,
    isLoading,
    error,
    // Helper function to get image URL by category and name
    getImageUrl: (category, name) => {
      if (!imageUrls || !imageUrls[category]) return null
      const image = imageUrls[category].find(img => img.name === name)
      return image ? image.url : null
    }
  }
}

// Custom hook for character images
export const useCharacterImages = (characterName) => {
  const { data, isLoading, error } = useGetCharacterImagesQuery(characterName)
  
  return {
    characterImages: data,
    isLoading,
    error,
    // Helper functions
    getProfileImage: () => {
      if (!data?.profile_images?.length) return null
      return data.profile_images[0]?.image_url
    },
    getFullBodyImage: () => {
      if (!data?.full_body_images?.length) return null
      return data.full_body_images[0]?.image_url
    },
    getAllProfileImages: () => {
      return data?.profile_images || []
    },
    getAllFullBodyImages: () => {
      return data?.full_body_images || []
    }
  }
}

// Custom hook for UI elements
export const useUIElements = () => {
  const { data: uiElements, isLoading, error } = useGetUIElementsQuery()
  
  return {
    uiElements,
    isLoading,
    error,
    // Helper functions for specific UI elements
    getAttackIcon: () => {
      const attackIcon = uiElements?.find(img => img.name === 'Attack')
      return attackIcon?.image_url || null
    },
    getDefenseIcon: () => {
      const defenseIcon = uiElements?.find(img => img.name === 'Defence')
      return defenseIcon?.image_url || null
    },
    getPlusIcon: () => {
      const plusIcon = uiElements?.find(img => img.name === 'Plus')
      return plusIcon?.image_url || null
    },
    getAuthBanner: () => {
      const authBanner = uiElements?.find(img => img.name === 'Auth')
      return authBanner?.image_url || null
    },
    getHeroBanner: () => {
      const heroBanner = uiElements?.find(img => img.name === 'HeroCover1')
      return heroBanner?.image_url || null
    },
    getSearchBanner: () => {
      const searchBanner = uiElements?.find(img => img.name === 'SearchBanner')
      return searchBanner?.image_url || null
    }
  }
}

// Helper function to get full image URL
export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  return `http://localhost:8000${imagePath}`
}
