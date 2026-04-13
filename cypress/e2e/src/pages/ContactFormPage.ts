import { ContactFormData } from '../types/ContactFormData';
import { API_ALIASES } from '../constants/apiAliases';

export class ContactFormPage {
  private NAME_INPUT() {
    return cy.get('[data-testid="ContactName"]');
  }
  private EMAIL_INPUT() {
    return cy.get('[data-testid="ContactEmail"]');
  }
  private PHONE_INPUT() {
    return cy.get('[data-testid="ContactPhone"]');
  }
  private SUBJECT_INPUT() {
    return cy.get('[data-testid="ContactSubject"]');
  }
  private DESCRIPTION_INPUT() {
    return cy.get('[data-testid="ContactDescription"]');
  }

  openHomePage(): this {
    cy.visit('/');
    return this;
  }

  fillContactForm(data: ContactFormData): this {
    this.NAME_INPUT().scrollIntoView().clear().type(data.name);
    this.EMAIL_INPUT().clear().type(data.email);
    this.PHONE_INPUT().clear().type(data.phone);
    this.SUBJECT_INPUT().clear().type(data.subject);
    this.DESCRIPTION_INPUT().clear().type(data.description);
    return this;
  }

  submitContactForm(): this {
    cy.contains('button', 'Submit').click();
    return this;
  }

  verifySuccessMessageIsDisplayed(): this {
    cy.contains('Thanks for getting in touch').should('be.visible');
    return this;
  }

  verifyPostMessageApiContract(formData: ContactFormData): this {
    cy.wait(`@${API_ALIASES.postMessage}`).then(({ request, response }) => {
      expect(response?.statusCode).to.equal(201);
      expect(request.body.name).to.equal(formData.name);
      expect(request.body.email).to.equal(formData.email);
      expect(request.body.phone).to.equal(formData.phone);
      expect(request.body.subject).to.equal(formData.subject);
      expect(request.body.description).to.equal(formData.description);
    });
    return this;
  }
}
