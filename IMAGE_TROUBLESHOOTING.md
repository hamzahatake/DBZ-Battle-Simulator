# 🖼️ Image Loading Troubleshooting Guide

## ✅ Issues Fixed

### 1. **Django Server Location**
- **Problem**: Django server was being started from root directory instead of backend
- **Solution**: Start Django server from `backend/` directory
- **Command**: `cd backend && python manage.py runserver`

### 2. **CORS Configuration**
- **Problem**: CORS might block frontend requests
- **Solution**: Added `CORS_ALLOW_ALL_ORIGINS = True` for development
- **File**: `backend/dbz_battle_simulator/settings.py`

### 3. **Frontend Image Imports**
- **Problem**: Components still importing from old `/images/` paths
- **Solution**: Updated components to use new image API
- **Files Updated**:
  - `CharacterListPage.jsx` - Search banner
  - `CharacterDetail.jsx` - Character images
  - `FullBodyCharacterCard.jsx` - Character and UI icons

## 🧪 Testing the Fix

### 1. **Start Both Servers**

**Backend (Terminal 1):**
```bash
cd backend
python manage.py runserver
# Should show: Starting development server at http://127.0.0.1:8000/
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
# Should show: Local: http://localhost:5173/
```

### 2. **Test Image Loading**

**Visit the test page:**
- Go to: `http://localhost:5173/image-test`
- This page shows:
  - Direct image URLs (should work)
  - API-loaded images (should work)
  - UI elements (should work)
  - Raw API data (for debugging)

### 3. **Check Browser Console**

**Open Developer Tools (F12) and check:**
- Network tab for failed requests
- Console for error messages
- Look for CORS errors or 404s

## 🔧 Common Issues & Solutions

### Issue: Images Still Not Loading

**Check 1: Django Server Running**
```bash
curl http://localhost:8000/api/assets/image-urls/
# Should return JSON with image data
```

**Check 2: Direct Image Access**
```bash
curl http://localhost:8000/media/images/profile/Goku_Base.jpg
# Should return image data (binary)
```

**Check 3: Frontend API Calls**
- Open browser DevTools → Network tab
- Refresh page
- Look for requests to `localhost:8000/api/assets/`
- Check if they return 200 status

### Issue: CORS Errors

**Symptoms:**
- Console shows "CORS policy" errors
- Network tab shows failed requests

**Solution:**
1. Verify Django server is running
2. Check `backend/dbz_battle_simulator/settings.py` has:
   ```python
   CORS_ALLOW_ALL_ORIGINS = True
   ```
3. Restart Django server

### Issue: 404 Errors

**Symptoms:**
- Network tab shows 404 for image requests
- Images show broken image icon

**Solution:**
1. Check if images exist in `backend/media/images/`
2. Verify ImageAsset records in database:
   ```bash
   cd backend
   python manage.py shell
   >>> from assets.models import ImageAsset
   >>> ImageAsset.objects.count()  # Should be > 0
   ```

### Issue: Character Images Not Found

**Symptoms:**
- Character images show "No Image" placeholder
- API returns empty arrays

**Solution:**
1. Check character name matching (case-sensitive)
2. Verify images are categorized correctly
3. Check Django admin at `http://localhost:8000/admin/assets/imageasset/`

## 🎯 Quick Verification Steps

1. **Django Server**: `http://localhost:8000/api/assets/image-urls/` returns JSON
2. **Direct Images**: `http://localhost:8000/media/images/profile/Goku_Base.jpg` loads image
3. **Frontend Test**: `http://localhost:5173/image-test` shows working images
4. **Character Page**: `http://localhost:5173/characters` shows character images

## 📞 If Still Not Working

1. **Check Django Logs**: Look at terminal running Django server for errors
2. **Check Frontend Logs**: Look at browser console for JavaScript errors
3. **Verify File Structure**: Ensure `backend/media/images/` contains all images
4. **Database Check**: Verify ImageAsset records exist in database

## 🚀 Success Indicators

✅ Django server running on port 8000  
✅ Frontend server running on port 5173  
✅ API endpoint returns image data  
✅ Direct image URLs load in browser  
✅ Test page shows all images  
✅ Character pages display images correctly  

The image system should now be working correctly!
