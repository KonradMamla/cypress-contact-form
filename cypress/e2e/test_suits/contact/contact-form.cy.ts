import { ContactFormPage } from '../../src/pages/ContactFormPage';
import { API_ALIASES } from '../../src/constants/apiAliases';
import formData from '../../../fixtures/contactForm.json';

describe('Contact Form', () => {
  const contactPage = new ContactFormPage();

  beforeEach(() => {
    cy.intercept('POST', '/api/message').as(API_ALIASES.postMessage);
    contactPage.openHomePage();
  });

  it('should display success message and verify API response', () => {
    contactPage.fillContactForm(formData);
    contactPage.submitContactForm();
    contactPage.verifySuccessMessageIsDisplayed();
    contactPage.verifyPostMessageApiContract(formData);
  });
});
