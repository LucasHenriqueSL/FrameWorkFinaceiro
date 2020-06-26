function cadCategoria(){
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    
    if (nome == ""){
        Swal.fire({
            icon: 'error',
            title: 'Informe o nome da categoria!',
            text: '',
            footer: ''
        })
    }
    else{
        const categoria = {id: Date.now(), nome};

        let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
        if(categoriasGravadas == null){
            window.localStorage.setItem('categorias',JSON.stringify([]));
            categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
            categoriasGravadas.push(categoria);
            window.localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
        }
        else{
            categoriasGravadas.push(categoria);
            window.localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
        }

        limpar();
        Swal.fire({
            title: 'Cadastrado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            ConfirmButtonText: 'OK'
        });
        listarCategorias();
    }
}

function listarCategorias(){
    let categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
    linhacategoria = "";
    if(categoriasGravadas == "[]"){
        linhacategoria = ""
        row = document.getElementById('tbody');
        row.innerHTML = linhacategoria;
    }
    else{
        categoriasGravadas.forEach(element => {
            row = document.getElementById('tbody');
            linhacategoria += "<tr style='width: 100%'>"+
                     "<td style='color: black;' id='tdid'>"+element.id +"</td>"+
                     "<td style='color: black;' id='tdnome'>"+element.nome +"</td>"+
                     "<td id='tdacoes'><button style='margin-right:2px' class='btn btn-outline-success' onclick='editarCategoria("+element.id+")'><i class='fa fa-edit'></i></button>"+
                     "<button class='btn btn-outline-danger'onclick='apagarCategoria("+element.id+")'><i class='fa fa-trash'></i></button></td>"
                     +"</tr>";
                    row.innerHTML = linhacategoria;
        })
    }
}

function apagarCategoria(id){
    Swal.fire({
        title: 'Confirmar a exclusão da categoria?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if(result.value){
            let categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
            let posicao = categoriasGravadas.findIndex(categoria => categoria.id == id);
            categoriasGravadas.splice(posicao,1);
            localStorage.setItem('categorias', JSON.stringify(categoriasGravadas));
            listarCategorias();
            if(window.localStorage.getItem('categorias') == "[]"){
                window.location.reload('cadcategoria.html');
            }
        }
    })
}

function editarCategoria(id){
    let categoriasGravadas = JSON.parse(window.localStorage.getItem("categorias"));
    for(i = 0; i < categoriasGravadas.length; i++){
        if(categoriasGravadas[i].id == id){
  
          document.getElementById("id").value = categoriasGravadas[i].id;
          document.getElementById("nome").value = categoriasGravadas[i].nome;
        }
   }
}

  function atualizar(){
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
  
    categoriasGravadas = JSON.parse(window.localStorage.getItem('categorias'));
    let categoriaIndex = categoriasGravadas.findIndex(categoria => categoria.id == id);
    if(categoriaIndex >= 0){
        categoriasGravadas[categoriaIndex] = {id,nome};
        window.localStorage.setItem('categorias',JSON.stringify(categoriasGravadas));
    }
    Swal.fire({
      
      icon: 'success',
      title: 'Categoria atualizada com sucesso!',
      showConfirmButton: false,
      timer: 1500
    });
    listarCategorias();
    Limpar()
  }



function Limpar(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

listarCategorias();