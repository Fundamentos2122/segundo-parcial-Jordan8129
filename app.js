const temp_list =document.getElementById("ingredient-temp-list");
const ingredientname = document.getElementById("ingredient-name");
const inputgroup=document.getElementById("input-group");


const view =document.getElementById("view");

const form_recipe = document.getElementById("form-recipe");

let recipeList=[];
let templist=[];

var cont=0;
var contrecetas=0;


paintRecipeList();

function addIngrediente(){
    var html=
    `
    <li class="[ bg-white color-gray ]" id='${cont}'>
        ${ingredientname.value}
        <button class="close" type="button">X</button>
     </li>
    `;

    if(ingredientname.value!=""){
        temp_list.innerHTML+=html;
        templist.push(ingredientname.value);
        ingredientname.value="";
    }else{
        alert("Algun campo esta vacio");
    }

}



function agregarReceta(e){
    e.preventDefault();
    e.stopPropagation();

    var prueba=document.getElementsByTagName("input");
    var des=document.getElementsByTagName("textarea");


    var receta={
        id:contrecetas,
        title:prueba[0].value,
        img_url:prueba[1].value,
        description:des.value,
        ingredients:templist
    
    };

    console.log(receta);

    templist=[];
    prueba[0].value="";
    prueba[1].value="";
    des.value="";
    contrecetas++;


    GuardarReceta(receta);
    paintRecipeList();
 
}

function GuardarReceta(receta){
    recipeList.push(receta);

    var json=JSON.stringify(recipeList);

    localStorage.setItem("recetas",json);

    localStorage.setItem("receta_count",contrecetas);
}


function paintRecipeList(){
    view.innerHTML="";
    var html="";

    for(var i=0; i<recipeList.length;i++){
        html+=
        `
    <div class="[ row ] [ flex ]" data-state="wrap">
        <div class="[ col ]">
            <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${i.id}">
                <img src="${recipeList[i].img_url}" alt="">
                <div class="[ flow ]">
                    <h5>${recipeList[i].title}</h5>
                    <div class="[ flex ]" data-state="justify-between">
                        <button class="[ btn ]" data-state="white" onclick="getRecipe(${recipeList[i].id})">Ver</button>
                        <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${recipeList[i].id})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    }

    view.innerHTML=html;
}


function getRecipe(id){
    view.innerHTML="";
    var html=
    `
    <!-- <h1 class="[ color-primary ] [ text-center ]">Receta</h1>

    <div class="[ recipe ] [ flex ] [ shadow ]">
        <div class="recipe-img">
            <img src="${recipe.img_url}" alt="">
        </div>
        <div class="[ recipe-info ] [ flow ]">
            <h2>${recipe.title}</h2>
            <div class="[ text-justify ]">${recipe.description}</div>
            <h5>Ingredientes</h5>
            <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                <li>${i}</li>
            </ul>
        </div>
    </div>

    <div class="text-right">
        <button class="[ btn ]" data-state="primary" onclick="paintRecipeList()">Volver al listado</button>
    </div> -->
    `

}

function deleteRecipe(id){
    var view=document.getElementById(id);

    view.remove();
}

