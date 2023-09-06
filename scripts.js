// Responsividade

window.addEventListener('DOMContentLoaded', event => {

    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    navbarShrink();

    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Funções principais

function processFile() {

  const fileInput = document.getElementById('fileInput');

  if (fileInput.files.length === 0) {
    alert('Por favor, selecione o arquivo.');
    return;
  }

  const file = fileInput.files[0];

  if (!file.name.toLowerCase().endsWith('.txt')) {
    alert('Por favor, selecione um arquivo compatível.');
    return;
  }
  
  const reader = new FileReader();

    reader.onload = function(e) {
    
    const fileContents = e.target.result;
    const transformedText = transformText(fileContents);
   
    const blob = new Blob([transformedText], { type: 'text/plain' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'CNABCONVERTIDO.txt';

    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);

  };

  reader.readAsText(file);
}

  function transformText(fileContents) {
    
    const separador = ";";

    var transformedText = `CPF${separador}Nome${separador}Agencia${separador}Conta${separador}Valor${separador}\n`
    const lines = fileContents.split('\n');
    for(i = 2; i<(lines.length - 3); i = i + 2)
    {
        transformedText = transformedText + processa(lines[i], lines[i+1],separador) + "\n";
        
    }
    console.log(transformedText);
    return transformedText;
  }

  function processa(segmentoA, segmentoB, separador){
    
    const seg = {
      cpf: segmentoB.substring(21, 32),
      nome: segmentoA.substring(43, 73).trim(),
      agencia: segmentoA.substring(24, 28),
      conta: (parseInt(segmentoA.substring(30, 41))),
      valor: (parseFloat(segmentoA.substring(120, 134)) / 100).toFixed(2)
    }
    
    const retorno = 
      seg.cpf + separador +
      seg.nome + separador +
      seg.agencia + separador + 
      seg.conta + separador + 
      seg.valor + separador;
    
    return retorno;

  }