# TODO ENCURTANDO

- [x] Adicionar lucide icons
- [x] Adicionar style guide to styled components
- [x] Resolver mensagens de erro referente as props passadas aos styled components
- [x] Deixar responsivo
- [ ] Consertar gráficos na página de link e implementar os da home
- [ ] Consertar a validação do formulario de qrconfig na pagina settings para permitir campos opcionais
- [ ] Validar formulários e pegar erros (Dashboard contexto)
- [ ] Ajeitar photoUpload para adaptar Avatar a logo do QR
- [x] Ajustar a lógica do Avatar, verificar se existe avatarUrl invés de auth
- [x] Ajustar user-info no AppBar para adaptar ao user
- [ ] Adicionar upload de imagem com cloudinary no front e enviar só a url para o back
- [ ] Adicionar alguns testes

## Ideas

- Improve authentication flow, instead request all time user detail for verify if he is logged, I should store user info in a cookie or localStorage and only verify if have a access_token cookie. Then in futures requests I verify if error return is 401 status code, if yes, I logout user.
