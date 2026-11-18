# 스윙랩 라이브

This is a personal golf practice page. Stand an iPhone on a tripod and swing. The page records each swing as a separate clip and analyzes it straight away.

- Open it in Safari and add it to the home screen, and it works like an app.
- Pose detection runs on the phone itself (MediaPipe Pose Landmarker lite). Videos and results never leave the phone.
- To get coach comments and keep a history, save the clips to the photo album and load them into the 스윙랩 artifact.

## Files

- `index.html`: the whole page (camera, live swing detection, metrics, clip list)
- `sw.js`: keeps the analysis engine on the device so the page opens even with a weak signal
- `mp/`: MediaPipe tasks-vision 0.10.14 bundle and the pose model

## Updating

After changing `index.html`, push to the `main` branch and GitHub Pages updates on its own. If you change files under `mp/`, bump `CACHE` in `sw.js` (for example `v2`).
