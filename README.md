# AI Implementation Helper

A comprehensive tool to help businesses determine how they should implement AI. This interactive web application provides personalized recommendations based on industry, business size, goals, and constraints.

## Features

- **Interactive Questionnaire**: Collects business information through an intuitive multi-step form
- **Personalized Recommendations**: Generates AI implementation strategies based on business profile
- **Industry-Specific Insights**: Provides transformation opportunities tailored to specific industries
- **Implementation Roadmap**: Detailed step-by-step implementation plan with timelines and resources
- **Risk Assessment**: Identifies potential challenges and mitigation strategies
- **Success Metrics**: Defines measurable outcomes and KPIs
- **Export & Share**: Download reports and share results

## Live Demo

Visit the live application: [https://sodapork.github.io/implementaihelper](https://sodapork.github.io/implementaihelper)

## Embedding via iframe

You can embed this tool on your website using an iframe:

```html
<iframe 
  src="https://sodapork.github.io/implementaihelper" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
  title="AI Implementation Helper"
></iframe>
```

### Responsive iframe example:

```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 100%;">
  <iframe 
    src="https://sodapork.github.io/implementaihelper" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
    title="AI Implementation Helper"
  ></iframe>
</div>
```

## Supported Industries

- Technology
- Healthcare
- Finance
- Retail
- Manufacturing
- Education
- Real Estate
- Transportation
- Media & Entertainment
- Food & Beverage
- Professional Services
- Other

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Local Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sodapork/implementaihelper.git
cd implementaihelper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── Questionnaire.tsx    # Multi-step questionnaire component
│   └── Results.tsx          # Results display component
├── utils/
│   └── aiEngine.ts          # AI recommendation generation logic
├── types.ts                 # TypeScript type definitions
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css               # Global styles and Tailwind imports
```

## Customization

### Adding New Industries

To add support for new industries, update the `industryTransformations` object in `src/utils/aiEngine.ts`:

```typescript
const industryTransformations: Record<string, string[]> = {
  // ... existing industries
  'New Industry': [
    'AI transformation opportunity 1',
    'AI transformation opportunity 2',
    // ... more opportunities
  ]
}
```

### Modifying Questions

Update the `questions` array in `src/components/Questionnaire.tsx` to add, remove, or modify questions.

### Styling

The application uses Tailwind CSS for styling. Custom styles can be added in `src/index.css` or by modifying the Tailwind configuration in `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please open an issue on GitHub or contact the maintainers.

---

Built with ❤️ to help businesses navigate their AI transformation journey. 