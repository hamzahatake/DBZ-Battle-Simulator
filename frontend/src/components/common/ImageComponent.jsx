import React from 'react'
import { useCharacterImages, useUIElements, getFullImageUrl } from '../../hooks/useImages'
import HeroCover1 from '../../assets/HeroCover1.jpg'
import SearchBanner from '../../assets/SearchBanner.webp'
import AuthBanner from '../../assets/Auth.webp'
import AttackIcon from '../../assets/Attack.png'
import DefenceIcon from '../../assets/Defence.png'
import PlusIcon from '../../assets/Plus.png'

// Component for displaying character images
export const CharacterImage = ({ character, type = 'profile', className = '', alt = '', ...props }) => {
  const getImageUrl = () => {
    if (!character) return null
    if (type === 'profile') return character.profile_image_url
    if (type === 'full_body') return character.full_body_image_url
    return null
  }
  
  const imageUrl = getImageUrl()
  
  if (!imageUrl) {
    return <div className={`bg-gray-200 rounded flex items-center justify-center ${className}`} {...props}>
      <span className="text-gray-500 text-sm">No {type} image for {character?.name || 'character'}</span>
    </div>
  }
  
  return (
    <img
      src={getFullImageUrl(imageUrl)}
      alt={alt || `${character?.name} ${type} image`}
      className={className}
      onError={(e) => {
        console.log('Image load error:', e.target.src)
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'flex'
      }}
      {...props}
    />
  )
}

// Component for displaying UI elements
export const UIIcon = ({ iconName, className = '', alt = '', ...props }) => {
  const { 
    getAttackIcon, 
    getDefenseIcon, 
    getPlusIcon, 
    getAuthBanner, 
    getHeroBanner, 
    getSearchBanner,
    isLoading 
  } = useUIElements()
  
  const getIconUrl = () => {
    switch (iconName) {
      case 'attack': return getAttackIcon()
      case 'defense': return getDefenseIcon()
      case 'plus': return getPlusIcon()
      case 'auth': return getAuthBanner()
      case 'hero': return getHeroBanner()
      case 'search': return getSearchBanner()
      default: return null
    }
  }
  
  const iconUrl = getIconUrl()
  
  // Use actual assets from src/assets
  const getAssetImage = () => {
    switch (iconName) {
      case 'hero':
        return HeroCover1
      case 'search':
        return SearchBanner
      case 'auth':
        return AuthBanner
      case 'attack':
        return AttackIcon
      case 'defense':
        return DefenceIcon
      case 'plus':
        return PlusIcon
      default:
        return null
    }
  }
  
  if (isLoading) {
    return <div className={`animate-pulse bg-gray-300 rounded ${className}`} {...props} />
  }
  
  if (!iconUrl) {
    const assetImage = getAssetImage()
    if (assetImage) {
      return (
        <img
          src={assetImage}
          alt={alt || `${iconName} background`}
          className={className}
          {...props}
        />
      )
    }
    return <div className={`bg-gray-200 rounded flex items-center justify-center ${className}`} {...props}>
      <span className="text-gray-500 text-xs">{iconName}</span>
    </div>
  }
  
  return (
    <img
      src={getFullImageUrl(iconUrl)}
      alt={alt || `${iconName} icon`}
      className={className}
      {...props}
    />
  )
}

// Generic image component that can handle any image URL
export const Image = ({ src, className = '', alt = '', fallback = null, ...props }) => {
  const imageUrl = getFullImageUrl(src)
  
  if (!imageUrl) {
    return fallback || (
      <div className={`bg-gray-200 rounded flex items-center justify-center ${className}`} {...props}>
        <span className="text-gray-500 text-sm">No Image</span>
      </div>
    )
  }
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={(e) => {
        if (fallback) {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'block'
        }
      }}
      {...props}
    />
  )
}
