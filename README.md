# Forja2D — estúdio de animações

Editor de personagens articulados para navegador, sem dependências externas.

- [Abrir no Portal Pixel](https://hebersonmiliano.github.io/portal-jogos/ferramentas/forja2d/)
- [Abrir versão independente](https://hebersonmiliano.github.io/Forja2D-Software/)

## Animações

Cada personagem pode ter até 20 animações, com até 120 poses por animação. Use Nova para começar um movimento vazio ou Duplicar para criar uma variação. Selecione o movimento no menu Animação e edite seu nome no painel à direita. Excluir animação pode ser desfeito.

Cada pose tem duração de 33 a 5000 ms. A prévia interpola até a próxima pose durante esse tempo. Com Loop, a última pose volta suavemente à primeira; sem Loop, a última pose permanece até o fim e a reprodução para nela. FPS define a taxa da exportação, sem alterar as durações das poses.

Exportar spritesheet gera os quadros intermediários e baixa PNG transparente + JSON com nome, tamanho, quantidade de quadros, colunas, linhas, FPS, loop e duração efetiva. O tempo exportado é arredondado para o próximo quadro inteiro. Permita vários downloads se o navegador solicitar. Escolha 64, 128, 256 ou 512 pixels no painel. Exportações muito extensas são recusadas antes de gerar a imagem (até 512 quadros e altura de 16384 pixels); reduza FPS, duração ou tamanho nesse caso. PNG da pose usa o tamanho escolhido e exporta apenas a pose selecionada.

## Uso

Abra `index.html` no navegador ou execute `python -m http.server 8080` nesta pasta e acesse `http://localhost:8080`.

Selecione uma peça no desenho ou na lista. No menu Ferramenta, escolha Mover peça, Girar peça, Redimensionar ou Ajustar articulação e arraste no desenho. Redimensionar usa o arraste horizontal; dimensões independentes podem ser ajustadas no painel. Use os campos para ajustes precisos. O pivô é medido a partir do canto superior esquerdo da imagem. Para trás e Para frente mudam a ordem de desenho, sem mudar a hierarquia dos ossos. Desfazer e Refazer conservam até 50 alterações na sessão.

Montagem, dimensões, pivôs, cores e camadas valem para todas as poses. A rotação e a posição global são específicas de cada pose. Ajustar o pivô compensa a posição da peça e dos filhos na pose atual; outras poses podem precisar de revisão. O esqueleto mantém suas dez partes e conexões. As imagens importadas são ajustadas às dimensões configuradas.

Projetos das versões 1 e 2 são migrados ao abrir, preservando a sequência como Animação 1. Os arquivos salvos usam a versão 3 e incluem todos os movimentos. Salvar projeto baixa um JSON com imagens, geometria e animação. O armazenamento local é automático; guarde uma cópia baixada para evitar perda ao limpar o navegador. Projetos dos dois endereços compartilham o armazenamento da mesma origem GitHub Pages.

A spritesheet usa até oito colunas, da esquerda para a direita. Ignore células finais vazias e consulte o JSON para a quantidade exata de quadros. Partes fora da área de 512 × 512 do editor são cortadas; a exportação redimensiona essa área para o tamanho escolhido.

## Verificação

Execute `node check.cjs`. A verificação com DOM/canvas simulados cobre poses independentes, caminhada, exportação, arraste com pai girado, tamanho, pivô, camadas, histórico, migração de projetos, animações independentes, duração, interpolação, metadados, loop e validação de arquivos.

## Publicação

O repositório publica a raiz da branch main no GitHub Pages. A versão integrada ao Portal Pixel é uma cópia de index.html, app.js e style.css em ferramentas/forja2d no repositório portal-jogos. Atualize ambas as cópias a cada versão.

Ainda não inclui desenho pixel a pixel, novas peças, alteração dos pais dos ossos, contas ou entrega de atividades escolares.
