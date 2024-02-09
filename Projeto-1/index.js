const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");

console.log("Iniciamos o account");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "criar conta",
          "consultar Saldo",
          "depositar valor",
          "Sacar",
          "sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "criar conta") {
        createAccount();
      } else if (action === "consultar Saldo") {
        getAccountBalance();
      } else if (action === "depositar valor") {
        deposit();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o accounts"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

// Criar conta
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher nosso banco"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da sua conta",
      },
      {
        name: "password",
        type: "password",
        message: "Digite sua senha",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      const password = answer["password"];
      console.info(password);
      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify({ balance: 0, password: password }),
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.bgGreen.black("Parabéns! Sua conta foi criada"));
      operation();
    })
    .catch((err) => console.log(err));
}

// Depositar
function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
      {
        name: "password",
        type: "password", // Alteração: definindo o tipo de input como senha
        message: "Digite sua senha",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      const password = answer["password"];

      // Verifica se a conta existe
      if (!check(accountName)) {
        console.log(chalk.bgRed.black("Esta conta não existe"));
        return deposit();
      }

      // Verifica se a senha está correta
      const accountData = getAccount(accountName);
      if (accountData.password !== password) {
        console.log(chalk.bgRed.black("Senha incorreta"));
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          addAmount(accountName, amount);
          operation();
        });
    })
    .catch((err) => console.log(err));
}

// Verificar conta
function check(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Esta conta não existe"));
    return false;
  }
  return true;
}

// Obter dados da conta
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

// Adicionar saldo à conta
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!")
    );
    return deposit();
  }

  accountData.balance += parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`)
  );
}

// Verificar saldo da conta
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!check(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${accountData.balance}`
        )
      );
      operation();
    });
}

// Sacar
function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!check(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
          operation();
        });
    });
}

// Remover saldo da conta
function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!")
    );
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Valor indisponível!"));
    return withdraw();
  }

  accountData.balance -= parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`)
  );
}
