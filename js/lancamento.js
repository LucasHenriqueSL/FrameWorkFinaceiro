let receita = 0
let despesa = 0
let qreceita = 0
let qdespesa = 0
let i = 0 

function cadlancamento(){
    const descricao = document.getElementById('desclancamentos').value;
    const conta = document.getElementById('contalancamentos').value;
    const valor = document.getElementById('valorlancamentos').value;
    const data = document.getElementById('datalancamentos').value;
    const hora = document.getElementById('horalancamentos').value;


    if(descricao == "" || conta == "" || valor == "" || data == "" || hora == ""){
        Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos!',
            text: '',
            footer: ''
        })
    }
    else{
        
        const lancamento = {id: Date.now(), descricao, conta, valor, data, hora};

        let lancamentosGravados = JSON.parse(window.localStorage.getItem('lancamentos'));
        if(lancamentosGravados == null){
            window.localStorage.setItem('lancamentos',JSON.stringify([]));
            lancamentosGravados = JSON.parse(window.localStorage.getItem('lancamentos'));
            lancamentosGravados.push(lancamento);
            window.localStorage.setItem('lancamentos',JSON.stringify(lancamentosGravados));
        }
        else{
            lancamentosGravados.push(lancamento);
            window.localStorage.setItem('lancamentos',JSON.stringify(lancamentosGravados));
        }

        Limpar();
        Swal.fire({
            title: 'Cadastrado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            ConfirmButtonText: 'OK'
        });
        listarlancamentos();
        window.location.reload('lancamentos.html');
    }
    
}
function listarlancamentos(){
    let lancamentosGravados = JSON.parse(window.localStorage.getItem('lancamentos'));
    linhalancamento = "";
    if(lancamentosGravados == "[]"){
        linhalancamento = ""
        row = document.getElementById('tbody');
        row.innerHTML = linhalancamento;
    }
    else{
        lancamentosGravados.forEach(element => {
            row = document.getElementById('tbody');
            linhalancamento += "<tr style='width: 100%'>"+
                     "<td style='color: black;' id='tdid'>"+element.id +"</td>"+
                     "<td style='color: black;' id='tddescricao'>"+element.descricao +"</td>"+
                     "<td style='color: black;' id='tdconta'>"+element.conta +"</td>"+
                     "<td style='color: black;' id='tdvalor'>"+element.valor +"</td>"+
                     "<td style='color: black;' id='tddata'>"+element.data +"</td>"+
                     "<td style='color: black;' id='tdhora'>"+element.hora +"</td>"+
                     "<td id='tdacoes'><button style='margin-right:2px' class='btn btn-outline-success' onclick='editarlancamento("+element.id+")'><i class='fa fa-edit'></i></button>"+
                     "<button class='btn btn-outline-danger'onclick='apagarlancamento("+element.id+")'><i class='fa fa-trash'></i></button></td>"
                     +"</tr>";
                    row.innerHTML = linhalancamento;
        })
    }
    CalcularLancamentos();
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
            let lancamentosGravados = JSON.parse(window.localStorage.getItem('lancamentos'));
            let posicao = lancamentosGravados.findIndex(lancamento => lancamento.id == id);
            lancamentosGravados.splice(posicao,1);
            localStorage.setItem('lancamentos', JSON.stringify(lancamentosGravados));
            listarlancamentos();
            if(window.localStorage.getItem('lancamentos') == "[]"){
                window.location.reload('lancamentos.html');
            }
            window.location.reload('lancamentos.html');
        }
    })
    
}
function ListarContasLancamento(){
    let Contas = JSON.parse(localStorage.getItem('contas'))
    let linhacad = "";
    Contas.forEach(element => {
      let row = document.getElementById("contalancamentos");
        linhacad += "<option value="+element.tipo+">"+element.descricao+"</option>"
        row.innerHTML = linhacad;
    });
}

function editarlancamento(id){
    let lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
    for(i = 0; i < lancamentosGravados.length; i++){
        if(lancamentosGravados[i].id == id){
  
          document.getElementById("id").value = lancamentosGravados[i].id;
          document.getElementById("desclancamentos").value = lancamentosGravados[i].descricao;
          document.getElementById("contalancamentos").value = lancamentosGravados[i].conta;
          document.getElementById("valorlancamentos").value = lancamentosGravados[i].valor;
          document.getElementById("datalancamentos").value = lancamentosGravados[i].data;
          document.getElementById("horalancamentos").value = lancamentosGravados[i].hora;
  
        }
   }
}
  

  function Alterar(){
    const id = document.getElementById('id').value;
    const descricao = document.getElementById('desclancamentos').value;
    const conta = document.getElementById('contalancamentos').value;
    const valor = document.getElementById('valorlancamentos').value;
    const data = document.getElementById('datalancamentos').value;
    const hora = document.getElementById('horalancamentos').value;
  
    lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
    let lancamentoindex = lancamentosGravados.findIndex((lancamento => lancamento.id == id));
    if(lancamentoindex >= 0){
        lancamentosGravados[lancamentoindex] = {id,descricao,conta,valor,data,hora};
        window.localStorage.setItem("lancamentos",JSON.stringify(lancamentosGravados));
    }
    Swal.fire({
  
      icon: 'success',
      title: 'Lançamento atualizado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    });
    limpar();
    listarlancamentos();
    window.location.reload('lancamentos.html');
}

function Limpar(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

function CalcularLancamentos(){
   
    lancamentosGravados = JSON.parse(window.localStorage.getItem("lancamentos"));
    i = 0;
    while(i < lancamentosGravados.length){
        if(lancamentosGravados[i].conta == "Despesas"){
            despesa += parseInt(lancamentosGravados[i].valor);
            i++
            document.getElementById('labeldespesas').innerHTML = despesa.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        }else if(lancamentosGravados[i].conta == "Receitas"){
            receita += parseInt(lancamentosGravados[i].valor);
            i++
            document.getElementById('labelreceitas').innerHTML = receita.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        }
    }

        let saldo = receita - despesa
        document.getElementById('labelsaldo').innerHTML = saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        if(saldo <= 0){
          document.getElementById('labelsaldo').style.color = '#fc0303'
        }else{
          document.getElementById('labelsaldo').style.color = '#13a100'
        }
    
}

ListarContasLancamento();
listarlancamentos();