function cadlancamento(){
    const valor = document.getElementById('valorlancamentos').value;
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categoria').value;

    if(valor == "" || tipo == ""){
        Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos!',
            text: '',
            footer: ''
        })
    }
    else{
        const lancamento = {id: Date.now(), valor, tipo, categoria};

        let lancamentosGravadas = JSON.parse(window.localStorage.getItem('lancamento'));
        if(lancamentosGravadas == null){
            window.localStorage.setItem('lancamento',JSON.stringify([]));
            lancamentosGravadas = JSON.parse(window.localStorage.getItem('lancamento'));
            lancamentosGravadas.push(conta);
            window.localStorage.setItem('lancamento',JSON.stringify(lancamentosGravadas));
        }
        else{
            lancamentosGravadas.push(conta);
            window.localStorage.setItem('lancamento',JSON.stringify(lancamentosGravadas));
        }

        Limpar();
        Swal.fire({
            title: 'Cadastrado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            ConfirmButtonText: 'OK'
        });
        listarlancamentos();
    }
    
}
function listarlancamentos(){
    let lancamentosGravadas = JSON.parse(window.localStorage.getItem('lancamento'));
    linhalancamento = "";
    if(contasGravadas == "[]"){
        linhalancamento = ""
        row = document.getElementById('tbody');
        row.innerHTML = linhalancamento;
    }
    else{
        lancamentosGravadas.forEach(element => {
            row = document.getElementById('tbody');
            linhalancamento += "<tr style='width: 100%'>"+
                     "<td style='color: black;' id='tdid'>"+element.id +"</td>"+
                     "<td style='color: black;' id='tddescricao'>"+element.valor +"</td>"+
                     "<td style='color: black;' id='tdtipo'>"+element.tipo +"</td>"+
                     "<td style='color: black;' id='tdcategoria'>"+element.categoria +"</td>"+
                     "<td id='tdacoes'><button style='margin-right:2px' class='btn btn-outline-success' onclick='editarlancamento("+element.id+")'><i class='fa fa-edit'></i></button>"+
                     "<button class='btn btn-outline-danger'onclick='apagarlancamento("+element.id+")'><i class='fa fa-trash'></i></button></td>"
                     +"</tr>";
                    row.innerHTML = linhalancamento;
        })
    }
}
function apagarlancamento(id){
    Swal.fire({
        title: 'Confirmar a exclusão do lançamento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if(result.value){
            let lancamentosGravadas = JSON.parse(window.localStorage.getItem('lancamento'));
            let posicao = lancamentosGravadas.findIndex(lancamento => lancamento.id == id);
            lancamentosGravadas.splice(posicao,1);
            localStorage.setItem('lancamento', JSON.stringify(lancamentosGravadas));
            listarContas();
            if(window.localStorage.getItem('lancamento') == "[]"){
                window.location.reload('lancamentos.html');
            }
        }
    })
}
function ListarCatLancamento(){
    let Categorias = JSON.parse(localStorage.getItem('categorias'))
    let linhacad = "";
    Categorias.forEach(element => {
      let row = document.getElementById("categorias");
        linhacad += "<option value="+element.nome+">"+element.nome+"</option>"
        row.innerHTML = linhacad;
    });
}