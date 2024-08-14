const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de e-mail
    auth: {
        user: 'flaviagenshinhutao@gmail.com',
        pass: 'zisdvoqvjnulusad'
    }
});

// Rota para receber dados do formulário
app.post('/submit', (req, res) => {
    const { nome, email, idade, regiao, outros, jogos } = req.body;

    // Verifica se jogos é um array, se não, cria um array vazio
    const jogosArray = Array.isArray(jogos) ? jogos : jogos ? [jogos] : [];

    // Configuração do e-mail de confirmação
    const mailOptions = {
        from: 'flaviagenshinhutao@gmail.com',
        to: email,
        subject: 'Confirmação de Inscrição',
        html: `
            <html>
            <body>
                <p>Olá ${nome},</p>
                <p class="welcome-text">Bem-vindo(a) à comunidade <strong>FURIA</strong>.</p>
                <p>Gostaríamos de informar que recebemos sua inscrição realizada por meio do e-mail ${email}.</p>
                <p>Para comemorar, estamos te enviando um código promocional de 10% de desconto em toda a loja da furia.gg com validade de 30 dias.</p>
                <p>Seu cupom é <strong>FURIA10</strong>. ;)</p>
                <p>Por aqui, sempre compartilharemos em primeira mão as novidades sobre os nossos produtos, conteúdos exclusivos, informações de campeonatos, jogos e muito mais!</p>
                <p>Vamos movimentar e conectar nossa comunidade! Siga-nos nas redes sociais e nos vemos em Summoner's Rift!</p>
                <p>Um abraço,</p>
                <p>Time Furia</p>
            </body>
            </html>
        `,
    };

    // Enviar e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).send('Erro ao enviar e-mail de confirmação');
            return;
        }
        res.send('Dados recebidos com sucesso e e-mail de confirmação enviado! <script>setTimeout(() => { window.location.href = "http://127.0.0.1:5500/index.html"; }, 3000);</script>');
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
