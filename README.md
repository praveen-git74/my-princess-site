# My Princess 💗 — birthday website starter

A dreamy React + Vite birthday scrapbook starter with editable thoughts, photo placeholders, funny-memory prompts, a timeline, a thought jar, and an interactive birthday message.

## Important privacy note

This version is a **local preview starter**, not a secure private website. It saves edits and uploaded photos in the current browser's `localStorage`; that is convenient for a quick local demo but is not appropriate for secure cloud storage. It does not implement login, server-side authorization, or private image storage. Do not deploy this version publicly with real family photos or private memories. A deployed version would expose the website's bundled code/content, and local browser storage will not transfer to your sister's device.

Before public deployment with real memories, add a genuine authentication provider/server-side access checks and private image storage with authenticated access or short-lived signed URLs. Test direct image URLs and logged-out access. Keep the source repository private. Do not commit private photos to the repository.

## Requirements

- Install a current Node.js LTS release from https://nodejs.org/
- Install VS Code if desired: https://code.visualstudio.com/

## Run locally on your Mac

1. Unzip the project.
2. Open the `my-princess-site` folder in VS Code.
3. In VS Code choose **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually `http://localhost:5173`) in Safari.
6. Click **Personalize** to edit names, messages, upload photos, and fill in memory prompts. Changes persist in this browser.

Stop the server with `Control + C` in the terminal.

## Build test

```bash
npm run build
```

## Features

- Responsive pastel scrapbook design
- Editable sister/brother names and birthday date
- Editable letter and birthday wish
- 8 initial photo frames; upload/replace/remove and lightbox
- Editable funny-memory prompts, timeline, future plans, and jar thoughts
- Candle interaction and confetti-style birthday reveal
- Download a JSON backup of the local content
- Print/save the letter via the browser print dialog

## Known limitations

- Photo uploads are limited to 4 MB each in this starter to avoid browser storage problems.
- Photo files and edits are saved in the current browser only. They do not sync between devices.
- This starter has no real authentication or secure server storage.
- For a private shared website, implement access control and private photo storage before adding real photos and deploying.
