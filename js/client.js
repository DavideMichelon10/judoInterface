var Crypt = new Crypt();


function Ricerca(iniziale) {
    if(iniziale.length == 0){
       StampaAtleti();
        }
        else{
                $.get(wsHost + "/search/"+ iniziale, function(data){
                StampaNomeCognome(data);
            })
        }
       
}
function StampaAtleti(){
     $.get(wsHost + "/tuttiAtleti/", function(data){
            StampaNomeCognome(data);
        })
}

function StampaNomeCognome(data){
     var str = '';
            str += "<ul class='list-group'>";
            for (var i in data) {
                        str += '<li class="list-group-item" style="cursor:pointer" id="Atleta'+i+'" onclick="VediAtleta('+ data[i].idAtleta +')">';
                        str += '<center><h2>' + data[i].Nome + '&nbsp<strong>' + data[i].Cognome + '</strong></h2></center></li>';
                    }
                    str += "</ul>"
            $("#listAtleti").html(str);
}
function VediAtleta(idAtleta){
            $.get(wsHost + "/tuttiAtleti/", function(data){
                for(var i in data){
                     if(idAtleta == data[i].idAtleta){
                            $("#nome").html(data[i].Nome);
                            $("#cognome").html(data[i].Cognome);
                            $("#sesso").html(CambiaSesso(data[i].Sesso));
                            $("#CategoriaPeso").html(data[i].pesoInizialeCategoria + ' - '+data[i].pesoFinaleCategoria );
                            $("#Dnascita").html(data[i].DataNascita);
                            $("#societa").html(data[i].NomeSquadra);
                            $("#CategoriaEtà").html(data[i].NomeCategoria);
                         
                     }
                }
        })
}

function StampaIncontri(){
        $.get(wsHost + "/tuttiIncontri/", function(data){
            var str = '';
            
            str += '<table>';
            for (var i in data){
                    str += '<tr>';
                    str+= '<td>'+ data[i].NomePrimoAtleta+ '  '+  data[i].CognomePrimoAtleta+ '  --  '+ data[i].NomeSecondoAtleta+ '  '+  data[i].CognomeSecondoAtleta+ '</td>';
                }
                str += "</table>";
            $("#risultati").html(str);
            })
}

function StampaTabellaAtleti(){
    $.get(wsHost +"/tuttiAtleti/", function(data){
        var str = '';
        for (var i in data) {       
                    str += '<tr><td>' + data[i].Nome + '&nbsp;</td><td>' + data[i].Cognome + '</td><td>' + data[i].Peso + '</td><td>' + data[i].NomeCategoria + '</td><td>' + CambiaSesso(data[i].Sesso) + '</td><td>' + data[i].NomeSquadra + '</td><td style="cursor:pointer" onclick="ModificaAtleta('+ data[i].idAtleta + ')" class="glyphicon glyphicon-pencil"></td><td style="cursor:pointer" onclick="EliminaAtleta('+ data[i].idAtleta + ')" class="glyphicon glyphicon-remove"></td></tr>';
                }
        $("#TabellaAtleti").html(str);
    });
}

function ModificaAtleta(id){
    $("#ModificaModal").modal("show");
    $.get(wsHost +"/ModificaAtleta/"+ id, function(data){
        var str='';
            for (var i in data) {   
                str+='<form return false;>';      
                str+='<tr class="form-group"><td><strong>Nome:</strong></td><td> <input id="TextBoxNome" type="text" name="Nome" pattern="[A-Za-z]+"  value="'+data[i].Nome+'" required class="form-control" placeholder="Nome"></td></tr><tr class="form-group"><td><strong>Cognome:</strong></td><td><input id="TextBoxCognome" type="text" name="Cognome" pattern="[A-Za-z ]+" value="'+data[i].Cognome+'" required class="form-control" placeholder="Cognome"></td></tr><tr class="form-group"><td><strong>Peso:</strong></td><td><input id="TextBoxPeso" type="text" name="Peso" pattern="[0-9]{2}"  value="'+data[i].Peso+'" required class="form-control" placeholder="Peso"></td></tr><tr><td><strong>Sesso:</strong></td><td><select id="sesso" class="form-control" required><option value="1">Maschio</option><option value="0">Femmina</option></select></td></tr><tr class="form-group"><td><strong>Anno di nascita:</strong></td><td><input id="TextBoxCategoriaAnnoNascita" type="text" name="AnnoNascita" pattern="[0-9]{4}" min="1910" max="2017" value="'+data[i].AnnoNascita+'" required class="form-control" placeholder="Anno di nascita"></td></tr><tr class="form-group"><td><strong>Id società:</strong></td><td><input id="TextBoxidSocietà" type="text" name="idSocietà" pattern="[0-9]+" value="'+data[i].FkSquadre+'" required class="form-control" placeholder="ID Società"></td></tr>';
                str+='<br /><center><input type="button" class="btn btn-primary btn-small btn-nav" value="Modifica" onclick="InserisciModifica('+id+', TextBoxNome.value, TextBoxCognome.value, TextBoxPeso.value,sesso.value, TextBoxCategoriaAnnoNascita.value,TextBoxidSocietà.value);"/></center>'
                str+='</form>';}
        
        $("#idModificaAtleta").html(str);
    })
}

function InserisciModifica(id, nome, cognome, peso, sesso,annoNascita,fkSquadre){
    //alert(id);
   $.get(wsHost +"/InserisciLaModifica/"+ id +"/"+ nome +"/"+ cognome+"/"+ peso+"/"+ sesso +"/"+ annoNascita +"/"+fkSquadre, function(data){
        StampaTabellaAtleti();
       $("#ModificaModal").modal("hide");
    })
}
function EliminaAtleta(id){
    $.get(wsHost + "/EliminaAtleta/" + id, function(data){  
        StampaTabellaAtleti();
    })
}

function CambiaSesso(sesso){
    if(sesso == 1)
        return 'Maschio'
    else if (sesso == 0)
        return 'Femmina'
}

function Inserisci(nome, cognome, peso, sesso,annoNascita,fkSquadre){
      $.get(wsHost+"/InserisciAtleta/"+ nome +"/"+ cognome+"/"+ peso+"/"+ sesso +"/"+ annoNascita +"/"+fkSquadre, function(data){
          StampaTabellaAtleti();
          //funzione per alert di non inserimento
      })
}

function VediSocieta(){
    $.get(wsHost +"/tutteSocieta/", function(data){
        var str ='';
        for(var i in data){  
            str += '<tr>';
            str += '<td><h2>' + data[i].NomeSquadra + '</h2></td>';
            str += '<td><h2>' + data[i].idSquadre + '</h2></td>';
            str += '<td><h2>' + data[i].conta + '</h2></td>';
            str += '</tr>';
        }
        $("#societa").html(str);
    })
}

function ListaCategorie(){
         $.get(wsHost +"/ListaCategorie/", function(data){
             var str='';
             str+='<select id="Categorie" class="form-control" required>';
             for(var i in data){
                 str+='<option value="'+data[i].NomeCategoria+'">'+data[i].NomeCategoria+'</option>';
            }
             str+='</select>';
        $("#selectCatEta").html(str);
        })
}
function ListaPesi(){
        $.get(wsHost +"/ListaPesi/", function(data){
            var str='';
            str+='<select id="Peso" class="form-control" required>';
            for(var i in data){
                str+='<option value="'+data[i].idCategoriePeso+'">'+data[i].PesoIniziale+' - '+data[i].PesoFinale+'</option>';
            }
            str+='</select>';
        $("#selectCatPeso").html(str);
    })
}

/*
function ListaTatami(){
        $.get(wsHost +"/ListaTatami/", function(data){
            var str='';
            str+='<select id="Tatami" class="form-control" required>';
            for(var i in data){
                str+='<option value="'+data[i].idTatami+'">'+data[i].idTatami+'</option>';
            }
            str+='</select>';
        $("#selectTatami").html(str);
    })
}
*/

// funzione per il controllo dell'autenticazione
function logIn(pwd)
{
    var hash = Crypt.HASH.sha384(pwd);
    $.get(wsHost +"/login/" + hash, function(data){
        if(data == "1")
            {
                $.cookie("admin", 1);
            }
        else if(data == "2")
            {
                $.cookie("admin", 2);
            }
        else if(data == "0")
            {
                $.cookie("admin", 0);
            }
        else
            alert("Error!");
    });
}
// PWD --> 123 = InseritoreRisultati, 456 = Inseritore Atleti, 123456 = Amministratore
// 0 = InseritoreAtleti, 1 = InseritoreRisultati, 2 = Amministratore, 3 = Non loggato
function checkAdmin(){
    var cookieValue = $.cookie("admin");

    if(cookieValue == 0)
        {
            $(".insert").show();
            $(".admin").hide();
            $(".log").hide();
            $(".logOut").show();
        }
    else if(cookieValue == 1)
        {
            $(".admin").hide();
            $(".log").hide();
            $(".insert").hide();
            $(".logOut").show();
        }
    else if(cookieValue == 2)
        {
            $(".admin").show();
            $(".log").hide();
            $(".insert").show();
            $(".logOut").show();
        }
    else 
        {
            $(".admin").hide();
            $(".log").show();
            $(".insert").hide();
            $(".logOut").hide();
        }
}

function logOut(){
    $.cookie("admin", 3);
    $(".admin").hide();
    $(".log").show();
    $(".insert").hide();
    $(".logOut").hide();
    window.location.replace("index.html");

}

function VisualizzaRisultati(Sesso, Categorie,Peso){
    var str ="";
    $.get(wsHost +"/VisualizzaIncontri/"+Sesso+"/"+ Categorie+"/"+ Peso, function(data){
        if(data.length == 0){
             $("#NienteIncontriModal").modal("show");
        }
        else{
            str += '<br />';
            str += '<div class="thumbnail">';
            str += '<table class="table">';
            str += '<thead><tr><th>Primo atleta</th><th>Secondo atleta</th><th>Turno</th></tr></thead>';
            str += '<tbody>';
            for (var i in data){
                    console.log(data[i].Secondoatleta);
                    str += '<tr style="cursor:pointer" id="Atleta'+i+'" onclick="AggiungiVincente('+ data[i].idIncontri +')">';
                    str+= '<td>'+ data[i].Primoatleta+ '</td><td>'+  data[i].Secondoatleta + '</td><td>'+data[i].Turno+'</td></tr>';
                }
                str += "</tbody>";
                str += "</table>";
                str += "</div>";
        }
            
        }).then(function(){
            $("#risultati").html(str);
    });
}



function AtletiRivali(){
         $.get(wsHost +"/AtletiRivali/", function(data){
             var str='';
             str+='<select id="Categorie" class="form-control" required>';
             for(var i in data){
                 str+='<option value="'+data[i].NomeCategoria+'">'+data[i].NomeCategoria+'</option>';
            }
             str+='</select>';
        $("#selectCatEta").html(str);
        })
}

function AggiungiVincente(idIncontro){
    var cookieValue = $.cookie("admin");
    if(cookieValue == 1 || cookieValue == 2){
        $("#IncontriModal").modal("show");
        $.get(wsHost +"/MostraAvversari/"+ idIncontro, function(data){
            var str='';
            for (var i in data){
                    str+= '<form onsubmit="InserisciVincitoreDb(Vincitore.value, ' + data[i].idIncontri + ');return false;">';
                        str+= '<center>';
                                str+='<select id="Vincitore" class="form-control" required>';
                                    str+= '<option value="'+data[i].FkAtleta1+'">'+data[i].Primoatleta+'</option>';
                                    str+= '<option value="'+data[i].FkAtleta2+'">'+data[i].Secondoatleta+'</option>';
                                str+= '</select>';
                            str+= '<button type="submit" class="btn btn-primary">Inserisci</button>';
                        str+='</center>';
                    str+= '</form>';
             }
            $("#ScegliVincitore").html(str);
        });
    } else {
       $("#ErrorModal").modal("show");
    }
}

function InserisciVincitoreDb(vincitore, idIncontri){
    var ValoreVincitore = $('#Vincitore').val();
    alert(idIncontri);
    alert(vincitore);
    $.post(wsHost +"/InserisciVincitoreDb/"+ ValoreVincitore+"/"+ idIncontri);
}

function CreaIncontri(sesso, categorie, peso, tatami){
    console.log(sesso);
    $.get(wsHost +"/CreaIncontri_/" + sesso + "/" + categorie + "/" + peso + "/"+tatami, function(data){
       var str='';
            for (var i in data){
                if(data[i].length < 1){
                    $("#ZeroAtletiModal").modal("show");
                }
            }
    });
}

/*function AssegnaTatami(){
    $.get(wsHost + '/PrendiTatami/', function(data){
        var str1 = '';
        var str2 = '';
        var str3 = '';
        var str4 = '';
        var str5 = '';
        for(var j in data){
            if (data[j].Tatami_idTatami == 1){
                str1+= "<tr>"; 
                str1+= "<td>" + data[j].CategoriaEtà_NomeCategoria + "&nbsp;</td><td>" +CambiaSesso(data[j].Sesso)+ "&nbsp;</td><td>"+data[j].PesoIniziale+"&nbsp; - &nbsp;"+data[j].PesoFinale+"</td>";
                str1+="</tr>";
            }
            else if (data[j].Tatami_idTatami == 2){
                str2+= "<tr>"; 
                str2+= "<td>" + data[j].CategoriaEtà_NomeCategoria + "&nbsp;</td><td>" +CambiaSesso(data[j].Sesso)+ "&nbsp;</td><td>"+data[j].PesoIniziale+"&nbsp; - &nbsp;"+data[j].PesoFinale+"</td>";
                str2+="</tr>";
            }
            else if (data[j].Tatami_idTatami == 3){
                str3+= "<tr>"; 
                str3+= "<td>" + data[j].CategoriaEtà_NomeCategoria + "&nbsp;</td><td>" +CambiaSesso(data[j].Sesso)+ "&nbsp;</td><td>"+data[j].PesoIniziale+"&nbsp; - &nbsp;"+data[j].PesoFinale+"</td>";
                str3+="</tr>";
            }
            else if (data[j].Tatami_idTatami == 4){
                str4+= "<tr>"; 
                str4+= "<td>" + data[j].CategoriaEtà_NomeCategoria + "&nbsp;</td><td>" +CambiaSesso(data[j].Sesso)+ "&nbsp;</td><td>"+data[j].PesoIniziale+"&nbsp; - &nbsp;"+data[j].PesoFinale+"</td>";
                str4+="</tr>";
            }
            else if (data[j].Tatami_idTatami == 5){
                str5+= "<tr>"; 
                str5+= "<td>" + data[j].CategoriaEtà_NomeCategoria + "&nbsp;</td><td>" +CambiaSesso(data[j].Sesso)+ "&nbsp;</td><td>"+data[j].PesoIniziale+"&nbsp; - &nbsp;"+data[j].PesoFinale+"</td>";
                str5+="</tr>";
            }
       }
    
    if(str1.length == 0)
        str1 += "<tr class='bg-danger'><td>Non ci sono ancora Categorie per questo tatami</td><td></td><td></td></tr>";
    else 
        str1 = str1;
    
    if(str2.length == 0)
        str2 += "<tr class='bg-danger'><td>Non ci sono ancora Categorie per questo tatami</td><td></td><td></td></tr>";
    else 
        str2 = str2;
    
    if(str3.length == 0)
        str3 += "<tr class='bg-danger'><td>Non ci sono ancora Categorie per questo tatami</td><td></td><td></td></tr>";
    else 
        str3 = str3;
    
    if(str4.length == 0)
        str4 += "<tr class='bg-danger'><td>Non ci sono ancora Categorie per questo tatami</td><td></td><td></td></tr>";
    else 
        str4 = str4;
    
    if(str5.length == 0)
        str5 += "<tr class='bg-danger'><td>Non ci sono ancora Categorie per questo tatami</td><td></td><td></td></tr>";
    else 
        str5 = str5;
    
    $("#tatami1").html(str1);
    $("#tatami2").html(str2);
    $("#tatami3").html(str3);
    $("#tatami4").html(str4);
    $("#tatami5").html(str5);
    })
}*/

function AssegnaTatami(){
    //var str=["str1", "str2", "str3", "str4", "str5"];
     var str=[];
    $.get(wsHost + '/PrendiTatami/', function(data){
        for(var j in data){
            for(var i=1; i<=5; i++){
                str[i] = '';
                if (data[j].Tatami_idTatami == i){
                    var tmp = '';
                    tmp+="<tr>"; 
                    tmp+= "<td>" + data[j].CategoriaEtà_NomeCategoria + "&nbsp;</td><td>" +CambiaSesso(data[j].Sesso)+ "&nbsp;</td><td>"+data[j].PesoIniziale+"&nbsp; - &nbsp;"+data[j].PesoFinale+"</td>";
                    tmp+="</tr>";
                    str[i] = str[i] + tmp;
                    $("#tatami"+i).append(tmp);
                }
            }
        }
        for(var i=1; i<=5; i++){
            if ($("#tatami"+i).html() == ""){
                    var tmp="<tr class='bg-danger'><td>Non ci sono ancora Categorie per questo tatami!</td><td></td><td></td></tr>";
                    $("#tatami"+i).html(tmp);
                }
        }
    })
}