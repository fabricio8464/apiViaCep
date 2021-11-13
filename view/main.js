var rua = document.getElementById('rua');
var bairro = document.getElementById('bairro');
var cidade = document.getElementById('cidade');
var uf = document.getElementById('uf');
var cepzinho = document.getElementById('cep');
var div = document.getElementById('listaReg')
var formulario = document.getElementById('form1');




$(function() {
    $("#cadastra").on('click', function(e) { e.preventDefault(); });
    $(".limpa").on('click', function(e) { e.preventDefault(); });
    $("#reg").on('click', function(e) { e.preventDefault(); });
});


function pesquisaCep(valor) {
    var cep = valor.replace(/\D/g, '');
    var script = document.createElement('script');
    script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=usandoApi';
    document.body.appendChild(script);

}

function usandoApi(conteudo) {
    cepzinho.value = (conteudo['cep']);
    rua.value = (conteudo['logradouro']);
    bairro.value = (conteudo['bairro']);
    cidade.value = (conteudo['localidade']);
    uf.value = (conteudo['uf']);

}

function cadastrarCep() {
    $.ajax({
        url: "./controller/cadastra_cep.php",
        data: $('form[name="formulario"]').serialize(),
        type: "post",
        dataType: "json",
        success: function(response) {
            if (cepzinho != ' ') {
                modalSuccess();
                retiraModalSuccess();
            } else {
                iniciaModalErro();
                retiraModalErro();

            }
        },
        error: function(a, b, c) {
            if (a.status = 200) {
                iniciaModalErro();
                retiraModalErro();

            }
        }
    });
}

//essa é a function que chama o que está no banco de dados



function chamaConsulta() {
    $.ajax({
        url: "./controller/busca_cad.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            for (let i = 0; i < response.length; i++) {
                var x = Object.values(response[i]);
                for (let c = 1; c < x.length; c++) {
                    if (response[i][c] != undefined) {
                        conteudo = response[i][c];
                        div.innerHTML += conteudo + '  ';
                    }
                }
                div.innerHTML += '</br>';
            }

        },
        error: function(a, b, c) {
            console.log('Erro:' + a['status'] + '' + c);

        }
    });

}
window.onload = chamaConsulta();


function limpaFormulario() {
    cepzinho.value = " ";
    rua.value = " ";
    bairro.value = " ";
    cidade.value = " ";
    uf.value = " ";
}


//variaveis que interagem apenas com o modal

var removeModal = document.getElementById('btnConfirma');
var removeModalErro = document.getElementById('btnConfirmaErro');
var modalCad = document.getElementById('modalPai');
var modalErro = document.getElementById('modalErroPai');

function modalSuccess() {
    modalCad.classList.add('aparece');
}

function retiraModalSuccess() {
    removeModal.addEventListener('click', function() {
        modalCad.classList.remove('aparece');
    });

}

function iniciaModalErro() {
    modalErro.classList.add('aparece');
}

function retiraModalErro() {
    removeModalErro.addEventListener('click', function() {
        modalErro.classList.remove('aparece');
    });
}