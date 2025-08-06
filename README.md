# 🎵 String Theory - Random Music Scale Generator

A beautiful, interactive Next.js application for generating random music scales. Perfect for music theory practice, improvisation, and educational purposes.

![String Theory App](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **Random Scale Generation**: Generate random music scales with the click of a button
- **Comprehensive Scale Library**: Includes Major, Minor, Pentatonic, Blues, Modal scales and more
- **Visual Notation Display**: Clean, readable musical notation with scale degrees
- **Scale History**: Keep track of recently generated scales
- **Quick Scale Selection**: Choose specific scale types or let randomness guide you
- **Keyboard Shortcuts**: Press `Space` or `R` for instant random scale generation
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Educational**: Shows intervals, scale degrees, and practice tips

## 🎼 Supported Scales

- **Major Scales**: Major, Lydian, Mixolydian
- **Minor Scales**: Natural Minor, Harmonic Minor, Melodic Minor, Dorian, Phrygian, Locrian
- **Pentatonic**: Major Pentatonic, Minor Pentatonic
- **Blues**: Traditional Blues scale
- **And more**: Comprehensive collection of musical scales

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/string-theory.git
   cd string-theory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with Turbopack for fast development
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React](https://reactjs.org/)** - UI library

## 🎹 How to Use

1. **Generate Random Scale**: Click the "Generate Random Scale" button or press `Space`/`R`
2. **Choose Specific Scale**: Click on any scale type in the Quick Scale Selection
3. **View Scale Details**: See the scale notation, notes, intervals, and practice tips
4. **Browse History**: Review your recently generated scales
5. **Practice**: Use the displayed information for instrument practice and theory study

## 🎵 Music Theory Features

- **Scale Notation**: Visual representation of notes on a staff
- **Interval Patterns**: Shows whole steps (W) and half steps (H)
- **Scale Degrees**: Roman numeral notation for each scale degree
- **Note Names**: Both sharp and flat enharmonic equivalents
- **Practice Tips**: Educational guidance for each generated scale

## 📱 Responsive Design

The app is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- Any screen size

## 🔧 Development

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── MusicalNotation.tsx
│   ├── ScaleHistory.tsx
│   └── KeyboardShortcuts.tsx
└── lib/                   # Utilities
    └── music-theory.ts    # Music theory logic
```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run export` - Build and export as static files for deployment
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Deployment

This application is configured for deployment to GitHub Pages:

1. **Automatic Deployment**: The app automatically deploys to GitHub Pages when changes are pushed to the `main` branch
2. **Static Export**: The app is built as a static site using Next.js static export feature
3. **GitHub Actions**: Uses `.github/workflows/deploy.yml` for automated deployment

To enable GitHub Pages deployment in your repository:
1. Go to your repository Settings → Pages
2. Select "GitHub Actions" as the source
3. The workflow will automatically deploy on pushes to main

## 🎯 Future Enhancements

- [ ] Audio playback for generated scales
- [ ] Chord progression generator
- [ ] Scale comparison tool
- [ ] Export scales as MIDI files
- [ ] Custom scale builder
- [ ] Practice mode with timing
- [ ] Scale quiz/game mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎼 About

String Theory is designed for musicians, music students, and anyone interested in exploring music theory. Whether you're a beginner learning scales or an advanced musician looking for improvisation inspiration, this tool provides an intuitive way to discover and practice musical scales.

---

Made with ❤️ for the music community
