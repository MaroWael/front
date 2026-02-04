# AI Table Extractor Frontend

A beautiful, modern frontend application for extracting tables from images using VGG16 neural network.

## 🚀 Features

- **Drag & Drop Upload** - Easy image uploading
- **Real-time Preview** - See your image before processing
- **AI-Powered** - Uses VGG16 neural network via deployed API
- **Instant Download** - Get Excel files immediately
- **Responsive Design** - Works on all devices
- **Beautiful UI** - Modern dark theme with smooth animations

## 🌐 Live Demo

Backend API: [https://marowael-deployment.hf.space](https://marowael-deployment.hf.space/docs)

## 📋 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to the project directory:
```bash
cd "d:\Self Study\Student Activities\STP\Presentation\Part 2"
```

3. Deploy:
```bash
vercel
```

### Option 2: Deploy via Git

1. Create a new repository on GitHub
2. Push this folder to the repository
3. Import the repository in Vercel dashboard
4. Deploy!

### Option 3: Deploy via Drag & Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag and drop this folder onto the Vercel dashboard
3. Done!

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with animations
- **API**: FastAPI backend deployed on Hugging Face
- **Deployment**: Vercel

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── style.css          # Styles and animations
├── app.js             # JavaScript functionality
├── vercel.json        # Vercel configuration
└── README.md          # This file
```

## 🎨 Features

- Modern gradient UI design
- Smooth animations and transitions
- Drag and drop file upload
- Real-time processing status
- Error handling with user feedback
- Mobile responsive layout

## 📝 Usage

1. Open the application
2. Upload an image (drag & drop or click to browse)
3. Preview your image
4. Click "Extract Table"
5. Download the generated Excel file

## 🔧 Configuration

The API endpoint is configured in `app.js`:
```javascript
const API_URL = 'https://marowael-deployment.hf.space';
```

To change the backend API, simply update this URL.

## 📄 License

MIT License - Feel free to use this project for your own purposes.
