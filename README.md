# Forja2D

Primeira versão de um editor de personagens articulados para navegador. Abra `index.html` diretamente no navegador ou use um servidor HTTP estático (por exemplo, `python -m http.server 8080` na pasta do projeto) e acesse `/forja2d/`.

Verificação de lógica: `node forja2d/check.cjs` a partir da pasta principal. Usa DOM/canvas simulados; não substitui uma revisão visual no navegador.

Inclui personagem de exemplo, dez peças com hierarquia, rotação por pose, posição global, interpolação na prévia, caminhada de exemplo, importação de PNG/JPEG/WebP por peça, projeto JSON, salvamento local e exportação PNG transparente. As imagens são ajustadas ao tamanho fixo da peça. As cores e imagens se aplicam a todas as poses.

A spritesheet contém as poses da sequência, em ordem da esquerda para a direita, até oito colunas, com células de 512 × 512. Células finais vazias devem ser ignoradas. A prévia interpola as poses; o PNG exporta os quadros definidos. Configure a quantidade de quadros e FPS no motor do jogo.

Funciona sem serviços externos, contas ou envio de imagens. O armazenamento do navegador pode ser limpo; baixe o JSON para preservar os projetos. Ainda não inclui desenho pixel a pixel, edição de tamanho/pivô, contas de alunos ou integração com o portal. A publicação e a integração serão feitas após identificar o portal correto.
