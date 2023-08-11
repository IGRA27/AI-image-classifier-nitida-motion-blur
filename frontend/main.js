const thumbnails = document.getElementById("thumbnails");
const predecir = document.getElementById("predecir");
const formData = new FormData();
const datos = { nombre: "Ejemplo de archivo" };
const fileInput = document.getElementById("fileInput");
const img = new Image();
const title = document.getElementById("tilte");
const miDiv = document.getElementById("miDiv");
const divPredecir = document.getElementById("divPredecir");
const borrar = document.getElementById("borrar");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    img.src = reader.result;
    img.addEventListener("load", () => {
      console.log(
        `La imagen tiene un ancho de ${img.width} píxeles y una altura de ${img.height} píxeles.`
      );
    });
  });
  reader.addEventListener("load", (event) => {
    const thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail");
    thumbnail.src = event.target.result;
    thumbnails.appendChild(thumbnail);
  });
});

fetch("http://127.0.0.1:5000/inicio")
  .then((response) => response.json())
  .then((data) => {
    let contenidoHTML = "";
    contenidoHTML += `<h1>${data.message}</h1>`;
    console.log(data.message);
    miDiv.innerHTML = contenidoHTML;
  })
  .catch((error) => {
    console.error(error);
  });

predecir.addEventListener("click", () => {
  formData.append("image", fileInput.files[0]);
  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData,
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      let contenidoHTML = "";	
      contenidoHTML += `<h2>${data.prediction}</h2>`;
      divPredecir.innerHTML = contenidoHTML;
    })
    .catch((error) => console.error(error));
});

borrar.addEventListener("click", () => {
  location.reload();
})
