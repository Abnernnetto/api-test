const request = require('supertest');
const rota = "http://localhost:3000";



describe("Suite de testes CONTEUDOS CRUD - POST, GET, PUT e DELETE", () => {

    let idConteudo;
	
    let json_cadastro_conteudo = {
        titulo: "AAAA",
        descricao: "(51) 999998877",
        tipoConteudo: "novoaaaa@gmail.com",
        conteudo: "12345"
    }

    it('Deve cadastrar um novo conteudo e retornar status 201.', async() => {

        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo);
            idConteudo = response.body.id;
            expect(response.status).toBe(201);
            const { id, titulo, descricao, tipoConteudo, conteudo } = response.body;
		    expect(id).toBeDefined();
		    expect(titulo).toBe(json_cadastro_conteudo.titulo);
		    expect(descricao).toBe(json_cadastro_conteudo.descricao);
		    expect(tipoConteudo).toBe(json_cadastro_conteudo.tipoConteudo);
            expect(conteudo).toBe(json_cadastro_conteudo.conteudo);
		    expect(response.body.dataCadastro).toBeDefined();
		    console.log("Conteúdo cadastrado: ", response.body);

    });
    
    it('Deve consultar o ultimo conteudo cadastrado e retornar o status 200.', async() => {

        const response = await request(rota)
            .get(`/conteudos/${idConteudo}`);
            expect(response.status).toBe(200);
		    const { id, titulo, descricao, tipoConteudo, conteudo, dataCadastro } = response.body;
		    expect(id).toBe(idConteudo);
		    expect(titulo).toBe(json_cadastro_conteudo.titulo);
		    expect(descricao).toBe(json_cadastro_conteudo.descricao);
		    expect(tipoConteudo).toBe(json_cadastro_conteudo.tipoConteudo);
		    expect(conteudo).toBe(json_cadastro_conteudo.conteudo);
		    expect(dataCadastro).toBeDefined();

    });

    it('Deve alterar o conteudo consultado e retonar o status 201.', async() => {
        
        const json_cadastro_conteudoAlterado = {
			titulo: "AAAABBBB",
            descricao: "(51) 999998811",
            tipoConteudo: "novobbb@gmail.com",
            conteudo: "1111"
		};

        const response = await request(rota)
            .put(`/conteudos/${idConteudo}`)
            .send(json_cadastro_conteudoAlterado);
            expect(response.status).toBe(201);
		    const { id, titulo, descricao, tipoConteudo, conteudo, dataCadastro } = response.body;
		    expect(id).toBe(idConteudo);
		    expect(titulo).toBe(json_cadastro_conteudoAlterado.titulo);
		    expect(descricao).toBe(json_cadastro_conteudoAlterado.descricao);
		    expect(tipoConteudo).toBe(json_cadastro_conteudoAlterado.tipoConteudo);
		    expect(conteudo).toBe(json_cadastro_conteudoAlterado.conteudo);
		    console.log("Conteúdo alterado: ", response.body);
    })

    it('Deve remover o conteudo cadastrado e retornar o status 200.', async() => {
        const response = await request(rota)
            .delete(`/conteudos/${idConteudo}`);
            expect(response.status).toBe(200);
            console.log("Conteúdo deletado: ", response.body);
        
        const responseAtual = await request(rota)
            .get(`/conteudos/${idConteudo}`);
            expect(responseAtual.status).toBe(404);
            console.log("Conteudo não encontrado: ", responseAtual.body);
        
    })

})

describe("Suite de testes CONTEUDOS - POST", () => {
    
    let json_cadastro_conteudo = {
        titulo: "POST A",
        descricao: "(51) 999991111",
        tipoConteudo: "post@gmail.com",
        conteudo: "9911"
    }

    let json_cadastro_com_valores_invalidos = {
        titulo: "",
        descricao: "",
        tipoConteudo: "",
        conteudo: ""
    }

    let json_cadastro_conteudo_com_mais_dados = {
        titulo: "POST B",
        descricao: "(51) 999992222",
        tipoConteudo: "postmaior@gmail.com",
        conteudo: "991199"
    }

    let json_cadastro_conteudo_sem_titulo = {
        descricao: "(51) 999992222",
        tipoConteudo: "postmaior@gmail.com",
        conteudo: "991199"
    }

    let json_cadastro_conteudo_com_titulo_nulo = {
        titulo: null,
        descricao: "(51) 999992222",
        tipoConteudo: "postmaior@gmail.com",
        conteudo: "991199"
    }

    let json_cadastro_conteudo_com_titulo_vazio = {
        titulo: "",
        descricao: "(51) 999992222",
        tipoConteudo: "postmaior@gmail.com",
        conteudo: "991199"
    }

    let json_cadastro_conteudo_sem_descricao = {
        titulo: "POST B",
        tipoConteudo: "postmaior@gmail.com",
        conteudo: "991199"
    }

    let json_cadastro_conteudo_sem_tipoConteudo = {
        titulo: "POST B",
        descricao: "(51) 999992222",
        conteudo: "991199"
    }

    let json_cadastro_conteudo_sem_conteudo = {
        titulo: "POST B",
        descricao: "(51) 999992222",
        tipoConteudo: "postmaior@gmail.com"
    }

    //Documentação - POST
    it("Deve cadastrar um novo conteudo e retornar status code 201", async () => {
        let idConteudo;


        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo);
            idConteudo = response.body.id;
	
        expect(response.status).toBe(201);
        const { id, titulo, descricao, tipoConteudo, conteudo } = response.body;
        expect(titulo).toBe(json_cadastro_conteudo.titulo);
		    expect(descricao).toBe(json_cadastro_conteudo.descricao);
		    expect(tipoConteudo).toBe(json_cadastro_conteudo.tipoConteudo);
            expect(conteudo).toBe(json_cadastro_conteudo.conteudo);
		    expect(response.body.dataCadastro).toBeDefined();
		    console.log("Conteúdo cadastrado: ", response.body);
    })

    it("Deve informar campos a mais do que o esperado e retornar status code 422", async () => {

        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_com_mais_dados);

	

        console.log(response.body)    
        expect(response.status).toBe(422);
        const { error } = response.body;
        expect(error).toBe("Campos extras encontrados: id, dataCadastro")
		
    })

    //Exploratórios - POST
    it("Deve validar resposta sem o campo titulo", async () => {

        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_sem_titulo);
            
        console.log(response.body)
        expect(response.status).toBe(422);
        expect(response.body.error).toBe("Os seguintes campos são obrigatórios: titulo")
        
    })

    it("Deve validar resposta sem o campo descricao", async () => {

        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_sem_descricao);
            
        console.log(response.body)
        expect(response.status).toBe(422);
        expect(response.body.error).toBe("Os seguintes campos são obrigatórios: descricao")
        
    })

    it("Deve validar resposta sem o campo tipoConteudo", async () => {

        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_sem_tipoConteudo);
            
        console.log(response.body)
        expect(response.status).toBe(422);
        expect(response.body.error).toBe("Os seguintes campos são obrigatórios: tipoConteudo")
        
    })

    it("Deve validar resposta sem o campo conteudo", async () => {

        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_sem_conteudo);
            
        console.log(response.body)
        expect(response.status).toBe(422);
        expect(response.body.error).toBe("Os seguintes campos são obrigatórios: conteudo")
        
    })

    //Campo tittlo - nulo, vazio
    it("Deve validar o campo titulo com valor nulo", async () => {
        
        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_com_titulo_nulo);
            
	
        expect(response.status).toBe(422);
        console.log(response.body)
        expect(response.body.error).toBe("Os seguintes campos são obrigatórios: titulo")

      
    })

    it("Deve validar o campo titulo com valor vazio", async () => {
        
        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_com_titulo_vazio);
            
	
        expect(response.status).toBe(422);
        console.log(response.body)
        expect(response.body.error).toBe("Os seguintes campos são obrigatórios: titulo")

      
    })

    //Segurança
    it.only("Validar dados sensíveis exibidos onde espera-se status code 400", async () => {
        
        const response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_com_valores_invalidos)
            console.log(response.body)
            expect(response.status).toBe(400)
            

    })


})

describe("Suite de teste CONTEUDOS - GET", () => {

    let json_cadastro_conteudo_get = {
        titulo: "Aget",
        descricao: "(51) 999995555",
        tipoConteudo: "get@gmail.com",
        conteudo: "12345"
    }

        //Documentação - GET
        it('Deve retornar a lista de todos os conteudos e retornar status code 200.', async() => {

            let response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_get);
            idConteudo = response.body.id;

            response = await request(rota)
                .get(`/conteudos/${idConteudo}`);
                expect(response.status).toBe(200);
                console.log(response.body)
                const { descricao, tipoConteudo, conteudo, dataCadastro } = response.body;
                expect(response.body.descricao).toBe(json_cadastro_conteudo_get.descricao);
		        expect(tipoConteudo).toBe(json_cadastro_conteudo_get.tipoConteudo);
                expect(conteudo).toBe(json_cadastro_conteudo_get.conteudo);
		        expect(response.body.dataCadastro).toBeDefined();
		            
        });

})

describe("Suite de teste CONTEUDOS - GET{id}", () => {

    let json_cadastro_conteudo_get = {
        titulo: "Aget",
        descricao: "(51) 999995555",
        tipoConteudo: "get@gmail.com",
        conteudo: "12345"
    }

        //Documentação - GET{id}
        it('Deve retornar um conteudo pelo ID com status code 200.', async() => {

            let response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_get);
            idConteudo = response.body.id;

            response = await request(rota)
                .get(`/conteudos/${idConteudo}`);
                expect(response.status).toBe(200);
                console.log(response.body)
                const { descricao, tipoConteudo, conteudo, dataCadastro } = response.body;
                expect(response.body.descricao).toBe(json_cadastro_conteudo_get.descricao);
		        expect(tipoConteudo).toBe(json_cadastro_conteudo_get.tipoConteudo);
                expect(conteudo).toBe(json_cadastro_conteudo_get.conteudo);
		        expect(response.body.dataCadastro).toBeDefined();
		            
        });

        it('Deve retornar um conteudo pelo ID com status code 404.', async() => {

        let response = await request(rota)
                .get(`/conteudos/1000000`);
                expect(response.status).toBe(404);
                console.log(response.body)
                expect(response.body.error).toBe(`O conteúdo com o ID: 1000000 não foi encontrado.`);
                
		            
        });

})

describe("Suite de teste CONTEUDOS - DELETE", () => {

    //Documentação - DELETE{id}
    it('Deve remover o conteudo cadastrado e retornar o status code 200.', async() => {
        
        let json_cadastro_conteudo_del = {
            titulo: "AAAA",
            descricao: "(51) 999998877",
            tipoConteudo: "novoaaaa@gmail.com",
            conteudo: "12345"
        }
        
        
        let response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo_del);
            idConteudo = response.body.id;
        
            response = await request(rota)
            .delete(`/conteudos/${idConteudo}`);
            expect(response.status).toBe(200);
            console.log("Conteúdo deletado: ", response.body);
            expect(response.body.message).toBe("O conteúdo foi removido com sucesso!")
         
    })

    it('Deve validar a tentativa de deletar um conteudo nao encontrado e retonar status code 404.', async() => {
        
            const response = await request(rota)
            .delete(`/conteudos/5000`);
            expect(response.status).toBe(404);
            console.log(response.body);
            expect(response.body.error).toBe("Erro ao excluir o conteúdo, o conteúdo não foi encontrado.")
         
    })
})

describe("Suite de teste CONTEUDOS - UPDATE", () => {

    //Documentação - UPDATE
    it('Deve alterar o conteudo consultado e retonar o status 201.', async() => {
        
        const json_cadastro_conteudo = {
            titulo: "Aget",
            descricao: "(51) 999995555",
            tipoConteudo: "get@gmail.com",
            conteudo: "12345"
        }
        
        const json_cadastro_conteudoAlterado = {
			titulo: "AAAABBBB",
            descricao: "(51) 999998811",
            tipoConteudo: "novobbb@gmail.com",
            conteudo: "1111"
		};

        let response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo);
            idConteudo = response.body.id;

        response = await request(rota)
            .put(`/conteudos/${idConteudo}`)
            .send(json_cadastro_conteudoAlterado);
            expect(response.status).toBe(201);
		    const { id, titulo, descricao, tipoConteudo, conteudo } = response.body;
		    expect(id).toBe(idConteudo);
		    expect(titulo).toBe(json_cadastro_conteudoAlterado.titulo);
		    expect(descricao).toBe(json_cadastro_conteudoAlterado.descricao);
		    expect(tipoConteudo).toBe(json_cadastro_conteudoAlterado.tipoConteudo);
		    expect(conteudo).toBe(json_cadastro_conteudoAlterado.conteudo);
		    console.log("Conteúdo alterado: ", response.body);
    })

    it('Deve validar a tentativa de atualizar um conteudo nao encontrado e retonar status code 404.', async() => {
        
        const json_cadastro_conteudo = {
            titulo: "Aget",
            descricao: "(51) 999995555",
            tipoConteudo: "get@gmail.com",
            conteudo: "12345"
        }
        
        const json_cadastro_conteudoAlterado = {
			titulo: "AAAABBBB",
            descricao: "(51) 999998811",
            tipoConteudo: "novobbb@gmail.com",
            conteudo: "1111"
		};

        let response = await request(rota)
            .post('/conteudos')
            .send(json_cadastro_conteudo);
            idConteudo = response.body.id;

        response = await request(rota)
            .put(`/conteudos/9999`)
            .send(json_cadastro_conteudoAlterado);
            console.log(response.body.error);  
            expect(response.body.error).toBe("O contedúdo que você está tentando alterar não existe na base de dados. ID INFORMADO: 9999");
        })
})

describe("Suite de teste de CONTRATO - SCHEMA", () => {

    //Documentação - SCHEMA
    it("Validar que a estrutura esperada esteja correta", async () => {

      const response = await request(rota).get(`/conteudos`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
  
      response.body.forEach(item => {
        expect(item).toMatchObject({
          id: expect.any(String),
          titulo: expect.any(String),
          descricao: expect.any(String),
          tipoConteudo: expect.any(String),
          conteudo: expect.any(String),
          dataCadastro: expect.any(String),
        });
  
       
      })
    })
})