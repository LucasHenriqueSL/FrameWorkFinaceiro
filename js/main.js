function salvarUsuario(){
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const status = "Ativo"

    const senha = document.getElementById('senha').value;

    if(nome == "" || endereco == "" || telefone == "" || email == "" ||senha == ""){
        Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos!',
            text: '',
            footer: ''
        })
    }
    else{
        localStorage.senha = document.getElementById('senha').value;
        const usuario = {id: Date.now(), nome, endereco, telefone, email, status};

        let usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
        if(usuarioGravado == null){
            window.localStorage.setItem("usuarios",JSON.stringify([]));
            usuarioGravado = JSON.parse(window.localStorage.getItem("usuarios"));
            usuarioGravado.push(usuario);
            window.localStorage.setItem('usuarios',JSON.stringify(usuarioGravado));
        }else{
            usuarioGravado.push(usuario);
            window.localStorage.setItem('usuarios',JSON.stringify(usuarioGravado));
        }

        limpar();
        Swal.fire({
            title: 'Cadastrado com sucesso!',
            icon: 'success',
            showCancelButton: false,
            ConfirmButtonText: 'OK'
          }).then(() => {
            window.location.href = 'indexLogin.html';
        });
        
    }
}

function logar(){
    email = document.getElementById('usuario').value;
   var senhal = document.getElementById('lsenha').value;
   var senha = localStorage.senha;

    let usuariosGravados = JSON.parse(window.localStorage.getItem("usuarios"));
    let usuarioIndex = usuariosGravados.findIndex(usuario => usuario.email == email);

    if(email == "" || senha == ""){
        Swal.fire({
            icon: 'warning',
            title: 'Preencha todos os campos!',
            showConfirmButton: false,
            timer: 1500
        });
    }
    else if(usuarioIndex == -1){
        Swal.fire({
            icon: 'warning',
            title: 'Email não cadastrado!',
            showConfirmButton: true,
            timer: 1500
        });
    }
    else{
        if(senhal != senha){
            Swal.fire({
                icon: 'warning',
                title: 'Senha incorreta!',
                showConfirmButton: true,
                timer: 1500
            });
        }else if(senhal == senha){
          window.location.href = 'menu.html';

          Toast.fire({
            icon: 'success',
            title: `Bem-Vindo ${usuariosGravados[usuarioIndex.nome]}`
            
           })
            

              }
              
        }
    }

function limpar(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

function Logout(){

}
/////////////////////////// Editar senha

function mostrar(){
  var senha = localStorage.senha;
  document.getElementById("sSenha").value = JSON.stringify(senha);

}

window.onload = mostrar;

function editarUsuario(){
    var senha = localStorage.senha;
    var nsenha = document.getElementById("nsenha").value;

    

    if(senha != nsenha){

      localStorage.senha = nsenha;
      Swal.fire({
      
        icon: 'success',
        title: 'Senha atualizada com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });

      var delay = 1550; 
  setTimeout(function(){
    window.location.reload()
          
  },delay);

    }else{
      Swal.fire({
        icon: 'warning',
        title: 'A senha que vc digitou é a mesma que aanterior, Porfavor digite uma nova',
        showConfirmButton: true,
        timer: 3000
    });

    }
    
   


  }

//////////////////////////

 