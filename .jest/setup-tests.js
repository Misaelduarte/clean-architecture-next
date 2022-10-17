// @ts-nocheck
require('jest-fetch-mock').enableMocks();
// Cookie mock
require('./setup-cookies');

// Next image and route mock
jest.mock('next/image', () => () => null);
jest.mock('next/router', () => require('next-router-mock'));

// Scroll mock
window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
};

// Camera permission mock
const mockMediaDevices = {
  getUserMedia: jest.fn().mockResolvedValueOnce('fake data'),
};

// Camera actions mock
Object.defineProperty(window.navigator, 'mediaDevices', {
  writable: true,
  value: mockMediaDevices,
});
window.HTMLMediaElement.prototype.play = jest.fn();

// window.location mock
const location = new URL('https://www.example.com');
location.assign = jest.fn();
location.replace = jest.fn();
location.reload = jest.fn();
delete window.location;
window.location = location;

// Unstable_flushDiscreteUpdates on muted video fix
Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
  set: () => {},
});

// focus-trap-react mock
jest.mock('focus-trap-react');

// react-optimized-images mock
// jest.mock('react-optimized-images', () => ({
//   Picture: () => null,
// }));
