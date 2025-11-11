# Clear LocalStorage to Reset Presets

If you don't see all 6 presets (Executive, Casual, Elegant, Bold, Minimal, Doctor's Note), run this in your browser console:

```javascript
localStorage.removeItem('signature-storage');
location.reload();
```

This will:
1. Clear the old localStorage data
2. Reload the page
3. Initialize with all 6 built-in presets

## Or Use Developer Tools:
1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Application tab
3. Click "Local Storage" → "http://localhost:5174"
4. Delete the "signature-storage" key
5. Refresh the page

All 6 presets should now appear!
