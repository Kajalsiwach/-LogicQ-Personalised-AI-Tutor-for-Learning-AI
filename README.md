# LOGIQ — Personalized AI Tutor for Learning AI & Machine Learning

**LOGIQ** is an intelligent, student-centered learning platform built to master artificial intelligence and machine learning from first principles. By combining adaptive diagnostic assessments, structured professor-grade pedagogical explanations, interactive mathematical visualizations, and immediate-feedback practice loops, LOGIQ provides a personalized curriculum tailored to each student's current knowledge level and learning goals.

---

## ✨ Key Features

### 1. Adaptive Diagnostic Assessment & Onboarding
- **Interactive Concept Selection**: Choose target areas across Machine Learning, Deep Learning, Generative AI & LLMs, Computer Vision, NLP, Reinforcement Learning, and Mathematical Foundations.
- **Adaptive Question Pool**: 10–15 dynamically generated questions based on topic breadth and complexity.
- **Granular Knowledge Analysis**: Identifies validated proficiencies, isolated concept gaps, and calibrated baseline proficiency without fabricated statistics.
- **Tailored Roadmap Generation**: Constructs an ordered milestone progression matching the student's background.

### 2. Multi-Dimensional Pedagogical Explanations
- **Intuition-First Learning**: Explanations structured from **Intuition ("Why It Exists") → Core Concept → Mathematical Mechanics → Visual Geometry → Worked Example → Real-World Application**.
- **Key Technical Vocabulary Decks**: Clear, digestible definitions with memorable analogies.
- **Mathematical Formulations**: LaTeX-style equation cards with parameter-by-parameter breakdowns.
- **Concrete Worked Examples**: Numerical step-by-step calculations showing how equations operate on real data.

### 3. Dynamic Programmatic Visualizations
- **Interactive Sigmoid S-Curve Graph**: Features a live input score slider ($z \in [-6, +6]$) that animates the point along the curve in real time, computing probability $\sigma(z)$ and explaining limit behaviors.
- **Algorithmic Flowcharts**: Visual pipelines displaying multi-step training loops and computational graph flows.
- **Architecture Diagrams**: Structural layer topologies with unit counts and activation dynamics.
- **Comparison Tables**: Glass matrices evaluating trade-offs (e.g. MSE vs BCE loss, Sigmoid vs ReLU, L1 vs L2 regularization).

### 4. Adaptive Practice Arena & Low-Score Recovery
- **Targeted Practice Tests**: 3–4 conceptual comprehension questions tied directly to the current lesson.
- **Immediate Pedagogical Feedback**: Explains why the correct option is right, analyzes distractors, and links back to lesson sections.
- **Diagnostic Performance Reports**: Displays score percentage, mastered concept tags, and review items.
- **Recovery Workflow ($< 75\%$)**: Non-punitive recovery loop offering targeted quick-review notes and an alternate set of completely fresh questions.

### 5. Configurable LLM Engine
- **Google Gemini API Integration**: Configurable model provider (e.g. `gemini-2.5-flash`, `gemini-1.5-pro`) with structured JSON schema responses.
- **In-App Engine Settings**: Easily configure API keys and models via the in-UI control dialog or environment variables.
- **Offline Educational Synthesis**: Zero-downtime built-in engine guarantees full curriculum functionality and personalization even without an API key.

### 6. Design System & Desktop Experience
- **100% Viewport Desktop Layout**: Utilizes the full desktop screen width and height without artificial container clamps or lateral gutters.
- **Fixed Full-Height Sidebar**: Persistent glass navigation sidebar with smooth micro-interactions and active-state ambient glow halos.
- **Atmospheric Technology Background**: Layered Midnight Blue (`#080C15`) foundation with deep indigo/plum radial gradients, subtle coordinate grids, circuit-like conduits, and restrained ambient breathing motion.
- **Typographic Hierarchy**: Termina Heavy (branding/headings), Instrument Serif (editorial reflections/quotes), and Inter (body copy, mathematics, UI).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kajalsiwach/-LogicQ-Personalised-AI-Tutor-for-Learning-AI.git

# 2. Navigate to project directory
cd -LogicQ-Personalised-AI-Tutor-for-Learning-AI

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser to start exploring LOGIQ.

### Building for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Custom CSS Keyframe Motion
- **Architecture**: Modular Context API (`AppContext`), Persistent Local Storage Sync

---

## 📄 License

This project is licensed under the MIT License.
