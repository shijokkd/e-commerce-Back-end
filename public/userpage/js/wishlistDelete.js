
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
                const response=await fetch(`/wishlistdelete?id=${id}`,{method:"delete"});
                console.log(response);
                if (!response.ok) {
                    throw new Error("Error deleting product: " + response.statusText);
                }
                // const result = await response.json();
                if (response.status==200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    document.querySelector('.rows'+id).remove()
                } else {
                    message.innerHTML = result.error || "Unknown error";
                }
            }
        });
   }
