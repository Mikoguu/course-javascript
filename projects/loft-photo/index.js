import pages from './pages.js';
import mainPage from './mainPage.js';
import loginPage from './loginPage.js';

pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();
