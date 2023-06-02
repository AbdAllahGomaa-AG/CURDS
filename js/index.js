// 1 - create Total
// 2 - create products
// 3 - clear input fields
// 4 - red
// 5 - delete
// 6 - deleteAll
// 7-count
//8-Update
//9-search

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ad = document.getElementById('ad')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('create')
let searchCategory = document.getElementById('searchCategory')
let searchTitle = document.getElementById('searchTitle')
let search = document.getElementById('search')

let mood = "create"
let temp;



//create Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +ad.value + +taxes.value) - +discount.value
        total.innerHTML = `${result} EGP`
        total.style.background = '#367E18'

    } else {
        total.innerHTML = ''
        total.style.background = '#B70404'
    }
}
//create products
let emptyArray;
if (localStorage.product != null) {
    emptyArray = JSON.parse(localStorage.product)
} else {
    emptyArray = []
}
create.addEventListener('click', function() {
    let newport = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ad: ad.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '') {
        if (mood === "create") {
            if (newport.count > 1) {
                for (let i = 0; i < newport.count; i++) {
                    emptyArray.push(newport);
                }

            } else {
                emptyArray.push(newport);

            }
        } else {
            emptyArray[temp] = newport
            mode = "create";
            create.innerHTML = "Create"
            count.style.display = "block"
            create.classList.remove("bg-warning")
            create.classList.add("bg-success")

        }
        clearData();
    }

    //sae localStorage
    localStorage.setItem("product", JSON.stringify(emptyArray));

    //clear input fields

    showDate();

})

//clear input fields
function clearData() {
    title.value = '',
        price.value = '',
        taxes.value = '',
        ad.value = '',
        discount.value = '',
        total.innerHTML = '',
        count.value = '',
        category.value = ''

}
//red
function showDate() {
    getTotal()
    let table = '';
    for (let i = 0; i < emptyArray.length; i++) {
        table += `
             <tr>
              <td>${i}</td>
                         <td>${emptyArray[i].title}</td>
                            <td>${emptyArray[i].price}</td>
                            <td>${emptyArray[i].taxes}</td>
                            <td>${emptyArray[i].ad}</td>
                            <td>${emptyArray[i].discount}</td>
                            <td>${emptyArray[i].total}</td>
                            <td>${emptyArray[i].count}</td>
                            <td>${emptyArray[i].category}</td>
                            <td><button  onclick="btnUpdate(${i})"  class="btn btn-outline-warning"><i
                                        class="fa-regular fa-pen-to-square   text-white"></i></button></td>
                            <td><button onclick="deleteProduct(${i})" id="trash" class="btn btn-outline-danger"><i
                                        class="fa-solid fa-trash  text-white"></i></button></td>
                        </tr> 

            `
    }
    document.getElementById("tablerow").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll")

    if (emptyArray.length > 0) {
        btnDelete.innerHTML = `
         <button onclick="clearAllDate()" class=" btn bg-danger w-100 pointer text-white rounded-2 mt-2 text-uppercase p-2">deleteAll (${emptyArray.length}) </button>
        `
    } else {
        btnDelete.innerHTML = ''
    }

}
showDate()
    //delete
function deleteProduct(i) {
    emptyArray.splice(i, 1);
    localStorage.product = JSON.stringify(emptyArray);
    showDate();

}
//deleteAll
function clearAllDate() {
    localStorage.clear()
    emptyArray.splice(0)
    showDate()
}

//Update
function btnUpdate(i) {
    title.value = emptyArray[i].title;
    price.value = emptyArray[i].price;
    taxes.value = emptyArray[i].taxes;
    ad.value = emptyArray[i].ad;
    discount.value = emptyArray[i].discount;
    getTotal()
    count.style.display = "none "
    category.value = emptyArray[i].category;
    create.innerHTML = "updateProduct"
    create.classList.remove("bg-success")
    create.classList.add("bg-warning")
    mood = 'update'
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}

//search
let searchMood = 'title'
searchCategory.addEventListener('click', function searchTitle(id) {
    let search = document.getElementById('search')

    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'search by category';
    } else {
        searchMood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
    search.value = '';
    showDate();

});

searchTitle.addEventListener('click', function searchCategory(id) {
    let search = document.getElementById('search')
    if (id == 'searchCategory') {
        searchMood = 'category';
        search.placeholder = 'search by category';
    } else {
        searchMood = 'title';
        search.placeholder = 'search by title';

    }
    search.focus();
    search.value = '';
    showDate();
});




search.addEventListener('keyup', function(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < emptyArray.length; i++) {
            if (emptyArray[i].title.includes(this.value.toLowerCase())) {
                table += `
             <tr>
              <td>${i}</td>
                <td>${emptyArray[i].title}</td>
                <td>${emptyArray[i].price}</td>
                <td>${emptyArray[i].taxes}</td>
                <td>${emptyArray[i].ad}</td>
                <td>${emptyArray[i].discount}</td>
                <td>${emptyArray[i].total}</td>
                <td>${emptyArray[i].count}</td>
                <td>${emptyArray[i].category}</td>
                <td><button  onclick="btnUpdate(${i})"  class="btn btn-outline-warning"><i
                class="fa-regular fa-pen-to-square   text-white"></i></button></td>
                <td><button onclick="deleteProduct(${i})" id="trash" class="btn btn-outline-danger"><i
                class="fa-solid fa-trash  text-white"></i></button></td>
            </tr> 
            `
            }
            document.getElementById("tablerow").innerHTML = table;
        }
    } else {
        for (let i = 0; i < emptyArray.length; i++) {
            if (emptyArray[i].category.includes(this.value.toLowerCase())) {
                table += `
             <tr>
              <td>${i}</td>
                <td>${emptyArray[i].title}</td>
                <td>${emptyArray[i].price}</td>
                <td>${emptyArray[i].taxes}</td>
                <td>${emptyArray[i].ad}</td>
                <td>${emptyArray[i].discount}</td>
                <td>${emptyArray[i].total}</td>
                <td>${emptyArray[i].count}</td>
                <td>${emptyArray[i].category}</td>
                <td><button  onclick="btnUpdate(${i})"  class="btn btn-outline-warning"><i
                                class="fa-regular fa-pen-to-square   text-white"></i></button></td>
                            <td><button onclick="deleteProduct(${i})" id="trash" class="btn btn-outline-danger"><i
                                        class="fa-solid fa-trash  text-white"></i></button></td>
                        </tr> 

            `
            }

        }
        document.getElementById("tablerow").innerHTML = table;

    }

})