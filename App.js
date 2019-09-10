import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';

export default class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { pontuacao: 0 };
  // }
  //antes de ser renderizado
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyCdJdNKqnrYNqYAURuWdQA5xaRMWrL8SK0",
      authDomain: "configuracaofirebasereact0.firebaseapp.com",
      databaseURL: "https://configuracaofirebasereact0.firebaseio.com",
      projectId: "configuracaofirebasereact0",
      storageBucket: "configuracaofirebasereact0.appspot.com",
      messagingSenderId: "445881753816"
    };
    firebase.initializeApp(config);
  }

  cadastrarUsuario() {
    var email = "04luccaplay@gmail.com";
    var senha = "luccasenha";

    const usuario = firebase.auth();
    usuario.createUserWithEmailAndPassword(
      email, 
      senha
    ).catch(
      (erro) => {
        var mensagemErro = '';

        if( erro.code == "auth/weak-password" ){
          mensagemErro = 'A senha precisa ter no minímo 6 caracteres!';
        }

        Alert.alert( "Erro", mensagemErro + erro.message );
      }
    );
  }

  verificarUsuarioLogado() {
    const usuario = firebase.auth();
    usuario.onAuthStateChanged(
      (usuarioAtual) => {
        if( usuarioAtual ) {
          Alert.alert( "Atenção", "Usuário está logado" );
        } else {
          Alert.alert( "Atenção", "Usuário não está logado" );
        }
      }
    );
    // const usuarioAtual = usuario.currentUser;
    // if( usuarioAtual ) {
    //   Alert.alert( "Atenção", "Usuário está logado" );
    // } else {
    //   Alert.alert( "Atenção", "Usuário não está logado" );
    // }
  }

  logoutUsuario() {
    const usuario = firebase.auth();
    usuario.signOut();
  }

  loginUsuario() {
    var email = "04luccaplay@gmail.com";
    var senha = "luccasenha";

    const usuario = firebase.auth();
    usuario.signInWithEmailAndPassword(
      email, 
      senha
    ).catch(
      (erro) => {
        var mensagemErro = '';

        if( erro.code == "auth/invalid-email" ){
          mensagemErro = 'E-mail invalido!';
        }

        if( erro.code == "auth/user-disabled" ){
          mensagemErro = 'Usuário desabilitado, entre em contato para saber mais!';
        }

        if( erro.code == "auth/user-not-found" ){
          mensagemErro = 'Usuário não encontrado!';
        }

        if( erro.code == "auth/wrong-password" ){
          mensagemErro = 'Senha incorreta!';
        }

        Alert.alert( "Erro", mensagemErro );
      }
    );
  }

  // manterDados() {
  //   var funcionarios = firebase.database().ref("funcionarios");
  //   funcionarios.push().set({
  //     nome: 'Leonardo',
  //     sobrenome: 'Lopes',
  //     peso: '80KG',
  //     idade: '26'
  //   });
  //   //funcionarios.remove();
  //   //database.ref("pontuacao").remove();
  // }

  // listarDados() {
  //   var pontuacao = firebase.database().ref('pontuacao');
  //   pontuacao.on('value', (snapshot) => {
  //     var pontos = snapshot.val();
  //     this.setState({ pontuacao: pontos });
  //   });
  // }

  render() {

    return (
      <View>
        <Button 
          onPress={ () => { this.cadastrarUsuario(); } }
          title="Cadastrar Usuário"
          color="#841584"
          accessibilityLabel="Cadastrar Usuário"
        />

        <Button 
          onPress={ () => { this.verificarUsuarioLogado(); } }
          title="Verificar Usuário Logado"
          color="#841584"
          accessibilityLabel="Verificar Usuário Logado"
        />

        <Button 
          onPress={ () => { this.logoutUsuario(); } }
          title="Logout do usuário"
          color="#841584"
          accessibilityLabel="Logout do usuário"
        />

        <Button 
          onPress={ () => { this.loginUsuario(); } }
          title="Login do usuário"
          color="#841584"
          accessibilityLabel="Login do usuário"
        />

      </View>
    );
  }
} 