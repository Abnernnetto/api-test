const request = require('supertest');
const rota = "http://localhost:3000";


describe('Suite de testes API Users', () => {

    const json_arquivo_cadastro_usuario = {
        nome: "Novo usuario",
        telefone: "(51) 999998877",
        email: "novonovo@gmail.com",
        senha: "1234"
    }

    it('Consulta todos os usuários...deve retornar status 200.', async() => {

        const response = await request(rota)
            .get('/users');
        expect(response.status).toBe(200);

    });

    it('Consulta todos atividades...deve retornar status 200.', async() => {

        const response = await request(rota)
            .get('/activities');
        expect(response.status).toBe(200);

    });

    it('Deve cadastrar um novo usuário e retornar status 200.', async() => {

        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario);
        expect(response.status).toBe(200);

    });

    it('Quando cadastrar um usuário que esteja na base, deve retornar 422', async() => {
        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario);
            expect(response.status).toBe(422)

    })

    it('Deve cadastrar um novo usuário e retornar status 200.', async() => {
        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(json_arquivo_cadastro_usuario);
            console.log(response.body)
    })
});
