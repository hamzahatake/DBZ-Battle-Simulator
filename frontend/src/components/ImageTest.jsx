import React from 'react'
import { useGetImageUrlsQuery, useGetUIElementsQuery } from '../services/api'
import { getFullImageUrl } from '../hooks/useImages'

const ImageTest = () => {
  const { data: imageUrls, isLoading: urlsLoading, error: urlsError } = useGetImageUrlsQuery()
  const { data: uiElements, isLoading: uiLoading, error: uiError } = useGetUIElementsQuery()

  console.log('Image URLs:', imageUrls)
  console.log('UI Elements:', uiElements)

  if (urlsLoading || uiLoading) {
    return <div>Loading images...</div>
  }

  if (urlsError || uiError) {
    return (
      <div>
        <h3>Error loading images:</h3>
        <p>URLs Error: {urlsError?.message}</p>
        <p>UI Error: {uiError?.message}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Test Component</h2>
      
      <h3>Direct Image URLs Test:</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <img 
          src="http://localhost:8000/media/images/profile/Goku_Base.jpg" 
          alt="Goku Direct" 
          style={{ width: '100px', height: '100px', border: '1px solid red' }}
          onError={(e) => console.log('Direct image error:', e)}
          onLoad={() => console.log('Direct image loaded successfully')}
        />
        <img 
          src="http://localhost:8000/media/images/Attack.png" 
          alt="Attack Direct" 
          style={{ width: '50px', height: '50px', border: '1px solid red' }}
          onError={(e) => console.log('Attack image error:', e)}
          onLoad={() => console.log('Attack image loaded successfully')}
        />
      </div>

      <h3>API Image URLs:</h3>
      {imageUrls && (
        <div>
          <h4>Character Profile Images:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {imageUrls.character_profile?.slice(0, 5).map((img, index) => (
              <div key={index} style={{ border: '1px solid blue', padding: '5px' }}>
                <img 
                  src={getFullImageUrl(img.url)} 
                  alt={img.name}
                  style={{ width: '80px', height: '80px' }}
                  onError={(e) => console.log('API image error:', img.name, e)}
                  onLoad={() => console.log('API image loaded:', img.name)}
                />
                <p style={{ fontSize: '10px' }}>{img.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3>UI Elements:</h3>
      {uiElements && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {uiElements.slice(0, 5).map((img, index) => (
            <div key={index} style={{ border: '1px solid green', padding: '5px' }}>
              <img 
                src={getFullImageUrl(img.image_url)} 
                alt={img.name}
                style={{ width: '50px', height: '50px' }}
                onError={(e) => console.log('UI image error:', img.name, e)}
                onLoad={() => console.log('UI image loaded:', img.name)}
              />
              <p style={{ fontSize: '10px' }}>{img.name}</p>
            </div>
          ))}
        </div>
      )}

      <h3>Raw Data:</h3>
      <pre style={{ fontSize: '10px', background: '#f0f0f0', padding: '10px' }}>
        {JSON.stringify({ imageUrls, uiElements }, null, 2)}
      </pre>
    </div>
  )
}

export default ImageTest
