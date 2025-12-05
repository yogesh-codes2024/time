# Time Display Application

A clean, modern time display application that shows:
- Current time with seconds (HH:MM:SS)
- Current date
- Day of the week
- Market day status (indicates if stock markets are open)

## Features

- **Real-time Updates**: Time updates every second
- **Market Day Detection**: Automatically detects weekdays vs weekends and major US market holidays
- **Clean UI**: Modern, gradient design with smooth animations
- **Responsive**: Works on all device sizes
- **Embeddable**: Optimized for embedding in other platforms (automatically detects iframe)

## Usage

### Standalone
Open `index.html` in any web browser.

### Embedded
Embed the application using an iframe. After deploying to GitHub Pages:

**Standard Size:**
```html
<iframe src="https://yogesh-codes2024.github.io/time/" width="600" height="380" frameborder="0" allowtransparency="true"></iframe>
```

**Compact Mode:**
```html
<iframe src="https://yogesh-codes2024.github.io/time/?compact=true" width="450" height="300" frameborder="0" allowtransparency="true"></iframe>
```

**Responsive (Full Width):**
```html
<iframe src="https://yogesh-codes2024.github.io/time/" width="100%" height="380" frameborder="0" allowtransparency="true"></iframe>
```

The application automatically adjusts its styling when detected in an iframe.

## Deployment to GitHub Pages

1. Push your code to GitHub:
```bash
git add .
git commit -m "Add time display application"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"

3. Your app will be available at: `https://yogesh-codes2024.github.io/time/`

See `embed-example.html` for live embedding examples.

## Market Day Logic

The application considers these as non-market days:
- Weekends (Saturday & Sunday)
- New Year's Day
- Independence Day (July 4th)
- Labor Day (First Monday in September)
- Thanksgiving (Fourth Thursday in November)
- Christmas (December 25th)
- Memorial Day (Last Monday in May)

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and animations
- `script.js` - Time logic and market day detection

## Technologies

- Pure HTML, CSS, and JavaScript (no dependencies)
- CSS animations and gradients
- Responsive design