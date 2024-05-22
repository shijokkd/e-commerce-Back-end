async function applaycode(value){
    try{
        const response = await axios.post('/addcoupon', { coupon: value }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        if( !response.data){
            throw new Error("Error updating quantity");
        }
        if(response.status == 200){
            const response1 = response.data
            document.querySelector('.grandtotal').innerHTML=response1.disountprice
            document.querySelector('.disount').innerHTML=response1.discount+'%'
            document.querySelector('.totalprice').innerHTML=response1.totalprice

        }else{
            throw new Error("Quantity update failed: " + response.statusText);
        }

    }catch (error){
         console.log(error);
    }
}



async function orderplaced() {
    try {
        const response = await axios.post('/checkoutpost', {
            headers: {
                'Content-Type': 'application/json'
            }
        }, {
            timeout: 10000 // Timeout in milliseconds (e.g., 10 seconds)
        });

        if (response.status === 201) {
            
            // Redirect the user to the Razorpay payment page
            const { orderId } = response.data;
            const options = {
                key: YOUR_KEY_ID,
                amount: 1000, // amount in the smallest currency unit
                currency: "INR",
                name: "Your Company Name",
                description: "Purchase Description",
                order_id: orderId,
                handler: function (response) {
                    Swal.fire({
                        title: "ORDER PLACED",
                        text: "Your order is placed successfully.",
                        icon: "success"
                    }).then(() => {
                        // Redirect the user to the home page or some other page
                        window.location.href = '/home';
                    });
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#F37254"
                }
            };
            const rzp = new Razorpay(options);
            rzp.open();
        } else {
            throw new Error("Error placing order");
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: "There was an error placing your order. Please try again.",
            icon: "error"
        });
    }
}