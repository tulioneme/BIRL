// Carrgar dados dinamicos (AJAX)
var ajax = new XMLHttpRequest();

ajax.open("GET", "./dados.json", true);

ajax.send();

ajax.onreadystatechange = function(){
    var content = document.getElementById("content");
    if(ajax.readyState == 4 && ajax.status == 200){
        var data_json = JSON.parse(ajax.responseText);        

        if(data_json.length == 0){
            content.innerHTML = ' <div class="alert alert-dark" role="alert" >Nenhum café cadastrado.<div> <div class="row">';
        } else {
            var html_content = '<div class="row"> ';
            for(var i=0; i <data_json.length; i++) {
                html_content += card_cafe(data_json[i].imagem, data_json[i].cafe, data_json[i].descricao, i); 
            }
            html_content += ' </div>';
            cache_dinamico(data_json);
            content.innerHTML = html_content;
        }
    } 
}

var card_cafe = function(imagem, cafe, descricao, posicaoCafe) {
    return '<div class="col-md-4">'+
                '<div class="card">' +
                    '<div class="card-body">'+
                        '<div class="row"> <div class="col-12">'+
                            '<img src="'+imagem+'" class="coffee-img" />'+
                        '</div> </div> <div class="row">'+
                            '<h2 class="coffee-title">'+cafe+'</h2>'+
                        '</div> <div class="row coffee-description">'+
                            '<p class="card-text card-principal">'+descricao+'</p>'+
                        '</div> <div class="row">'+    
                            '<a href="#" onClick="javascript:dadosModal(\''+posicaoCafe+'\');" class="btn btn-secondary" data-toggle="modal" data-target="#receitas">Receitas</a>'+                        
                        '</div>'+        
                    '</div>'+
                '</div>'+
            '</div>'
    ;
}

var dadosModal = function(posicaoCafel){
    var metodos = JSON.parse(ajax.responseText)[posicaoCafel].metodos;            
    if(metodos.length == 0){
        document.getElementById('accordionMetodo').innerHTML = html_content_modal = ' <div class="alert alert-dark" role="alert" >Nenhuma receita cadastrada.<div> <div class="row">';
    } else {
        var html_content_modal="";
        for(var j=0; j < metodos.length; j++) {
            html_content_modal += 
                '<div class="card">'+
                '<div class="card-header card-header-theme" id="heading'+metodos[j].id+'">'+
                '<h5 class="mb-0"> <div class="row">'+
                    '<button class="btn btn-dark btn-theme" type="button" data-toggle="collapse" data-target="#collapse'+metodos[j].id+'" aria-expanded="true" aria-controls="collapse'+metodos[j].id+'" id="modal_metodo">'+metodos[j].descricao+'</button>'+
                '</div></h5>'+
                '</div>'+
                '<div id="collapse'+metodos[j].id+'" class="collapse show" aria-labelledby="heading'+metodos[j].id+'" data-parent="#accordionMetodo">'+
                '<div class="card-body card-body-theme">'+
                    '<h2 id="modal_metodo_equipamento">'+metodos[j].marca+'</h2>'+
                    '<ul class="list-group" id="modal_list_receitas">';

                    if(metodos[j].receitas.length == 0) {
                        html_content_modal +=                      
                        '<li class="list-group-item list-group-item-theme"> Nenhuma receitas cadastradas </li>';
                    }else {
                        for(var z=0; z < metodos[j].receitas.length; z++) {
                            
                            html_content_modal +=                      
                            '<li class="list-group-item list-group-item-theme">'+metodos[j].receitas[z].receita+'</li>';
                        }
                    }
                    
                    
                html_content_modal +=    '</ul>'+
                '</div>'+
                '</div>'+
            '</div>';
        }
        document.getElementById('accordionMetodo').innerHTML = html_content_modal;
    }   
}

var cache_dinamico = function(data_json){
    if('caches' in window){
        caches.delete('coffee-app-dinamico').then(function(){
            if(data_json.length > 0){
                var files = ['dados.json'];
                for(var i=0; i <data_json.length; i++) {
                    if(files.indexOf(data_json[i].imagem) == -1){
                        files.push(data_json[i].imagem);
                    }
                }
            }

            caches.open('coffee-app-dinamico').then(function(cache){
                cache.addAll(files).then(function(){
                });
            });
        });
    }
}

let disparoInstalacao = null;
const btnInstall = document.getElementById('btInstall');
let inicializarInstalacao = function(){
    btnInstall.removeAttribute("hidden");
    btnInstall.addEventListener("click", function(){
        disparoInstalacao.prompt();
        disparoInstalacao.userChoice.then((choice) => {
            if(choice.outcome === 'accepted'){
            } else {
            }
        });
    })    
}

window.addEventListener('beforeinstallprompt', gravarDisparo);

function gravarDisparo(evt){
    disparoInstalacao = evt;
}