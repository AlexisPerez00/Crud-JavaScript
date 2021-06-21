let cars = [
  // {
  //   name: "Mazda 2",
  //   model: "2019",
  //   doors: 5,
  //   color: "red",
  //   brand: "mazda"
  // },
  // {
  //   name: "Sorento",
  //   model: "2018",
  //   doors: 5,
  //   color: "gris oscuro",
  //   brand: "Kia"
  // },
  // {
  //   name: "Vento",
  //   model: "2020",
  //   doors: 4,
  //   color: "blanco",
  //   brand: "Volkswagen"
  // },
  // {
  //   name: "Cheyenne",
  //   model: "2015",
  //   doors: 4,
  //   color: "verde oscuro",
  //   brand: "Chevrolet"
  // }
]
let updateFlag = false;
let updateIndex = null;

let userListUI = document.getElementById("userList");
const userForm = document.getElementById("formCar");

let localCarsList = JSON.parse(localStorage.getItem("carStorage"))

const userStorage = () => {
  if(typeof Storage !== "undefined" ) {
    localStorage.setItem("carStorage", JSON.stringify(cars))
  }
  else {
    alert("tu navegador no es compatible con el localStorage")
  }
}

const renderList = () => {
  userListUI.innerHTML = "";
  userListArray = JSON.parse(localStorage.getItem("carStorage"))
  if(userListArray === null) {
  userListArray = [];
  }
  else {

  userListArray.forEach((car, index) => {
    const userItemDiv = document.createElement("div");
    userItemDiv.setAttribute("class", "userItem");
    userListUI.appendChild(userItemDiv);

    const userInfoDiv = document.createElement("div");
    userInfoDiv.setAttribute("class", "userInfo");
    userItemDiv.appendChild(userInfoDiv);

    const nameCarDiv = document.createElement("h4");
    const modelCarDiv = document.createElement("h4");
    const doorCarDiv = document.createElement("h4");
    const colorCarDiv = document.createElement("h4");
    nameCarDiv.innerText = `${car.name} (${car.brand}) `;
    modelCarDiv.innerText = `año ${car.model} `;
    doorCarDiv.innerText = `${car.doors} puertas `;
    colorCarDiv.innerText = `${car.color} `;


    userInfoDiv.appendChild(nameCarDiv);
    userInfoDiv.appendChild(modelCarDiv);
    userInfoDiv.appendChild(doorCarDiv);
    userInfoDiv.appendChild(colorCarDiv);

    const actionButtons = document.createElement("div");
    actionButtons.setAttribute("class", "actions");
    userItemDiv.append(actionButtons);

    const updateBtn = document.createElement("button");

    updateBtn.setAttribute("class", "update");
    updateBtn.addEventListener("click", () => updateCar(index, car));
    updateBtn.setAttribute("id", "update");
    updateBtn.innerText = "Editar";

    const deleteBtn = document.createElement("button");

    deleteBtn.setAttribute("class", "delete");
    deleteBtn.addEventListener("click", () => deleteCar(index));
    deleteBtn.innerHTML = "Eliminar";
    deleteBtn.setAttribute("id", "delete");

    actionButtons.appendChild(updateBtn);
    actionButtons.appendChild(deleteBtn);
  });
}
};


const createUpdateCar = event => {
  event.preventDefault();

  if (updateFlag) {
    let updatedCars = {
      name: document.getElementById("name").value, 
      model: document.getElementById("modelo").value,
      doors: document.getElementById("puertas").value,
      color: document.getElementById("color").value,
      brand: document.getElementById("marca").value
    };

    cars[updateIndex] = updatedCars;
    console.log(updatedCars)

    updateFlag = false;
    updateIndex = null;
    userStorage();
    renderList();
  } else {
    let car = {
      name: document.getElementById("name").value,
      model: document.getElementById("modelo").value,
      doors: document.getElementById("puertas").value,
      color: document.getElementById("color").value,
      brand: document.getElementById("marca").value
    };
    if(localCarsList === null) {
      localCarsList = []
    }
    cars.push(...localCarsList, car);
    userStorage()
    renderList();
  }

  userForm.reset();
};

const updateCar = (index, car) => {
  document.getElementById("name").value = car.name;
  document.getElementById("modelo").value = car.model;
  document.getElementById("puertas").value = car.doors;
  document.getElementById("color").value = car.color;
  document.getElementById("marca").value = car.brand;

  updateFlag = true;
  updateIndex = index;
};

const deleteCar = index => {
  cars = JSON.parse(localStorage.getItem("carStorage"));
  cars.splice(index, 1);
  userStorage()
  renderList();
};

userForm.addEventListener("submit", createUpdateCar);
document.addEventListener("DOMContentLoaded", renderList);