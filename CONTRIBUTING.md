# Welcome to the Notes Buddy GitHub Contribution Guide

This guide is designed to help new contributors seamlessly contribute to Notes Buddy projects on GitHub. Whether you're fixing a bug, improving the UI, or adding new content, this guide will walk you through the process.

---

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#Prerequisites)
   - [Setting Up the Project](#setting-up-the-project)
   - [Understanding the Folder Structure](#understanding-the-folder-structure)
3. [UI Contributions](#ui-contributions)
   - [Creating Components](#creating-components)
   - [Modifying Pages](#modifying-pages)
   - [Adding New Routes or Pages](#adding-new-routes-or-pages)
4. [Notes Contributions](#notes-contributions)
   - [Adding New Notes](#adding-new-notes)
   - [Creating Unit Files](#creating-unit-files)
5. [Best Practices](#best-practices)
   - [Coding Standards](#coding-standards)
   - [File Naming Conventions](#file-naming-conventions)
6. [MDX Basic Styling and Callout Component](#mdx-basic-styling-and-callout-component)
    - [MDX Basics](#mdx-basics)
    - [Callout Types](#callout-types)
    - [Example Usage of Callouts](#example-usage-of-callouts) 
7. [Notes Generation](#notes-generation)
    - [Guide to Generate Notes for Exams using ChatGPT](#guide-to-generate-notes-for-exams-using-chatgpt)
    - [Example Conventions for Generating Notes](#example-conventions-for-generating-notes)

---

## Getting Started

### Prerequisites

Before setting up the project, ensure the following tools are installed on your system:

1. **Node.js**: Download and install Node.js (LTS version recommended). You can download it from [Node.js Official Website](https://nodejs.org/).
2. **npm**: npm is installed along with Node.js. Verify the installation by running:
   ```bash
   node -v
   ```
   ```bash
   npm -v
   ```
3. **Install pnpm**: Use npm to globally install `pnpm` (a faster, efficient package manager):
   ```bash
   npm install -g pnpm
   ```

Once these prerequisites are installed, you can proceed with the project setup.

---

### Setting Up the Project

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ramxcodes/notes-buddy.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd notes-buddy
   ```

3. **Install Dependencies**:
   ```bash
   pnpm install
   ```

4. **Run the Development Server**:
   ```bash
   pnpm run dev
   ```

5. **Access the Local Development Environment**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

--- 

### Understanding the Folder Structure

Here’s a snapshot of the project's folder structure:

```
notes-buddy/
┣ app/                     # Core app functionality
┣ components/              # Reusable UI components
┣ content/notes/           # Notes organized by college/degree/subject
┣ public/                  # Static assets (e.g., fonts, logos)
┣ styles/                  # CSS and styling
┣ utils/                   # Helper utilities
┣ ...                      # Other configuration files
```

Refer to the [complete structure](#folder-structure-details) section for an expanded view.

---

## UI Contributions

### Creating Components

To create or modify UI components:

1. Navigate to the `components` folder:
   ```bash
   notes-buddy/components/
   ```
2. Create a new file using the PascalCase naming convention:
   ```bash
   MyNewComponent.tsx
   ```
3. Structure the component as per the Shadcn or Magic UI guidelines.

---

### Modifying Pages

1. Navigate to the specific page directory under `app/` (e.g., `about/`, `contributors/`).
2. Open `page.tsx` to edit the content.
3. Follow the Next.js conventions for building and modifying pages.

---

### Adding New Routes or Pages

1. Create a new folder in the `app/` directory. The folder name will be the route name:
   ```bash
   app/
   ┗ new-route/
   ```
2. Add a `page.tsx` file in the new folder:
   ```tsx
   export default function Page() { 
    return (
        <div>Hello</div> 
        )
    }
   ```
3. Access the new route at:
   ```
   http://localhost:3000/new-route
   ```

---

## Notes Contributions

### Adding New Notes

1. Navigate to the `content/notes/` directory.
2. Create a folder structure following this hierarchy:
   ```bash
   content/notes/{college}/{degree}/{year}/{semester}/{subject}/
   ```
3. Add `.mdx` files for each unit.

---

### Creating Unit Files

Each `unit.mdx` should follow this template:

#### Example:
```md
---
title: "Unit 1: Software Engineering"
description: "An introduction to Software Engineering."
date: 2024-12-25
tags: ["Software Engineering", "5th Semester", "3rd Year"]
published: true
---

# Unit 1: Software Engineering

Content for Unit 1 goes here...
```

---

## Best Practices

### Coding Standards

- **Use Descriptive Naming**: Use clear, descriptive names for variables, files, and functions.
- **Follow Component Guidelines**: Adhere to Shadcn or Magic UI for component design.

### File Naming Conventions

- Components: `ComponentName.tsx`
- Notes: `unit-1.mdx`, `unit-2.mdx`, etc.

---

💡 **Tip**: Always test your changes locally before creating a pull request.

⚠️ **Warning**: Do not alter the folder structure or naming conventions. This may break the application's functionality.

---

Got questions? Reach out to the Notes Buddy team via [GitHub Issues](https://github.com/ramxcodes/notes-buddy/issues).

---

## MDX Basic Styling and Callout Component

### MDX Basics

Here are some common Markdown syntax elements and how they are rendered:

#### **Headings**
```md
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

#### **Text Formatting**
```md
**Bold Text**
*Italic Text*
~~Strikethrough Text~~
```

#### **Lists**
```md
- Unordered List Item 1
- Unordered List Item 2
- Unordered List Item 3
```

```md
1. Ordered List Item 1
2. Ordered List Item 2
3. Ordered List Item 3
```

#### **Links**
```md
[Link Text](https://example.com)
```

#### **Images**
```md
![Alt Text](https://example.com/image.jpg)
```

---

### Callout Types

Callouts in MDX highlight important information. Use these alternatives in Markdown:

- 💡 **Info**: General guidance, tips, or helpful notes.
- ⚠️ **Warning**: Situations requiring caution or attention.
- ❌ **Danger**: Critical warnings or errors.

---

### Notes Generation

#### Guide to Generate Notes for Exams using ChatGPT

To generate notes on ChatGPT, use this prompt:

```plaintext
**Hello ChatGPT! You are now Notes Buddy👤, the Ultimate AI Chatbot for generating high-quality notes!**

### Step 1: Initial Setup & User Details Collection

From now on, address yourself as "Notes Buddy." Before creating any notes, you must collect the following information from the user:

1. **Title:** (e.g., Subject unit and subject name)
2. **Description:** (This will be auto-generated based on the title)
3. **Date:** (The current date)
4. **Tags:** 
   - Add a maximum of **three tags**:
     1. Full-form name of the subject (e.g., "Software Engineering").
     2. Semester in ordinal format (e.g., "1st Semester", "2nd Semester").
     3. Year in ordinal format (e.g., "1st Year", "2nd Year").

5. **Published Status:** (Default to true)

Once you have this information, confirm the details with the user and generate an MDX header as shown below. Replace placeholders with the user-provided data:

mdx
---
title: "Unit 1: Software Engineering"
description: What is Software Engineering
date: 2024-12-25
tags: ["Software Engineering", "5th Semester", "3rd Year"]
published: true
---


After confirming the details, **ask the user for a specific topic to start generating notes.**

---

### Step 2: Guidelines for Generating Notes

Follow these rules strictly when creating notes:

1. **Wait for the Topic:** Do not generate any content until the user provides the topic after confirming the details.

2. **Language Simplicity:** Use simple, clear English (British/Indian English preferred). Ensure the content is easy to understand.

3. **Comprehensive Explanation:** 
   - Provide definitions, advantages, disadvantages, and key points for topics.
   - Include the full form of any abbreviation at least once.

4. **MDX Styling:**
   - Use proper MDX formatting for headings, lists, and sections.
   - Only use callouts if there is something **important, noteworthy, or actionable**. Instead of complex MDX callout components, use simple, intuitive symbols like:
     - 💡 **TIP:** Highlight helpful tips or guidance.
     - 📝 **NOTE:** Emphasise additional information or context.
     - ⚠️ **CAUTION:** Warn about something important.

   Example:
   
mdx
   - 💡 **TIP:** Always follow best practices in software development to ensure maintainability.
   - 📝 **NOTE:** This method is especially useful for large-scale projects.


5. **Diagrams for Important Topics Only:** If a topic requires visual explanation, include a **bold callout** stating this, along with an example link to Imgur for placeholders:
   
mdx
   **Add a diagram here if necessary!**
   Example: [https://imgur.com/example](https://imgur.com/example)


---

### Step 3: After Generating Notes

Once the notes are complete, conclude with this statement (outside the MDX content):

/** GIVE ME THE NEXT TOPIC TO GENERATE NOTES **/

```

## Example conventions for generating notes

#### Step 1:

![Notes Generation](https://i.imgur.com/RrwWp5V.png)

#### Step 2:

![Notes Generation](https://i.imgur.com/6zNoFsi.png) 
![Notes Generation](https://i.imgur.com/WtBGzMH.png)

#### Step 3:

Create a new file in the `content/notes/{collage}/{degree}/{semester}/{subject}/{unit}` and paste content generated by ChatGPT.

---

### Example Conventions for Generating Notes

Follow the given hierarchy for generating and storing notes.

```bash
content/notes/{college}/{degree}/{semester}/{subject}/{unit}/
```

💡 **Tip**: Keep file names lowercased and replace spaces with dashes (`-`).
