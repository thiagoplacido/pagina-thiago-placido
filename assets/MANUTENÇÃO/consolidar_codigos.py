import os

def criar_arquivo_consolidado():
    # Lista de arquivos ATUALIZADA
    arquivos = [
        # Assets CSS
        "assets/css/background.css",
        "assets/css/botoes.css",
        "assets/css/cards.css", 
        "assets/css/contato.css",
        "assets/css/entrega.css",
        "assets/css/experiencia.css",
        "assets/css/fabrica.css",
        "assets/css/footer.css",
        "assets/css/formacao.css",
        "assets/css/headers.css",
        "assets/css/home.css",
        "assets/css/layout.css",
        "assets/css/menu.css",
        "assets/css/modals.css",
        "assets/css/portifolio.css",
        "assets/css/reset.css",
        "assets/css/skills.css",
        "assets/css/sobre.css",
        "assets/css/tokens.css",
        
        # JavaScript
        "assets/js/includes.js",
        "assets/js/script.js",
        
        # CSS Principal
        "assets/style.css",
        
        # HTML Pages
        "contato.html",
        "exp.html", 
        "fabrica.html",
        "footer.html",
        "formacao.html",
        "header.html",
        "index.html",
        "minha-entrega.html",
        "portifolio.html",
        "skills.html",
        "sobre.html",
        
        # Outros
        "LICENSE"
    ]
    
    # Caminho completo para o arquivo de saída
    caminho_saida = r"C:\Users\THIAG\OneDrive\Documentos\Projetos\Curso\ALURA\FrontEnd\FrontEndExercicios\Estudo\Techboard\pagina-thiago-placido\pagina-thiago-placido\assets\MANUTENÇÃO\CODIGO_FONTE.TXT"
    
    with open(caminho_saida, "w", encoding="utf-8") as arquivo_final:
        
        # SEÇÃO: ESTRUTURA DO PROJETO
        arquivo_final.write("################################################\n")
        arquivo_final.write("ESTRUTURA DO PROJETO\n")
        arquivo_final.write("################################################\n\n")
        
        arquivo_final.write("RAIZ DO PROJETO:\n")
        arquivo_final.write("├── assets/\n")
        arquivo_final.write("│   ├── css/\n")
        arquivo_final.write("│   │   ├── background.css\n")
        arquivo_final.write("│   │   ├── botoes.css\n")
        arquivo_final.write("│   │   ├── cards.css\n")
        arquivo_final.write("│   │   ├── contato.css\n")
        arquivo_final.write("│   │   ├── entrega.css\n")
        arquivo_final.write("│   │   ├── experiencia.css\n")
        arquivo_final.write("│   │   ├── fabrica.css\n")
        arquivo_final.write("│   │   ├── footer.css\n")
        arquivo_final.write("│   │   ├── formacao.css\n")
        arquivo_final.write("│   │   ├── headers.css\n")
        arquivo_final.write("│   │   ├── home.css\n")
        arquivo_final.write("│   │   ├── layout.css\n")
        arquivo_final.write("│   │   ├── menu.css\n")
        arquivo_final.write("│   │   ├── modals.css\n")
        arquivo_final.write("│   │   ├── portifolio.css\n")
        arquivo_final.write("│   │   ├── reset.css\n")
        arquivo_final.write("│   │   ├── skills.css\n")
        arquivo_final.write("│   │   ├── sobre.css\n")
        arquivo_final.write("│   │   └── tokens.css\n")
        arquivo_final.write("│   ├── js/\n")
        arquivo_final.write("│   │   ├── includes.js\n")
        arquivo_final.write("│   │   └── script.js\n")
        arquivo_final.write("│   └── style.css\n")
        arquivo_final.write("├── contato.html\n")
        arquivo_final.write("├── exp.html\n")
        arquivo_final.write("├── fabrica.html\n")
        arquivo_final.write("├── footer.html\n")
        arquivo_final.write("├── formacao.html\n")
        arquivo_final.write("├── header.html\n")
        arquivo_final.write("├── index.html\n")
        arquivo_final.write("├── LICENSE\n")
        arquivo_final.write("├── minha-entrega.html\n")
        arquivo_final.write("├── portifolio.html\n")
        arquivo_final.write("├── skills.html\n")
        arquivo_final.write("└── sobre.html\n\n")
        
        arquivo_final.write("ESTATÍSTICAS:\n")
        arquivo_final.write(f"TOTAL DE ARQUIVOS: {len(arquivos)}\n")
        arquivo_final.write(f"ARQUIVOS CSS: 19\n")
        arquivo_final.write(f"ARQUIVOS JS: 2\n")
        arquivo_final.write(f"ARQUIVOS HTML: 11\n")
        arquivo_final.write(f"OUTROS: 1\n\n")
        
        arquivo_final.write("################################################\n")
        arquivo_final.write("FIM DA ESTRUTURA DO PROJETO\n")
        arquivo_final.write("################################################\n\n\n")
        
        # SEÇÃO: CÓDIGOS DOS ARQUIVOS
        arquivos_encontrados = 0
        arquivos_nao_encontrados = 0
        
        for caminho_arquivo in arquivos:
            # Verifica se o arquivo existe
            if os.path.exists(caminho_arquivo):
                arquivos_encontrados += 1
                arquivo_final.write(f"\n################################################\n")
                arquivo_final.write(f"ARQUIVO: {caminho_arquivo}\n")
                arquivo_final.write(f"################################################\n\n")
                
                try:
                    with open(caminho_arquivo, "r", encoding="utf-8") as arquivo:
                        conteudo = arquivo.read()
                        arquivo_final.write(conteudo)
                    arquivo_final.write("\n\n")
                except Exception as e:
                    arquivo_final.write(f"ERRO ao ler arquivo: {e}\n\n")
            else:
                arquivos_nao_encontrados += 1
                arquivo_final.write(f"\n################################################\n")
                arquivo_final.write(f"ARQUIVO NÃO ENCONTRADO: {caminho_arquivo}\n")
                arquivo_final.write(f"################################################\n\n")
        
        # RESUMO FINAL
        arquivo_final.write("################################################\n")
        arquivo_final.write("RESUMO DA EXECUÇÃO\n")
        arquivo_final.write("################################################\n\n")
        arquivo_final.write(f"Arquivos encontrados: {arquivos_encontrados}\n")
        arquivo_final.write(f"Arquivos não encontrados: {arquivos_nao_encontrados}\n")
        arquivo_final.write(f"Total processado: {len(arquivos)}\n")
        arquivo_final.write(f"Taxa de sucesso: {(arquivos_encontrados/len(arquivos))*100:.1f}%\n")
    
    print(f"Arquivo 'CODIGO_FONTE.TXT' criado com sucesso em: {caminho_saida}")
    print(f"Resumo: {arquivos_encontrados} arquivos encontrados, {arquivos_nao_encontrados} não encontrados")

# Executar a função
if __name__ == "__main__":
    criar_arquivo_consolidado()