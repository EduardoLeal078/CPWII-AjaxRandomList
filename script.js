var carregando = false; // indica se uma requisição Ajax está em andamento
// função para carregar mais imagens
function carregarImagens() {
  if (carregando) {
    return;
  }
  carregando = true;
  var url = "imagens.json";
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var divImagens = document.getElementById("images");
      // divImagens.innerHTML += ajax.responseText;
      var images = JSON.parse(ajax.responseText);
      var imagensEmbaralhadas = embaralharImagens(images.animals);
      for (const image of imagensEmbaralhadas) {
        var img = document.createElement("img");
        img.src = image.imagemUrl;
        img.alt = image.name;
        divImagens.appendChild(img);
      }

      carregando = false;
    }
  };
  ajax.send();
}

// detecta quando o usuário chegou no final da página e carrega mais imagens
window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    carregarImagens();
  }
};

//------------
function embaralharImagens(imagens) {
  var imagensEmbaralhadas = imagens.slice(); // cria uma cópia da matriz original
  for (var i = imagensEmbaralhadas.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = imagensEmbaralhadas[i];
    imagensEmbaralhadas[i] = imagensEmbaralhadas[j];
    imagensEmbaralhadas[j] = temp;
  }
  return imagensEmbaralhadas;
}
