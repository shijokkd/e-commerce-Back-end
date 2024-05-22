
function confirmDelete(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
        if (result.isConfirmed) {
            console.log(id);
            const response=await fetch(`/cartproductdelete?id=${id}`,{method:"delete"});
            console.log(response);
            if (!response.ok) {
                throw new Error("Error deleting product: " + response.statusText);
            }
            // const result = await response.json();
            if (response.status==200) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                });
                document.querySelector('.rows'+id).remove()
            } else {
                message.innerHTML = result.error || "Unknown error";
            }
        }
    });
}




async function quantityUpdate(id, quantity) {
    
 
    try {
        const response = await axios.post('/quantityUpdate', { id: quantity, quantity: id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
        if (!response.data) {   
            throw new Error("Error updating quantity");
        }
        if (response.status === 200) {
            const total = document.querySelector(`.newPrice${quantity}`)
            const totalPrice = total.innerHTML
            console.log(totalPrice);
            const quantity1 = document.querySelector(`.quantity${quantity}`).value 
            document.querySelector(`.total${quantity}`).innerHTML = parseInt(totalPrice) * parseInt(quantity1)
          console.log('dgfgsafdgagsa');
            const subtotal= document.querySelector('.subtotal').innerHTML

            console.log(subtotal);
           const gst= document.querySelector('.gst')
           gst.innerHTML = (parseInt(subtotal)*5)/100


        } else {
            throw new Error("Quantity update failed: " + response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
}







