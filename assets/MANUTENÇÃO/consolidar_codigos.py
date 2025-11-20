import os

def criar_arquivo_consolidado():
    # Lista de arquivos baseada nas imagens fornecidas
    arquivos = [
        # Assets CSS
        "assets/css/background.css",
        "assets/css/botoes.css",
        "assets/css/cards.css", 
        "assets/css/contato.css",
        "assets/css/entrega.css",
        "assets/css/exp.css",
        "assets/css/experiencia.css",
        "assets/css/fabrica.css",
        "assets/css/footer.css",
        "assets/css/formacao.css",
        "assets/css/headers.css",
        "assets/css/home.css",
        "assets/css/layout.css",
        "assets/css/menu.css",
        "assets/css/modals.css",
        "assets/css/portfolio.css",
        "assets/css/reset.css",
        "assets/css/skills.css",
        "assets/css/sobre.css",
        "assets/css/tokens.css",
        
        # JavaScript
        "assets/js/includes.js",
        "assets/js/script.js",
        
        # HTML Pages
        "contato.html",
        "exp.html", 
        "fabrica.html",
        "footer.html",
        "formacao.html",
        "header.html",
        "index.html",
        "minha-entrega.html",
        "portfolio.html",
        "skills.html",
        "sobre.html",
        
        # Outros
        "LICENSE",
        "portfolio/style.css"
    ]
    
    # Caminho completo para o arquivo de saída (ATUALIZADO)
    caminho_saida = r"C:\Users\THIAG\OneDrive\Documentos\Projetos\Curso\ALURA\FrontEnd\FrontEndExercicios\Estudo\Techboard\pagina-thiago-placido\pagina-thiago-placido\assets\MANUTENÇÃO\CODIGO_FONTE.TXT"
    
    with open(caminho_saida, "w", encoding="utf-8") as arquivo_final:
        for caminho_arquivo in arquivos:
            # Verifica se o arquivo existe
            if os.path.exists(caminho_arquivo):
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
                arquivo_final.write(f"\n################################################\n")
                arquivo_final.write(f"ARQUIVO NÃO ENCONTRADO: {caminho_arquivo}\n")
                arquivo_final.write(f"################################################\n\n")
    
    print(f"Arquivo 'CODIGO_FONTE.TXT' criado com sucesso em: {caminho_saida}")

# Executar a função
if __name__ == "__main__":
    criar_arquivo_consolidado()