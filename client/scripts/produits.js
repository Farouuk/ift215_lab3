const TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac"

function chargerproduit(){
    $.ajax({
        url: "/produits",
        success: function(result) {
            console.log(result)
            $.each(result, function (key, value){
                item = item_to_html(value);
                $('#list_items').append(item);
            });
        }
    })


}

function item_to_html(item){
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li>Qte :' + item.qte_inventaire +'</li>')
        .append('<li>Categorie :' + item.categorie.nom +'</li><br>')
        .append('<li>' + item.description +'</li>')
    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');
    item_logo = $('<p></p>')
        .addClass('w-100 display-6 text-center')
        .append('<button type="button" class="btn btn-primary position-relative" onclick="add_item(3)">'+ '<i class="bi bi-cart-plus"></i>' + '</button>')
    item_body.append(item_detail).append(item_logo);
    item_card.append(item_head).append(item_body);

    return $('<div></div>').addClass('col-md-3') .append(item_card);
}


document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/produits')
        .then(chargerproduit())
});

$(function () {
    console.log("ift215");
});


function add_item (id_item){
    $.ajax({
        url: "/clients/"+ 1 +"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT) ;
        },
        success: function( result ) {
            getTotalPanier(result)
        }
    });
}

const getTotalPanier = (result) =>{
    let total = 0;
    for(let i = 0; i< result.items.length; i++){
        total += result.items[i].quantite
    }
    $('#item_counter').text(total)
}

$.ajax({
    url: "/clients/"+1+"/panier",
    method:"GET",
    beforeSend: function (xhr){
        xhr.setRequestHeader('Authorization', "Basic "+
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k");
    },
    success: function( result ) {
        for(let i = 0; i<result.items.length; i++) {
            if(result.items[i].quantite !== 0)
                $('.tablePanier').append(chargerPanier(result.items[i]))
        }
        $('.totalPanier').text(`Total: $${result.valeur.toFixed(2)}`)
    }
});

const chargerPanier = (obj) => {
    let total = obj.quantite * obj.prix
    return `<tr>
                <td class="panierElem">${obj.nomProduit}</td>
                <td class="panierElem">$${obj.prix}</td>
                <td class="panierElem">${obj.quantite}</td>
                <td class="panierElem">$${total.toFixed(2)}</td>
            </tr>`
}


