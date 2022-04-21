// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title()
        .should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatorios e envia o formulario', function() {
        const bigtext = 'Teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
        cy.get('#firstName')
        .type('Ayran')

        cy.get('#lastName')
        .type('Cruz')

        cy.get('#email')
        .type('ayrancruz@gmail.com')

        cy.get('#open-text-area')
        .type(bigtext)

        cy.contains('button','Enviar').click()


        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com e-mail com formatação inválida', function() {
        cy.get('#firstName').type('Ayran')
        cy.get('#lastName').type('Cruz')
        cy.get('#email').type('ayrancruz@')
        cy.get('#open-text-area').type('test')
        cy.contains('button','Enviar').click()


        cy.get('.error').should('be.visible')
    })
    it('campo de telefone permanece vazio caso seja digitado um valor não numerico', function() {
        cy.get('#firstName').type('Ayran')
        cy.get('#lastName').type('Cruz')
        cy.get('#phone').type('ayran')

        cy.get('#phone').should('have.value','')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', function() {
        cy.get('#firstName').type('Ayran')
        cy.get('#lastName').type('Cruz')
        cy.get('#email').type('ayrancruz@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('test')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos: nome,sobrenome, email e telefone', function() {
        cy.get('#firstName')
        .type('Ayran')
        .should('have.value','Ayran')

        cy.get('#firstName')
        .clear()
        .should('have.value','')

        cy.get('#firstName')
        .type('Cruz')
        .should('have.value','Cruz')

        cy.get('#firstName')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type('ayrancruz@gmail.com')
        .should('have.value','ayrancruz@gmail.com')

        cy.get('#email')
        .clear()
        .should('have.value','')
        
        cy.get('#phone-checkbox').click()

        cy.get('#phone')
        .type('97486373')
        .should('have.value','97486373')

        cy.get('#phone')
        .clear()
        .should('have.value','')
    })
    it('exibe mensagem de erro ao submeter formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (youtube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor', function() {
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu indice', function() {
        cy.get('#product').select(1).should('have.value','blog')
    })
    it('marca tipo de atendimento "Feedback"', function() {
        cy.get('[type="radio"]').check('feedback').should('have.value','feedback')
    })
    it('marca cada tipo de atendimento', function() {
        cy.get('[type="radio"]').each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos os checkboxes, depois desmarca o último', function() {
        cy.get('[type="checkbox"]').check()
        .should('be.checked').last().uncheck()
        .should('not.be.checked')
    })
    it('marca ambos os checkboxes, depois desmarca o último', function() {
        cy.get('[type="checkbox"]').check()
        .should('be.checked').last().uncheck()
        .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag and drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para qual foi dado um alias', function() {
        cy.fixture('example.json').as('SampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@SampleFile',{action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.title()
        .should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
  })