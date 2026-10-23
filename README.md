# Forja2D — montagem livre

Editor de personagens articulados para navegador, sem dependências externas.

- [Abrir no Portal Pixel](https://hebersonmiliano.github.io/portal-jogos/ferramentas/forja2d/)
- [Abrir versão independente](https://hebersonmiliano.github.io/Forja2D-Software/)

## Uso

Abra `index.html` no navegador ou execute `python -m http.server 8080` nesta pasta e acesse `http://localhost:8080`.

Selecione uma peça no desenho ou na lista. No menu Ferramenta, escolha Mover peça, Girar peça, Redimensionar ou Ajustar articulação e arraste no desenho. Redimensionar usa o arraste horizontal; dimensões independentes podem ser ajustadas no painel. Use os campos para ajustes precisos. O pivô é medido a partir do canto superior esquerdo da imagem. Para trás e Para frente mudam a ordem de desenho, sem mudar a hierarquia dos ossos. Desfazer e Refazer conservam até 50 alterações na sessão.

Montagem, dimensões, pivôs, cores e camadas valem para todas as poses. A rotação e a posição global são específicas de cada pose. Ajustar o pivô compensa a posição da peça e dos filhos na pose atual; outras poses podem precisar de revisão. O esqueleto mantém suas dez partes e conexões. As imagens importadas são ajustadas às dimensões configuradas.

Projetos antigos da primeira versão são migrados ao abrir. Salvar projeto baixa um JSON com imagens, geometria e animação. O armazenamento local é automático; guarde uma cópia baixada para evitar perda ao limpar o navegador. Projetos dos dois endereços compartilham o armazenamento da mesma origem GitHub Pages.

A spritesheet exporta as poses definidas em células transparentes de 512 × 512, com até oito colunas, em ordem da esquerda para a direita. Ignore células finais vazias. A prévia interpola as poses, mas a exportação contém somente as poses definidas. Partes fora da célula são cortadas. Configure o FPS no motor do jogo.

## Verificação

Execute `node check.cjs`. A verificação com DOM/canvas simulados cobre poses independentes, caminhada, exportação, arraste com pai girado, tamanho, pivô, camadas, histórico, migração da versão anterior e validação de arquivos.

## Publicação

O repositório publica a raiz da branch main no GitHub Pages. A versão integrada ao Portal Pixel é uma cópia de index.html, app.js e style.css em ferramentas/forja2d no repositório portal-jogos. Atualize ambas as cópias a cada versão.

Ainda não inclui desenho pixel a pixel, novas peças, alteração dos pais dos ossos, contas ou entrega de atividades escolares.
