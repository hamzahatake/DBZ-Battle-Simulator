# Image Migration Guide

This guide explains how to update your components to use the new backend image API instead of local images.

## Overview

All images have been moved from `frontend/public/images/` to `backend/media/images/` and are now served through Django's media system with a REST API.

## API Endpoints

- `GET /api/assets/images/` - Get all images
- `GET /api/assets/images/by_category/?category=character_profile` - Get images by category
- `GET /api/assets/images/character_images/?character=Goku` - Get character-specific images
- `GET /api/assets/images/ui_elements/` - Get UI elements and icons
- `GET /api/assets/image-urls/` - Get all image URLs organized by category

## Using the New Image System

### 1. Import the Image Components

```jsx
import { CharacterImage, UIIcon, Image } from '../components/common/ImageComponent'
```

### 2. Replace Static Image References

**Before:**
```jsx
<img src="/images/profile/Goku_Base.jpg" alt="Goku" />
<img src="/images/Attack.png" alt="Attack" />
```

**After:**
```jsx
<CharacterImage characterName="Goku" type="profile" alt="Goku" />
<UIIcon iconName="attack" alt="Attack" />
```

### 3. Using Custom Hooks

```jsx
import { useCharacterImages, useUIElements } from '../hooks/useImages'

function MyComponent() {
  const { getProfileImage, getFullBodyImage } = useCharacterImages('Goku')
  const { getAttackIcon } = useUIElements()
  
  return (
    <div>
      <img src={getFullImageUrl(getProfileImage())} alt="Goku Profile" />
      <img src={getFullImageUrl(getAttackIcon())} alt="Attack Icon" />
    </div>
  )
}
```

### 4. Direct API Usage

```jsx
import { useGetCharacterImagesQuery } from '../services/api'

function CharacterComponent({ characterName }) {
  const { data, isLoading } = useGetCharacterImagesQuery(characterName)
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {data?.profile_images?.map(image => (
        <img key={image.id} src={getFullImageUrl(image.image_url)} alt={image.name} />
      ))}
    </div>
  )
}
```

## Component Examples

### Character Card Component

```jsx
import { CharacterImage } from '../components/common/ImageComponent'

export const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <CharacterImage 
        characterName={character.name}
        type="profile"
        className="w-32 h-32 rounded-full"
        alt={`${character.name} profile`}
      />
      <h3>{character.name}</h3>
    </div>
  )
}
```

### Battle Interface

```jsx
import { CharacterImage, UIIcon } from '../components/common/ImageComponent'

export const BattleInterface = ({ character1, character2 }) => {
  return (
    <div className="battle-interface">
      <div className="character1">
        <CharacterImage 
          characterName={character1.name}
          type="full_body"
          className="w-48 h-64"
        />
      </div>
      
      <div className="vs-section">
        <UIIcon iconName="attack" className="w-8 h-8" />
      </div>
      
      <div className="character2">
        <CharacterImage 
          characterName={character2.name}
          type="full_body"
          className="w-48 h-64"
        />
      </div>
    </div>
  )
}
```

## Migration Checklist

- [ ] Remove images from `frontend/public/images/`
- [ ] Update all `<img>` tags to use new components
- [ ] Replace static image paths with API calls
- [ ] Test image loading and fallbacks
- [ ] Update any CSS that references image paths
- [ ] Verify all character images load correctly
- [ ] Test UI icons and banners

## Benefits

1. **Centralized Management**: All images managed through Django admin
2. **Dynamic Loading**: Images loaded based on character data
3. **Better Performance**: Images served efficiently by Django
4. **Scalability**: Easy to add new images without frontend changes
5. **Consistency**: Standardized image handling across the app

## Troubleshooting

### Images Not Loading
- Check if Django server is running on port 8000
- Verify CORS settings in Django
- Check browser network tab for 404 errors

### Character Images Not Found
- Ensure character names match exactly (case-sensitive)
- Check if images exist in Django admin
- Verify image categories are correct

### Performance Issues
- Images are cached by RTK Query
- Use appropriate image sizes
- Consider lazy loading for large images
