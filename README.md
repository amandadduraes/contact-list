# ContactList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.
Este é um aplicativo simples de lista de e-mails construído com Angular 17.3.5 e SCSS, utilizando Reactive Forms, localStorage para persistência dos dados, e um layout organizado com uma interface amigável. O app permite adicionar, editar, excluir e pesquisar contatos.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Funcionalidades

1 - Adicionar Contatos: O formulário permite que o usuário adicione novos contatos com nome e e-mail.
2 - Editar Contatos: É possível editar informações de um contato já existente.
3 - Excluir Contatos: Cada contato possui um botão de exclusão que permite removê-lo da lista.
4 - Pesquisar Contatos: O campo de busca permite filtrar contatos pelo nome ou e-mail.
5 - Persistência de Dados: O app utiliza localStorage para salvar e carregar os contatos, garantindo que os dados permaneçam mesmo após o fechamento da aplicação.

## Estrutura dos Componentes

- **ContactFormComponent**: Este componente exibe o formulário para adicionar e editar contatos.
- **ContactListComponent**: Este componente exibe a lista de contatos com opções para editar, excluir e pesquisar.
- **ContactService**: Serviço que gerencia os dados dos contatos e manipula o `localStorage` para salvar e recuperar informações.

## Explicação do Código

O `ContactFormComponent` é responsável pelo formulário de criação e edição de contatos. Ele utiliza `ReactiveForms` para validação dos campos de nome e e-mail e possui um botão de cancelamento para limpar o formulário ao editar.

- **contactForm**: Um formulário reativo que contém dois campos: `name` e `email`, ambos com validação.
- **onSubmit()**: Método chamado ao enviar o formulário. Se o formulário for válido, ele adiciona ou edita o contato no `ContactService`.
- **cancelEdit()**: Método para cancelar a edição e limpar o formulário.

**HTML**:

O `contact-form.component.html` inclui campos para nome e e-mail, além de botões de `Adicionar` ou `Salvar Alterações` e `Cancelar` para a edição.

### ContactListComponent

O `ContactListComponent` exibe a lista de contatos, permite que os usuários pesquisem contatos pelo nome ou e-mail e contém os botões de edição e exclusão para cada contato.

- **contacts$**: Observable da lista de contatos, obtido através do `ContactService`.
- **searchTerm**: String vinculada ao campo de busca para filtrar os contatos em tempo real.
- **onEdit(contact: Contact)**: Emite o evento de edição para o contato selecionado.
- **onDelete(contactId: number)**: Exibe uma confirmação antes de excluir o contato. Se confirmado, chama o método `deleteContact` do `ContactService`.
- **onSearch()**: Chama o `filterContacts` no `ContactService` para filtrar os contatos com base no termo de pesquisa.

**HTML**:

O `contact-list.component.html` contém o campo de busca e a lista de contatos com botões de `Editar` e `Excluir`.

### ContactService

O `ContactService` é responsável por gerenciar os dados dos contatos e interagir com o `localStorage` para manter a persistência dos dados. Ele utiliza `BehaviorSubject` para gerenciar o estado da lista de contatos e atualizar os componentes observadores.

- **saveContacts(contacts: Contact[])**: Salva a lista de contatos no `localStorage`.
- **loadContacts()**: Carrega a lista de contatos do `localStorage`.
- **addContact(contact: Contact)**: Adiciona um novo contato à lista.
- **editContact(updatedContact: Contact)**: Atualiza um contato existente.
- **deleteContact(contactId: number)**: Remove um contato da lista.
- **filterContacts(searchTerm: string)**: Filtra a lista de contatos com base em um termo de pesquisa.

### Estilização

O projeto utiliza SCSS para estilizar o layout, incluindo:

- **Campo de Busca**: Estilo específico para o campo de busca para torná-lo mais visível e separado dos botões de ação.
- **Lista de Contatos**: Cada contato é exibido com um fundo diferenciado e espaçamento adequado entre os elementos.
- **Botões de Ação**: Botões de edição e exclusão com cores diferenciadas para melhorar a usabilidade.

