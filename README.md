# Romanization for Amazon Music α (RfAM) 🎵
By using the plugin you agree to share your IP, and the text of your music played, and you also agree that we will store the log of your requests for an indefinite period of time.

Ao usar o plugin você concorda em partilhar seu IP, e o texto da sua musica reproduzida, concordando também em armazenar os logs de seus pedidos por um tempo indeterminado

# 🇺🇸

!NOW SUPPORTS SPOTIFY!

Chrome Plugin to add version transliterate (in lantin) in japanese music with letter on Amazon Music web player

"Wow how cool... lyrics on the streaming service... i wanted to sing! but i don't know anything about nipponic writing..." YOUR PROBLEMS ARE OVER, at least on Amazon Music!

This open source plugin for the chromumium browser provides a romanized (or transliterated into Latin, call it what you will) version of Japanese songs.

Basic installation guide
----------------------------------
1. Download the [.CRX](https://github.com/Ruaneri-Portela/Romanization-For-Amazon-Music/raw/main/Extension.crx) or [.ZIP](https://github.com/Ruaneri-Portela/Romanization-For-Amazon-Music/raw/main/Extension.zip), if you download the ZIP unzip it into a folder that contains only the extension files after decompression
2. Go to your extension page in your favorite browser
3. Put it in dev mode.
4. Load the extension, in the files has the .crx, but for example the EDGE only has the option to load the unzipped version. You will select the folder in case you load the unpacked extension.
5. After that the extension should be working, test on Amazon Music 😊

Requirements... 
----------------------------------
Client:
Plugin and constant internet connection.

Server (Read about the API in end this document):
Python, Flash, Gunicorn and KAKASI

Kakasi is a transliteration software in C, it is used as our backend to convert the hiragana, katakana and kanji into romanji... More information at http://kakasi.namazu.org/index.html.en or https://github.com/loretoparisi/kakasi

# 🇧🇷

! AGORA SUPORTAMOS O SPOTIFY !

"Nossa que maneiro... letras no serviço de streaming ... queria cantar! mas não sei nada da escrita nipponica..." SEUS PROBLEMAS ACABARAM, ao menos no Amazon Music!

Esse plugin de codigo aberto para o chromumium browser disponibiliza uma versão romanizada (ou transliterada para o latin, chame como quiser) de musicas em japonês.

Guia Básico de instalação
----------------------------------
1. Baixe o [.CRX](https://github.com/Ruaneri-Portela/Romanization-For-Amazon-Music/raw/main/Extension.crx) ou o [.ZIP](https://github.com/Ruaneri-Portela/Romanization-For-Amazon-Music/raw/main/Extension.zip), caso baixe o ZIP descompacte dele em uma pasta que contenha apenas os arquivos da extensão apôs a descompressão
2. Vai em sua pagina de extensão em seu navegador favortito
3. Coloque ele em modo dev.
4. Carrege a extenção, nos arquivos tem o .crx, mas por exemplo o EDGE só tem a opção de carregar a versão descompactada. Você vai selecionar a pasta no caso de carregar a extensão não empacotada.
5. Após isso a extensão deve ser está funcionando, teste no Amazon Music 😊
   
Requisitos...
----------------------------------
Cliente:
Plugin e conexão constante com a internet.

Servidor (Leia sobre a API no fim desse documento):
Python, Flash, Gunicorn e o KAKASI

Kakasi e um software de transliteração em C, ele e usado como nosso backend para converter os hiragana, katakana e kanjis em romanji... Mais informações em http://kakasi.namazu.org/index.html.en ou https://github.com/loretoparisi/kakasi


----------------------------------
Original
![Não Romanizado/Non Romanized](https://github.com/Ruaneri-Portela/Romanization-For-Amazon-Music/blob/main/github/non-romanized.png?raw=true)
Com o plugin/ At plugin
![Romanizado/Romanized](https://github.com/Ruaneri-Portela/Romanization-For-Amazon-Music/blob/main/github/romanized.png?raw=true)

[API informations HERE](https://github.com/Ruaneri-Portela/KakasiAPI-Docker)

[Informações da API AQUI](https://github.com/Ruaneri-Portela/KakasiAPI-Docker)
