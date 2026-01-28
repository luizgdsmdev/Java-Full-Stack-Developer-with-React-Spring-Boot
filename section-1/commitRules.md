### Princípios gerais (sempre válidos)

1. **Use o imperativo no presente**  
   Escreva como se estivesse dando um comando:  
   "Add", "Fix", "Update", "Remove", "Refactor" (e não "Added", "Fixed", "Updating")

2. **Primeira linha curta (≤ 50–72 caracteres)**  
   Essa linha aparece no `git log --oneline`, no GitHub, no VS Code, etc.

3. **Corpo opcional (recomendado)**  
   Deixe uma linha em branco depois do título e explique:
   - Por que você fez a mudança?
   - Qual era o problema antes?
   - Algum detalhe importante para o reviewer?

4. **Commits pequenos e atômicos**  
   Um commit = uma intenção lógica. Evite "misturei tudo aqui".

### Recomendação mais usada atualmente → Conventional Commits

Formato recomendado:

```
tipo(escopo): descrição curta em imperativo

Corpo opcional explicando o que mudou e o porquê.
Pode ter várias linhas.

Pode ter rodapé (opcional):
BREAKING CHANGE: explica se quebrou algo
Closes #123
```

Tipos mais comuns:

| Tipo              | Quando usar (mais comum nos times)                             | Exemplos reais que aparecem muito em repositórios e PRs                                                                                                                          |
| ----------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feat`            | Nova funcionalidade que o usuário final percebe                | `feat(dashboard): adicionar widget de métricas em tempo real`<br>`feat(auth): implementar login com Google OAuth`<br>`feat: suportar upload de múltiplos arquivos`               |
| `fix`             | Correção de bug (o mais usado depois de feat)                  | `fix(cart): corrigir cálculo de frete com cupom de desconto`<br>`fix(api): tratar erro 500 em endpoint de pagamento`<br>`fix: resolver memory leak no componente InfiniteScroll` |
| `refactor`        | Melhora código sem mudar comportamento externo                 | `refactor(user): extrair hook useUser para pasta hooks/`<br>`refactor: remover duplicação de validação de formulário`<br>`refactor(auth): migrar de Context para Zustand`        |
| `style`           | Formatação, espaços, aspas, Prettier/ESLint                    | `style: aplicar prettier em todos os arquivos tsx`<br>`style(components): padronizar espaçamento em buttons`<br>`style: remover trailing spaces`                                 |
| `docs`            | README, comentários, JSDoc, wiki, CHANGELOG                    | `docs: atualizar README com instruções de setup local`<br>`docs(api): adicionar exemplos de uso no endpoint /users`<br>`docs: corrigir typo na seção de autenticação`            |
| `test`            | Adicionar/corrigir testes (unit, integration, e2e)             | `test(login): adicionar casos de erro de credenciais inválidas`<br>`test: cobrir 100% do hook useDebounce`<br>`test(ui): snapshot do componente Header em dark mode`             |
| `chore`           | Tarefas de manutenção que não afetam código/produto            | `chore(deps): atualizar typescript de 5.3 para 5.5`<br>`chore: remover console.log esquecidos`<br>`chore: adicionar .gitignore para node_modules`                                |
| `perf`            | Melhoria de performance (muito valorizado em times de produto) | `perf(images): implementar lazy loading com IntersectionObserver`<br>`perf: reduzir bundle size removendo lodash`<br>`perf(home): otimizar renderizações desnecessárias`         |
| `ci`              | Mudanças em pipelines CI/CD (GitHub Actions, Vercel, etc.)     | `ci: adicionar job de lint no pull_request`<br>`ci: configurar cache para node_modules no workflow`<br>`ci: rodar testes apenas em arquivos alterados`                           |
| `build`           | Mudanças no sistema de build (webpack, vite, turbo, etc.)      | `build(deps): atualizar vite para 5.4`<br>`build: configurar alias @/ para src/`<br>`build: adicionar análise de bundle com vite-bundle-visualizer`                              |
| `revert`          | Reverter um commit anterior                                    | `revert "feat: adicionar dark mode" devido a bugs em iOS`<br>`revert: commit abc1234`                                                                                            |
| `feat!` ou `fix!` | Breaking change (com ! para indicar quebra de API)             | `feat(api)!: remover endpoint legado /v1/users`<br>`fix(auth)!: alterar formato do JWT token`                                                                                    |

### Seu commit melhorado (várias opções)

**Opção 1 – Mais simples e limpa (muito usada)**

```bash
git commit -m "feat(header): adicionar estrutura básica do componente header"
```

**Opção 2 – Com corpo explicativo (recomendado quando tem contexto)**

```bash
git commit -m "feat(header): adicionar estrutura básica do componente header

Cria o componente Header com:
- Logo à esquerda
- Menu de navegação central
- Área de usuário à direita

Ainda sem responsividade e sem estado de autenticação.
Próximo passo: implementar o dropdown do usuário."
```

**Opção 3 – Mais curta ainda (se for algo trivial)**

```bash
git commit -m "feat: criar esqueleto inicial do header"
```

### Dicas extras que fazem muita diferença no dia a dia

- Evite começar com maiúscula (exceto se seu time preferir)
- Não termine com ponto final na linha de assunto (convenção mais comum)
- Se quebrar compatibilidade → adicione `!` depois do tipo  
  Ex: `feat(api)!: mudar endpoint de login para v2`
- Use `git commit` sem `-m` → abre o editor e te força a escrever corpo bom
- Ferramentas úteis:
  - **commitizen** ou **cz-cli** (te guia com wizard)
  - **commitlint** + husky (valida o padrão no pre-commit)
  - **semantic-release** (gera versão + changelog automático)
