/*jshint esversion: 6 */
//local store
if (!localStorage.getItem('goods')) {
    localStorage.setItem('goods', JSON.stringify(['sjdcgc', 'fjvhd', '123']));
}

var editNumber;
var goodsNumber = 0;

//Filter modeli pojazdu
var options = {
    valueNames: ['good_model']
};
var userList;

//Modal window add new good
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
});

//Save new
document.querySelector('button.add_new').addEventListener('click', function(e) {
    let name = document.getElementById('good_name').value;
    let model = document.getElementById('good_model').value;
    let year = document.getElementById('good_year').value;
    if (name && model && year) {
        document.getElementById('good_name').value = '';
        document.getElementById('good_model').value = '';
        document.getElementById('good_year').value = '2010';
        let goods = JSON.parse(localStorage.getItem('goods'));
        goodsNumber = goods.length;
        goods.push(['good_' + goodsNumber, name, model, year]);
        goodsNumber += 1;
        localStorage.setItem('goods', JSON.stringify(goods));
        update_goods();
        //Update window
        myModal.hide();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Please fill all fields!',
        });
    }
});



document.querySelector('.list').addEventListener('click', function(e) {
    if (!e.target.dataset.goods) {
        return;
    }
    let goods = JSON.parse(localStorage.getItem('goods'));
    for (let i = 0; i < goods.length; i++) {
        if (goods[i][0] == e.target.dataset.goods) {
            editNumber = i;
            document.getElementById('good_name1').value = goods[i][1];
            document.getElementById('good_model1').value = goods[i][2];
            document.getElementById('good_year1').value = goods[i][3];
            update_goods();
        }
    }
});


let myModal_edit = new bootstrap.Modal(document.getElementById('exampleModal_edit'), {
    keyboard: false
});
document.querySelector('button.add_new_1').addEventListener('click', function(e) {
    let name = document.getElementById('good_name1').value;
    let model = document.getElementById('good_model1').value;
    let year = document.getElementById('good_year1').value;

    if (name && model && year) {
        document.getElementById('good_name1').value = '';
        document.getElementById('good_model1').value = '';
        document.getElementById('good_year1').value = '2010';
        let goods = JSON.parse(localStorage.getItem('goods'));

        goods[editNumber][1] = name;
        goods[editNumber][2] = model;
        goods[editNumber][3] = year;

        localStorage.setItem('goods', JSON.stringify(goods));
        update_goods();
        //Update window
        myModal_edit.hide();
    } else {
        Swal.fire({
            icon: 'error1',
            title: 'Error!1',
            text: 'Please fill all fields!',
        });
    }
});





update_goods();
//add products
function update_goods() {
    let tbody = document.querySelector('.list');
    tbody.innerHTML = "";
    let goods = JSON.parse(localStorage.getItem('goods'));
    if (goods.length) {
        //table1.hidden = false
        for (let i = 0; i < goods.length; i++) {
            tbody.insertAdjacentHTML('beforeend',
                `
        <tr class="align-middle">
            <td class="good_name">${goods[i][1]}</td>
            <td class="good_model">${goods[i][2]}</td>
            <td class="good_year">${goods[i][3]}</td>
            <td><button class="good_delete btn-danger"  data-delete="${goods[i][0]}">&#10006;</button></td>
            <td><button class="good_delete btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_edit" data-goods="${goods[i][0]}">&#9998;</button></td>
        </tr>
        `);
        }
    }
    userList = new List('goods', options);
    document.querySelector('.list');
}

//deleting individual items
document.querySelector('.list').addEventListener('click', function(e) {
    if (!e.target.dataset.delete) {
        return;
    }
    Swal.fire({
        title: "Attention!",
        text: "Are you sure you want to delete the item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let goods = JSON.parse(localStorage.getItem('goods'));
            goodsNumber += 1;
            for (let i = 0; i < goods.length; i++) {
                if (goods[i][0] == e.target.dataset.delete) {
                    goods.splice(i, 1);
                    localStorage.setItem('goods', JSON.stringify(goods));
                    update_goods();

                }
            }
            Swal.fire(

                "Deleted!",
                "The selected item has been successfully deleted.",
                "Success"
            );
        }
    });
});