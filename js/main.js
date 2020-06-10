function salvarUsuario(){
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const status = "Ativo"

    if(nome == "" || endereco == "" || telefone == "" || email == "" ||senha == ""){
        Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos!',
            text: '',
            footer: ''
        })
    }
    else{
        const usuario = {id: Date.now(), nome, endereco, telefone, email, senha, status};

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
    senha = document.getElementById('lsenha').value;

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
        if(usuariosGravados[usuarioIndex].senha != senha){
            Swal.fire({
                icon: 'warning',
                title: 'Senha incorreta!',
                showConfirmButton: true,
                timer: 1500
            });
        }else{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: `Bem-Vindo ${usuariosGravados[usuarioIndex.nome]}`
              })
              window.location.href = 'menu.html';
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