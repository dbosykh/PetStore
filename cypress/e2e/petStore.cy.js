import { faker } from '@faker-js/faker';
import * as pet from '../fixtures/pet.json'

// let petId;

pet.id = parseInt(faker.random.numeric(5));
pet.name = faker.animal.crocodilia.name;
pet.category.id = parseInt(faker.random.numeric(3));
pet.category.name = faker.animal.type(); 

describe('Pet suite', () => {

  it('Pet creation', () => {
    cy.log('Create pet');
    cy.request('POST', '/pet', pet).then( response => {
      console.log(response);
      // cy.log(`Request body: ${response.allRequestResponses[0] ["Request Body"]}`);
      // cy.log(`Request headers: ${JSON.stringify(response.allRequestResponses[0] ["Request Headers"])}`);
      // cy.log(`Request Url: ${JSON.stringify(response.allRequestResponses[0] ["Request URL"])}`);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
      // expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
      // petId = response.body.id;
    })
  })

  it('Pet retrieving', () => {
    cy.log('Retrieve pet');
    cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    })
  })

  it('Pet updating', () => {
    cy.log('Update pet');
    cy.request({
      method: 'PUT',
      url: '/pet/',
      body: {
        "id": `${pet.id}`,
        "category": {
          "id": `${pet.category.id}`,
          "name": `${pet.category.name}`
        },
        "name": `${pet.name}`,
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "pending" //new data
        }
      })
      cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
      expect(response.body.status).to.be.equal('pending');
    })
  })

  it('Pet retrieving by status', () => {
    cy.log('Retrieve by status');
    cy.request('GET', '/pet/findByStatus?status=sold').then( response => {
      console.log(response);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
    })
  })

//
  it('Pet updating with form data', () => {
    cy.log('Update Pet using form data');
    cy.request({
      method: 'POST',
      url: `/pet/${pet.id}`,
      form: true,
      body: {
        "name": `${pet.name}`,
        "status": "sold",
      }
    })
    cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
      expect(response.body.status).to.be.equal("sold");
    })
  })

  it('Pet deleting', () => {
    cy.log('Delete pet');
    cy.request('DELETE', `/pet/${pet.id}`)
    .then( response => {
      console.log(response);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
    })
    //Після видалення PET отримую ОК 200, але новий GET чомусь валиться з помилкою. Він очікує 404, хоча я й вказала 404
    cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response);
      expect(response.status).to.be.equal(404);
      expect(response.statusText).to.be.equal('Not Found');
  })
})

})

