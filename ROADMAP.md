# 🌟 Charlie’s Daily Reflection App  
*A kid-friendly digital journal with rewards, creativity, and book-style pages*

---

## 🎯 Project Vision (MVP)

Create a simple web app that:

- Looks like a **page in a book or binder**
- Has a **Morning Page**
- Has a **Night Page** (flip to it)
- Includes:
  - Daily goals
  - Gratitude prompts
  - Craft of the Week
  - Scratch-off affirmation
  - Star reward system
- Feels fun and rewarding (like a cozy game)

---

# 🧱 PHASE 1: Core MVP Features

## 1️⃣ Calendar (Top Left)

**Goal:** Let users click a date and open that day's journal.

### MVP Version:
- Static monthly calendar
- Clicking a date loads that day's page

### Future Version:
- Auto-generated real calendar
- Save entries per date

---

## 2️⃣ Daily Page Structure (Book Style)

Each day has TWO views:

- 📖 Morning Page (Front)
- 🌙 Night Page (Back — flip effect)

---

# 🌅 MORNING PAGE

## ☀️ Morning Goals
- What are my goals today?
- What am I looking forward to?
- What do I need to do today?

### Tech Needed:
- Text input fields
- Save button
- LocalStorage for saving data

---

## 🎨 Craft of the Week
- Display Charlie’s drawing
- Short description underneath

### MVP:
- Static image placeholder
- Editable description text

---

## ✨ Scratch-Off Affirmation

### Example Affirmations:
- I am enough
- I am creative
- I am strong
- I love my life
- I can do hard things

### MVP Version:
- Button: “Reveal Today’s Affirmation”
- On click → display random affirmation

### Future Version:
- Canvas scratch-off animation

---

## ⭐ Daily Star Reward System

User earns ⭐ when:
- Morning reflection is completed
- Night reflection is completed

### Display:
⭐ Stars This Week: 0

### MVP Logic:
- If both forms are completed → add 1 star
- Store star count in LocalStorage

---

# 🌙 NIGHT PAGE

Button on Morning Page:
→ “Flip to Night Reflection”

---

## 🌜 Night Reflection Questions

- What am I grateful for today?
- What made me happy today?
- What could I do better tomorrow?
- What would have made today better?

### Tech Needed:
- Text areas
- Save button
- Completion check

---

# 📖 Page Flip Effect

### MVP:
- Toggle visibility between Morning and Night sections

### Advanced:
- CSS flip animation

---

# 🖌️ PHASE 2: Personalization

## 🎨 Theme Picker
- Page color selection
- Background pattern (lined paper, craft paper)

## 🧑 Avatar
- Choose an icon
- Upload a drawing

---

# 🎁 PHASE 3: Expanded Rewards

Inspired by cozy reward systems:

- ⭐ 7 Stars = Badge Unlock
- 🌈 30 Stars = Special background
- 🎨 Sticker unlock
- Surprise affirmation

---

# 💻 Suggested Tech Stack

### Beginner Friendly:
- HTML
- CSS
- JavaScript
- LocalStorage

### Future Upgrade:
- React
- Firebase (accounts & cloud storage)

---

# 🛠️ Development Roadmap

## Step 1
Build HTML structure:
- Header
- Calendar section
- Morning section
- Night section (hidden)

## Step 2
Style it like a book:
- Paper background
- Rounded edges
- Binder margin
- Soft colors

## Step 3
Add toggle button for page flip

## Step 4
Add affirmation randomizer

## Step 5
Add star counter variable

## Step 6
Connect completion check to star logic

---

# 🧠 Teaching Plan

## Lesson 1: HTML
Structure the page.

## Lesson 2: CSS
Make it look like a book.

## Lesson 3: JavaScript
Make buttons interactive.

## Lesson 4: Variables
Count stars.

## Lesson 5: LocalStorage
Save journal entries.

---

# ❤️ Core Philosophy

This app teaches:

- Reflection
- Emotional awareness
- Gratitude
- Creative thinking
- Consistency
- Self-worth

And it teaches the creator:

- Coding
- Product design
- MVP thinking
- Iteration
- Ownership

