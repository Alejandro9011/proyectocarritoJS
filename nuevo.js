
/* CODIGO FILTRO */
const busqueda = document.getElementById('busqueda');
busqueda.addEventListener('input', () => {
  const valorBusqueda = busqueda.value.toLowerCase().trim();

  const productos = contenedor.querySelectorAll('.informacion');
  productos.forEach(producto => {
    const nombre = producto.querySelector('h3').textContent.toLowerCase();
    if (nombre.includes(valorBusqueda)) {
      producto.parentElement.style.display = 'block';
    } else {
      producto.parentElement.style.display = 'none';
    }
    
  });
});
/* -----------------------------------------------------*/

const contenedor = document.querySelector(".contenedor");
const verCarrito=document.getElementById("verCarrito");
const modalContainer=document.getElementById("modal-container")
const cantidadCarrito =document.getElementById("cantidadCarrito")


let carrito= JSON.parse(localStorage.getItem("carrito")) || [];


const getProducts=  async () => {
  const response= await fetch ("data.json");
  const data= await response.json();
  productos.forEach((product)=>{
    
    



    let content = document.createElement("div")
    content.innerHTML = `
         <img src="${product.img}">
         <div class="informacion">
           <h3>${product.name}</h3>
            <p>${product.precio} $</p>
         </div>
   
    `;
    content.className= "contenido ";
    contenedor.append(content);
    
    let comprar=document.createElement("button");
    comprar.innerText="Comprar"
    comprar.className="botoncomprar"
    content.append(comprar)
     
     
    
    comprar.addEventListener("click",()=>{
     const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
     console.log(repeat);
     if(repeat) {
     carrito.map((prod) => {
       if(prod.id === product.id){
         prod.cantidad++;
       }
     })
     } else {
      carrito.push({
        id:product.id,
        img:product.img,
        name:product.name,
        precio:product.precio,
        cantidad:product.cantidad,
       
     });
   }
    
     carritoCounter();

     saveLocal();
    
    });
   
   });
      const saveLocal= () =>{
      localStorage.setItem("carrito",JSON.stringify(carrito));
      };
      JSON.parse(localStorage.getItem("carrito"));

     const pintarCarrito = ()=>{
     modalContainer.innerHTML="";
     modalContainer.style.display="flex";
   
     const modalHeader = document.createElement("div");
     modalHeader.className= "modal-header";
     modalHeader.innerHTML=`
     <h1 class="modal-header-tittle">Carrito</h1>
     
     `;
     modalContainer.append(modalHeader);
   
     const modalbutton = document.createElement("h1");
     modalbutton.innerText="x";
     modalbutton.className="modal-header-button";
     modalbutton.addEventListener("click",()=>{
       modalContainer.style.display="none";
   
     })
    
     modalHeader.append(modalbutton);
     
     carrito.forEach((product)=>{
     
     let carritoContent = document.createElement("div")
     carritoContent.innerHTML = `
       <img src="${product.img}">
        <div class="informacion">
          <span class="delete-product">✖️ </span>
           <h4>${product.name}</h4>
            <p>${product.precio} $</p>
             <div class=cantidades>
              <span class="restar"> - </span>
              <h5>Cantidad: ${product.cantidad}</h5> 
              <span class="sumar"> + </span>
             </div>
           <p>Total:${product.cantidad * product.precio} $</p>
         </div>

         
   
   
    `;
   
   
       modalContainer.append(carritoContent);
       let restar = carritoContent.querySelector(".restar")
       restar.addEventListener("click",() => {
        if(product.cantidad !==1) {
        product.cantidad--;
       }
       saveLocal()
        pintarCarrito()
       });
     
       let sumar = carritoContent.querySelector(".sumar")
       sumar.addEventListener("click",()=>{
        product.cantidad ++;
        saveLocal()
        pintarCarrito()
       })
      
      let eliminar=carritoContent.querySelector(".delete-product")
      eliminar.addEventListener("click",()=>{
        eliminarProducto(product.id);
      })
       
     });
   
   
     const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
     const totalBuying=document.createElement("div")
     totalBuying.className="total-content";
     totalBuying.innerHTML=`Total a pagar: ${total} $`;
     
     modalContainer.append(totalBuying);
   };
   
   window.addEventListener('beforeunload', function() {
     var modal = document.querySelector('.modal-container');
     modal.style.display = 'none';
   });
   
   verCarrito.addEventListener("click",pintarCarrito)
   const eliminarProducto = (id) => {
     const foundId=carrito.find((element) => element.id===id);
     carrito = carrito.filter((carritoId) => {
       return carritoId !== foundId;
   
     })
   
     carritoCounter();
     saveLocal();
     pintarCarrito();
   };
   
   const carritoCounter = () => {
     cantidadCarrito.style.display= "block";
     const carritoLength=carrito.length;
     localStorage.setItem("carritoLength",JSON.stringify(carritoLength));
     cantidadCarrito.innerText=JSON.parse(localStorage.getItem("carritoLength"))
   };
   carritoCounter();






  console.log(data)
};
getProducts()
  
 
  






 