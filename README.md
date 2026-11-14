# Parts Camera

A small web app for photographing every part on a parts list, made for places with poor or no signal.

- Installs to the home screen and opens with no connection (service worker cache).
- Photos, captions and notes are stored only on the phone (IndexedDB) until you export them.
- The parts list is loaded on the phone from a setup link or file; none is included here.
- Export makes a zip sorted by part number, with a CSV of captions and a `parts-camera.json` manifest for importing elsewhere.

No analytics, no external requests. Fonts: Barlow and IBM Plex Mono (SIL Open Font License, licence files included). Zip: JSZip (MIT).
