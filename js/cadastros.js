function cadCategoria(){
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
    }
}

function cadConta(){
    const descricao = document.getElementById('descricao').value;
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categorias').value;

    if(descricao == "" || tipo == "" || categoria == ""){
        Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos!',
            text: '',
            footer: ''
        })
    }
    else{
        const conta = {id: Date.now(), descricao, categoria};

        let contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
        if(contasGravadas == null){
            window.localStorage.setItem('contas',JSON.stringify([]));
            contasGravadas = JSON.parse(window.localStorage.getItem('contas'));
            contasGravadas.push(conta);
            window.localStorage.setItem('contas',JSON.stringify(contasGravadas));
        }
        else{
            contasGravadas.push(conta);
            window.localStorage.setItem('contas',JSON.stringify(contasGravadas));
        }

        Limpar();
        Swal.fire({
            title: 'Cadastrado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            ConfirmButtonText: 'OK'
        });
    }
}

function Limpar(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}