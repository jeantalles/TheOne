import re

with open('Site/src/components/PropostaEdifica.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix parcelas
content = content.replace(
    "{IS_ALUDE ? <><span className=\"font-medium\">4 parcelas:</span> {formatBRL(Math.round(total / 4))} por mês</> : <><span className=\"font-medium\">50/50:</span> {formatBRL(metade)} no início + {formatBRL(total - metade)} após 30 dias</>}",
    "<><span className=\"font-medium\">3 parcelas:</span> {formatBRL(Math.round(total / 3))} (D+0 pra iniciar, D+30 e D+60)</>"
)

# Fix prazo
content = content.replace(
    "{IS_ALUDE ? <><span className=\"font-medium\">Prazo:</span> de 2 a 4 meses, de acordo com o escopo contratado.</> : <><span className=\"font-medium\">Cartão:</span> em até 12x com taxa da operadora</>}",
    "<><span className=\"font-medium\">Prazo:</span> de 10 semanas (aproximadamente 2,5 meses).</>"
)

with open('Site/src/components/PropostaEdifica.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
