# Notes Buddy

Welcome to **Notes Buddy**, a web platform designed for students to read and share college notes easily. 
Built with a modern tech stack, it ensures an easy-to-use, visually appealing, and responsive experience.

![Notes Buddy](https://i.imgur.com/REQIqc2.jpeg)

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

---

## Introduction

**Notes Buddy** is a platform for students to access well-structured, MDX-based notes tailored to their courses. It's lightweight, fast, and optimized for readability and accessibility.


## Features

- **MDX Notes**: Each page is powered by MDX, combining Markdown and React components.
- **Theming**: Supports dynamic light/dark mode with `next-themes`.
- **Responsive Design**: Built with Tailwind CSS for mobile-first design.
- **Modern Navigation**: Radix UI-powered components for an intuitive experience.
- **Code Highlighting**: Notes include syntax highlighting for code snippets using `rehype-pretty-code`.


## Tech Stack

**Frontend**:
- React
- Next.js

**Styling**:
- Tailwind CSS
- `@tailwindcss/typography`

**UI Components**:
- Radix UI
- Shadcn

**Build Tools**:
- TypeScript
- PostCSS
- ESLint


## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/ramxcodes/notes-buddy.git
   cd notes-buddy
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Folder Structure

Here’s a brief overview of the folder structure:

```
.
├── app               # Application logic
├── assets            # Static assets
├── components        # Reusable components
├── config            # Configuration files
├── content           # MDX notes content
├── hooks             # Custom React hooks
├── lib               # Utility libraries
├── public            # Public assets
├── styles            # Global CSS and Tailwind setup
├── utils             # Helper functions
├── .vscode           # Editor settings
├── package.json      # Project metadata and scripts
├── README.md         # Project documentation
```


## Contributing

Contributions are welcome! Feel free to:
- Visit Here for Collaboration Guide :
    https://notes-buddy.ramx.in/notes/github/contribution-guide
- Open issues for bug reports or feature requests.
- Fork the repository, make changes, and submit pull requests.