
// DOM elements
let itemInput = document.getElementById('item');
let priceInput = document.getElementById('price');
let quantityInput = document.getElementById('quantity');
let form = document.querySelector('form');
let tbody = document.querySelector('tbody');
let template = document.querySelector('template');



let editIndex = -1 // For the Edit Button
let total = 0 //For get the Grand Total
let noOfData = 0 //For displpay the no of items
let del //Get the total of delete item
let delCount = 0 // delete count


let data = [];

// Add event listener to form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form submission and page reload

    // Validate inputs
    if (itemInput.value.trim() && priceInput.value.trim() && quantityInput.value.trim()) {
        let item = itemInput.value;
        let price = parseFloat(priceInput.value);
        let quantity = parseInt(quantityInput.value);
    

        if(editIndex === -1){
        let record = { item, price, quantity, total: price * quantity };
        data.push(record);
        noOfData+=1
    
        }else{
        data [editIndex] = {item,price,quantity,total: price * quantity}
        editIndex = -1
    }
        // Display data in table
        displayData();
        noOfCount()
        grandTotal()
        
        // Clear form fields
        itemInput.value = '';
        priceInput.value = '';
        quantityInput.value = '';
    } else {
        alert("Please enter all fields!");
    }
});

// Function to display the data in the table
function displayData() {
    tbody.innerHTML = '';  // Clear previous rows

    data.forEach((record, index) => {
        let row = template.content.cloneNode(true);  // Clone the template

        row.querySelector('.count').textContent = index + 1;
        row.querySelector('.name').textContent = record.item;
        row.querySelector('.rate').textContent = record.price;
        row.querySelector('.qty').textContent = record.quantity;
        row.querySelector('.total').textContent = record.total;

        // Attach event listeners to delete and edit buttons
        row.querySelector('.delete').addEventListener('click', () => deleteRecord(index));
        row.querySelector('.edit').addEventListener('click', () => editRecord(index));

        




        tbody.appendChild(row);  // Append row to table body
})

}


function deleteRecord(index){
    del = data[index].total
    data.splice(index,1)
noOfData-=1
delCount++
displayData();
noOfCount()
grandTotal()

}

function editRecord(index){

itemInput.value = data[index].item
priceInput.value = data[index].price
quantityInput.value = data[index].quantity
editIndex = index


}

// Get No Of the items.
function noOfCount(){
 document.getElementById('itemTypes').innerHTML = noOfData   

}

//Get the Full Total 
function grandTotal(){
     
    if(data == ''){
        document.getElementById('grandTotal').innerHTML = 0
    }else{
        total = 0
        data.forEach((record, index)=>{
            total = record.total + total
            
        })
    document.getElementById('grandTotal').innerHTML = total
        
    }
}


document.getElementById('clearBtn').addEventListener('click',()=>{
data =  []
noOfData = 0
total = 0

displayData()
grandTotal()
noOfCount()

})


document.getElementById('printBtn').addEventListener('click',()=>{



window.print(displayData())



})