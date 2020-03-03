const storeLocalUser = ({ name, email, token }) => {
  window.localStorage.setItem(
    "userInfo",
    JSON.stringify({
      name: name,
      email: email,
      token: token
    })
  );
}; //This function will store data on locaStorage

const cleanLocalUser = () => window.localStorage.removeItem("userInfo"); //This function will clean userInfo from localstorage

const generateURL = path => process.env.REACT_APP_API_ADDRESS + "/" + path;

function User() {
  this.loggedIn = false;
  this.name = null;
  this.email = null;
  this.token = null;

  //Se o usuário estiver logado, return true, senão, verifica se existe no localStorage
  // Caso exista, irá carregar os dados e então irá retornar true
  //caso contrario, retorna falso
  this.isUserLogegdIn = () => {
    if (!this.loggedIn) {
      let userInfo = window.localStorage.getItem("userInfo");
      if (userInfo) {
        this.loadUser(JSON.parse(userInfo));
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  //Na header dos requests vc vai mandar nos requests
  //Exemplo:
  //headers: {blabla: "blabla", ...getBearerHeader()}
  this.getBearerHeader = () => ({ Authorization: `Bearer ${this.token}` });

  this.loadUser = ({ token, name, email }) => {
    this.token = token;
    this.name = name;
    this.email = email;
    this.loggedIn = true;
    storeLocalUser({ name, email, token });
  };

  this.signUp = userInfo => {
    fetch(generateURL("signup"), {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        //Aqui você vai criptografar a informação que irá pra api da forma que foi implementado
        ...userInfo
      })
    })
      .then(res => res.json())
      .then(response => {
        //Aqui deve vir as informações de token do usuário.
        this.loadUser({
          token: response.token, //Considerando que vem o token como objeto dentro da resposta
          name: userInfo.name,
          email: userInfo.email
        });
      });
  };

  this.signIn = userInfo => {
    fetch(generateURL("signIn"), {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        //Aqui você vai criptografar a informação que irá pra api da forma que foi implementado
        ...userInfo
      })
    })
      .then(res => res.json())
      .then(response => {
        //Aqui deve vir as informações de token do usuário.
        this.loadUser({
          token: response.token, //Considerando que vem o token como objeto dentro da resposta
          name: userInfo.name, //Aqui vai depender do que vc usar no login
          email: userInfo.email //Aqui também.. hehe
        });
      });
  };

  this.logout = () => {
    this.loggedIn = false;
    this.name = null;
    this.email = null;
    this.token = null;
    cleanLocalUser();
  };
}

const user = new User();

export default user;
