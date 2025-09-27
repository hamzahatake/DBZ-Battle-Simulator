# 🎮 Django Admin Setup Guide

## 📋 Overview

This guide explains how to add characters and images through Django admin interface.

## 🚀 Getting Started

### 1. Start Django Server
```bash
cd backend
python manage.py runserver
```

### 2. Access Django Admin
- Go to: `http://localhost:8000/admin/`
- Username: `admin`
- Password: `admin123` (you'll need to set this)

### 3. Set Admin Password (First Time)
```bash
cd backend
python manage.py changepassword admin
```

## 🖼️ Adding Character Images

### Method 1: Through Django Admin Interface

1. **Navigate to Image Assets**
   - Go to `Assets` → `Image Assets`
   - Click `Add Image Asset`

2. **Fill in the Form**
   - **Name**: `{CharacterName}_Profile` or `{CharacterName}_FullBody`
   - **Category**: 
     - `character_profile` - For homepage portrait images
     - `character_full_body` - For team section and homepage end panel
   - **Character Name**: Exact name from CHARACTER_DETAILS.md
   - **Description**: Character description
   - **Image File**: Upload the image file
   - **Is Active**: ✅ Check this box

3. **Character Names** (Use exactly as listed):
   - `Goku`
   - `Goku Super Saiyan`
   - `Goku Black Rose`
   - `Goku Ultra Instinct`
   - `Vegeta Ultra Ego`
   - `Piccolo Orange`
   - `Frieza Black`
   - `Gohan Beast`
   - `Cell Max`
   - `Kid Buu`
   - `Kid Gohan`

### Method 2: Using Management Command

```bash
cd backend
python manage.py add_character "Goku" "path/to/profile.jpg" "path/to/fullbody.png" --description "The legendary Saiyan warrior"
```

## 📁 Image Requirements

### Profile Images (`character_profile`)
- **Purpose**: Homepage character showcase
- **Dimensions**: 300x400px (portrait)
- **Format**: JPG, PNG, WebP
- **Naming**: `{CharacterName}_Profile.{ext}`

### Full Body Images (`character_full_body`)
- **Purpose**: Team section and homepage end panel
- **Dimensions**: 400x600px (portrait)
- **Format**: JPG, PNG, WebP
- **Naming**: `{CharacterName}_FullBody.{ext}`

## 🎯 Adding UI Elements

### Attack/Defense Icons
- **Name**: `Attack` or `Defence`
- **Category**: `icon`
- **Character Name**: Leave empty
- **Description**: `Attack icon` or `Defense icon`

### Banners
- **Name**: `SearchBanner`, `Auth`, `HeroCover1`
- **Category**: `banner`
- **Character Name**: Leave empty
- **Description**: Banner description

## 🔧 Folder Structure

```
backend/media/images/
├── profile/          # Character profile images
├── full_body/        # Character full body images
└── [other files]    # UI elements, banners, etc.
```

## ✅ Verification

### Check Images Are Added
1. Go to `Assets` → `Image Assets`
2. Verify images appear in the list
3. Check that `Is Active` is checked

### Test API Endpoints
```bash
# Test character images
curl "http://localhost:8000/api/assets/images/character_images/?character=Goku"

# Test UI elements
curl "http://localhost:8000/api/assets/images/ui_elements/"
```

### Test Frontend
1. Start frontend: `cd frontend && npm run dev`
2. Visit: `http://localhost:5173/characters`
3. Verify images load correctly

## 🚨 Troubleshooting

### Images Not Showing
1. Check Django server is running
2. Verify images are uploaded to correct folder
3. Check `Is Active` is checked in admin
4. Verify character names match exactly

### API Errors
1. Check Django server logs
2. Verify CORS settings
3. Test API endpoints directly

### Frontend Errors
1. Check browser console for errors
2. Verify API calls in Network tab
3. Check character names match backend

## 📝 Quick Reference

### Character Categories
- `character_profile` - Portrait images
- `character_full_body` - Full character artwork
- `ui_element` - UI components
- `banner` - Background images
- `icon` - Small UI elements

### Required Fields
- **Name**: Unique identifier
- **Category**: Image type
- **Image File**: The actual image
- **Is Active**: Must be checked

### Optional Fields
- **Character Name**: For character images
- **Description**: Helpful description

## 🎮 Next Steps

After adding images:
1. Test the frontend to ensure images load
2. Add more characters as needed
3. Update character data in `frontend/src/data/characters.js` if needed
4. Test battle system with new characters
