# Electron Vite With React TypeScript, tailwind CSS, Inter-Process Communication, Dark-Light Theme Support

![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-react-electron)
[![Required Node.JS >= 14.18.0 || >=16.0.0](https://img.shields.io/static/v1?label=node&message=14.18.0%20||%20%3E=16.0.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

## Based on

```bash
npm create electron-vite
```

## Official Original Documentation

[Original Readme](README_REFERENCE.md)

## What has is done

- Just added tailwind CSS
- Added theme support without React State: [more...](#about-react-state)
- Theme switching also switches electron theme to dark or light
- Changed Node Integration to webSecure InterProcess Communication with a wrapper. Wrapper can be omitted...
- Added nodemon in order to watch changes in electron. Vite doesn't restart electron app if the core code changes.

  ```json
  "scripts": {
    ...
    "watch": "nodemon --watch electron -e ts --delay 1 --exec vite"
  },
  ```

- `npm run watch` command runs nodemon to watch electron ts files.
- Old behavior also exists with `npm run dev`
- Deleted preloader page in `/electron/preload/index.ts`

## About React State

Not used state for theme switching, because I find switching light and dark with a context API or Root State causes all components to be rendered. If I don't want intentionally this behavior, I prefer changing css class to trigger theme change. Because project uses tailwind for styling. CSS changes effects immediately to the dom without re-rendering components. Just an opinion. Check: ```/src/Utilities/theme.ts```

### Disclaimer

This project might not be updated, fixed etc... Just a boilerplate for today's needs.

Check out the original repo [readme](README_REFERENCE.md) for

```bash
npm create electron-vite
```
