# Baelys

A powerful, intuitive web-based image editor that allows you to remove backgrounds and add custom text overlays to create stunning visuals. Perfect for creating social media graphics, marketing materials, and personalized images.

🌐 **Live Demo:** [baelys.co](https://baelys.co)

## 🎥 Demo Video

[![Baelys Demo](https://img.youtube.com/vi/UDttHAIxTXs/maxresdefault.jpg)](https://www.youtube.com/watch?v=UDttHAIxTXs)

*Click the image above to watch the full demo on YouTube*

## 📸 Example Results

<div align="center">
  <img src="./public/examples/eg-1.webp" alt="Example 1" width="45%" style="margin: 10px;">
  <img src="./public/examples/eg-2.jpg" alt="Example 2" width="45%" style="margin: 10px;">
</div>

## ✨ Features

### 🖼️ Image Processing
- **Smart Background Removal**: AI-powered background removal with high precision
- **Drag & Drop Upload**: Easy image uploading with instant preview
- **Multiple Format Support**: Works with PNG, JPG, WEBP, and more

### ✍️ Advanced Text Editor
- **Rich Text Controls**: Full typography control with font family, size, and color
- **Text Styling**: Bold, italic, and various font weights
- **Precise Positioning**: Drag and drop text with pixel-perfect placement
- **Text Rotation**: Rotate text at any angle for creative layouts
- **Color Picker**: Advanced color selection with hex, RGB, and HSL support

### 🎨 Design Tools
- **Layer Management**: Organize and reorder text layers with drag-and-drop
- **Real-time Preview**: See changes instantly as you edit
- **Responsive Canvas**: Automatic canvas scaling for different screen sizes
- **Export Options**: High-quality PNG export with 2x pixel ratio

### 🎯 User Experience
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Keyboard Shortcuts**: Efficient workflow with keyboard navigation
- **Toast Notifications**: Clear feedback for all actions
- **Dark/Light Mode**: Theme support for comfortable editing

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Canvas Library**: Konva.js with React-Konva for high-performance rendering
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives for accessibility
- **State Management**: React hooks and context
- **Animation**: Framer Motion for smooth transitions
- **Image Processing**: AI-powered background removal API
- **Icons**: Lucide React and Tabler Icons
- **Development**: TypeScript support, ESLint, and PostCSS

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/baelys.git
   cd baelys
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Build for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## 📱 Usage

### Getting Started
1. **Upload an Image**: Drag and drop or click to select an image
2. **Remove Background**: Click "Remove Background" to process your image
3. **Add Text**: Click "Add Text" to create text layers
4. **Customize**: Use the text controls to style your text
5. **Export**: Click "Export" to download your final image

### Text Editing
- **Select Text**: Click on any text layer to select it
- **Move Text**: Drag text around the canvas
- **Resize**: Use the resize handles when text is selected
- **Rotate**: Use the rotation handle to adjust text angle
- **Style**: Use the text controls panel to change fonts, colors, and effects

### Layer Management
- **Reorder Layers**: Drag layers in the layer panel to change stacking order
- **Delete Layers**: Select a layer and click delete
- **Toggle Visibility**: Show/hide layers as needed

## 🎨 Customization

### Adding Custom Fonts
1. Add font files to `src/constants/fonts.ts`
2. Import the font in your CSS
3. Add the font name to the font selector

### Extending Image Processing
The background removal functionality can be extended by modifying `src/action.ts`. You can integrate different AI services or add additional image processing features.

### Custom UI Components
All UI components are located in `src/components/ui/` and can be customized using Tailwind CSS classes.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Konva.js](https://konvajs.org/) for powerful 2D canvas rendering
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React](https://reactjs.org/) for the component architecture

## 📞 Support

- 🌐 Website: [baelys.co](https://baelys.co)
- 📧 Email: support@baelys.co
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/baelys/issues)

---

<div align="center">
  <p>Made with ❤️ by the Baelys team</p>
  <p>
    <a href="https://baelys.co">Website</a> •
    <a href="https://www.youtube.com/watch?v=UDttHAIxTXs">Demo</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>