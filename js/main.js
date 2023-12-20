var productName = document.getElementById('pName');
var productPrice = document.getElementById('pPrice');
var productCategory = document.getElementById('pCategory');
var productDesc = document.getElementById('pDesc');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');


var productContainer = [];

if (localStorage.getItem != null) {
   productContainer = JSON.parse(localStorage.getItem('products'))
   displayProduct(productContainer)
}

function AddProduct() {
   var errorMesg = validateProductForm()
   if (errorMesg == true) {
      var product = {
         name: productName.value,
         price: productPrice.value,
         category: productCategory.value,
         desc: productDesc.value
      }

      productContainer.push(product);
      localStorage.setItem("products", JSON.stringify(productContainer));
      displayProduct(productContainer);
      clearForm();

   }
   else {
      alert(errorMesg);
   }

}

function clearForm() {
   productName.value = ''
   productPrice.value = ''
   productCategory.value = ''
   productDesc.value = ''

}

function displayProduct(productContainer) {

   var cartoona = ``;

   for (var i = 0; i < productContainer.length; i++) {

      cartoona += `
       
      <tr>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].desc}</td>
      <td><button class="btn btn-warning" onclick="setFormForUpdate(${i})" >Update</button></td>
      <td><button class="btn btn-danger" onclick="deleteProduct(${i}) ">Delete</button></td>
    </tr>
    ` ;

   }
   document.getElementById('tableBody').innerHTML = cartoona;
}

function deleteProduct(productIndex) {
   productContainer.splice(productIndex, 1)
   localStorage.setItem("products", JSON.stringify(productContainer));
   displayProduct(productContainer);

}


function searchProduct(term) {

   var matchedProduct = [];

   for (var i = 0; i < productContainer.length; i++) {

      if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) === true) {

         matchedProduct.push(productContainer[i])
      }

   }
   console.log(matchedProduct);
   displayProduct(matchedProduct);

}


var currentIndex;

function setFormForUpdate(i) {
   currentIndex = i;
   addBtn.classList.replace('d-block', 'd-none');
   updateBtn.classList.replace('d-none', 'd-block');
   productName.value = productContainer[i].name;
   productPrice.value = productContainer[i].price;
   productCategory.value = productContainer[i].category;
   productDesc.value = productContainer[i].desc;


}

function updateProduct() {
   if (currentIndex !== null) {
      productContainer[currentIndex].name = productName.value
      productContainer[currentIndex].price = productPrice.value
      productContainer[currentIndex].category = productCategory.value
      productContainer[currentIndex].desc = productDesc.value;
      localStorage.setItem("products", JSON.stringify(productContainer));
      displayProduct(productContainer);
      clearForm();
   }
}


function validateProductForm() {

   var regexName = /^[A-Z][a-z]{3,8}$/;
   var regexPrice = /^[0-9]{2,}$/;
   var regexCategory = /^[a-z]{2,15}$/gi;

   if (regexName.test(productName.value) == false) {
 
      return 'Name Must be at least 3 chars'

   }
   else if (regexPrice.test(productPrice.value) == false) {
  
      return 'price Must be at least 2 number'
   }
   else if (regexCategory.test(productCategory.value) == false) {
   
      return 'Category Must be at least 2 chars'
   }

   return true;


}

















