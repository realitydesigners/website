import { buildLegacyTheme } from 'sanity';

const props = {
  '--my-white': '#fff',
  '--my-black': '#000000',
  '--my-brand': '#00cc7a',
  '--my-red': '#ff4444',
  '--my-green': '#00cc7a',
  '--my-gray': '#333333',
  '--my-darker-gray': '#1e1e1e'
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  '--gray': props['--my-gray'],
  '--gray-base': props['--my-gray'],

  '--component-bg': props['--my-black'],
  '--component-text-color': props['--my-white'],

  /* Brand */
  '--brand-primary': props['--my-green'],

  // Default button
  '--default-button-color': props['--my-green'],
  '--default-button-primary-color': props['--my-green'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-green'],
  '--default-button-danger-color': props['--my-red'],

  /* State */
  '--state-info-color': props['--my-green'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-green'],
  '--state-danger-color': props['--my-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-black'],
  '--main-navigation-color--inverted': props['--my-white'],

  /* Focus */
  '--focus-color': props['--my-green']
});
