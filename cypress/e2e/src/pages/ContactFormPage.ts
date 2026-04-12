import { ContactFormData } from '../types/ContactFormData';
import { API_ALIASES } from '../constants/apiAliases';

export class ContactFormPage {
  private readonly nameInput = '[data-testid="ContactName"]';
  private readonly emailInput = '[data-testid="ContactEmail"]';
  private readonly phoneInput = '[data-testid="ContactPhone"]';
  private readonly subjectInput = '[data-testid="ContactSubject"]';
  private readonly descriptionInput = '[data-testid="ContactDescription"]';

  openHomePage(): this {
    cy.visit('/');
    return this;
  }

  fillContactForm(data: ContactFormData): this {
    cy.get(this.nameInput).scrollIntoView().clear().type(data.name);
    cy.get(this.emailInput).clear().type(data.email);
    cy.get(this.phoneInput).clear().type(data.phone);
    cy.get(this.subjectInput).clear().type(data.subject);
    cy.get(this.descriptionInput).clear().type(data.description);
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
