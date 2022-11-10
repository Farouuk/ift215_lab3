function chargerproduit(){
    $.ajax({
        url: "../data/repo/produits.json",
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
        .append('<i class="bi bi-cart-plus"></i>')
    item_body.append(item_detail).append(item_logo);
    item_card.append(item_head).append(item_body);

    return $('<div></div>').addClass('col-md-3') .append(item_card);
}


document.addEventListener('DOMContentLoaded', (event) => {
    fetch('../data/repo/produits.json')
        .then(chargerproduit())
});

$(function () {
    console.log("ift215");
});
