CREATE DATABASE BARAABB;

CREATE TABLE BARAABB_CATEGORIAPRODUTO (
  idCategoriaProduto BIGINT NOT NULL,
  descricao VARCHAR NOT NULL,
  percentualMargem DECIMAL NOT NULL, 
  dataCadastro DATE NOT NULL,
  CONSTRAINT PK_CATEGORIAPRODUTO PRIMARY KEY (idCategoriaProduto)
);

CREATE TABLE BARAABB_CLIENTE(
  idCliente BIGINT NOT NULL,
  nome VARCHAR NOT NULL,
  telefone VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  observacoes VARCHAR,
  dataCadastro DATE,
  CONSTRAINT PK_CLIENTE PRIMARY KEY (idCliente)
);

CREATE TABLE BARAABB_CLIENTESINADIMPLENTES(
  idClientesInadimplentes BIGINT NOT NULL,
  cliente BIGINT NOT NULL,
  valorTotalComanda DECIMAL NOT NULL,
  statusPagamento VARCHAR NOT NULL,
  dataCompra DATE NOT NULL,
  dataAcerto DATE,
  observacao VARCHAR,
  CONSTRAINT PK_CLIENTESINADIMPLENTES PRIMARY KEY (idClientesInadimplentes),
  CONSTRAINT FK_CLIENTESINADIMPLENTES_CLIENTE FOREIGN KEY (cliente) REFERENCES BARAABB_CLIENTE (idCliente)
);

CREATE TABLE BARAABB_TIPOUSUARIO(
  idTipoUsuario BIGINT NOT NULL,
  descricao VARCHAR NOT NULL,
  CONSTRAINT PK_TIPOUSUARIO PRIMARY KEY (idTipoUsuario)
);

CREATE TABLE BARAABB_USUARIO(
  idUsuario BIGINT NOT NULL,
  senha VARCHAR NOT NULL, 
  email VARCHAR NOT NULL,
  login VARCHAR NOT NULL,
  tipoUsuario BIGINT NOT NULL, 
  CONSTRAINT PK_USUARIO PRIMARY KEY (idUsuario),
  CONSTRAINT FK_USUARIO_TIPOUSUARIO FOREIGN KEY (tipoUsuario) REFERENCES BARAABB_TIPOUSUARIO (idTipoUsuario)
);

CREATE TABLE BARAABB_LISTACOMPRA(
  idListaCompra BIGINT NOT NULL,
  usuario BIGINT NOT NULL,
  CONSTRAINT PK_LISTACOMPRA PRIMARY KEY (idListaCompra),
  CONSTRAINT FK_LISTACOMPRA_USUARIO FOREIGN KEY (usuario) REFERENCES BARAABB_USUARIO (idUsuario)
);

CREATE TABLE BARAABB_PRODUTO(
  idProduto BIGINT NOT NULL,
  categoriaProduto BIGINT NOT NULL,
  descricao VARCHAR NOT NULL,
  precoCompra DECIMAL NOT NULL,
  precoVenda DECIMAL NOT NULL,
  quantidadeEstoque BIGINT NOT NULL,
  usuarioCadastro BIGINT NOT NULL,
  dataCadastro DATE NOT NULL,
  CONSTRAINT PK_PRODUTO PRIMARY KEY (idProduto),
  CONSTRAINT FK_PRODUTO_CATEGORIAPRODUTO FOREIGN KEY (categoriaProduto) REFERENCES BARAABB_CATEGORIAPRODUTO (idCategoriaProduto),
  CONSTRAINT FK_PRODUTO_USUARIO FOREIGN KEY (usuarioCadastro) REFERENCES BARAABB_USUARIO (idUsuario)
);

CREATE TABLE BARAABB_LISTACOMPRAPRODUTO(
  idListaCompraProduto BIGINT NOT NULL,
  produto BIGINT NOT NULL,
  listaCompra BIGINT NOT NULL,
  CONSTRAINT PK_LISTACOMPRAPRODUTO PRIMARY KEY (idListaCompraProduto),
  CONSTRAINT FK_LISTACOMPRAPRODUTO_PRODUTO FOREIGN KEY (produto) REFERENCES BARAABB_PRODUTO (idProduto),
  CONSTRAINT FK_LISTACOMPRAPRODUTO_LISTACOMPRA FOREIGN KEY (listaCompra) REFERENCES BARAABB_LISTACOMPRA (idListaCompra)
);

CREATE TABLE BARAABB_VENDADIARIA(
  idVendaDiaria BIGINT NOT NULL,
  usuario BIGINT NOT NULL,
  valorTotalBruto DECIMAL NOT NULL, 
  valorTotalLiquido DECIMAL NOT NULL,
  dataCadastro DATE NOT NULL,
  CONSTRAINT PK_VENDADIARIA PRIMARY KEY (idVendaDiaria),
  CONSTRAINT FK_VENDADIARIA_USUARIO FOREIGN KEY (usuario) REFERENCES BARAABB_USUARIO (idUsuario)
);

CREATE TABLE BARAABB_VENDADIARIAFORMARECEB(
  idVendaDiariaFormaRecebimento BIGINT NOT NULL,
  formaPagamento VARCHAR NOT NULL,
  valorRecebido DECIMAL NOT NULL, 
  vendaDiaria BIGINT NOT NULL, 
  CONSTRAINT PK_VENDADIARIAFORMARECEB PRIMARY KEY (idVendaDiariaFormaRecebimento),
  CONSTRAINT FK_VENDADIARIAFORMARECEB FOREIGN KEY (vendaDiaria) REFERENCES BARAABB_VENDADIARIA (idVendaDiaria)
);

CREATE TABLE BARAABB_VENDADIARIAPRODUTO(
  idVendaDiariaProduto BIGINT NOT NULL,
  produto BIGINT NOT NULL,
  vendaDiaria BIGINT NOT NULL,
  valorTotalVendido DECIMAL NOT NULL,
  quantidadeTotalVendida BIGINT NOT NULL,
  CONSTRAINT PK_VENDADIARIAPRODUTO PRIMARY KEY (idVendaDiariaProduto),
  CONSTRAINT FK_VENDADIARIAPRODUTO_PRODUTO FOREIGN KEY (produto) REFERENCES BARAABB_PRODUTO (idProduto),
  CONSTRAINT FK_VENDADIARIAPRODUTO_VENDADIARIA FOREIGN KEY (vendaDiaria) REFERENCES BARAABB_VENDADIARIA (idVendaDiaria)
);
 

-- sequence (autoincrement) para os IDs das tabelas (esqueci de fazer antes)

-- criação das sequence
CREATE SEQUENCE seq_categoria_produto START 1;
CREATE SEQUENCE seq_cliente START 1;
CREATE SEQUENCE seq_clientes_inadimplentes START 1;
CREATE SEQUENCE seq_tipo_usuario START 1;
CREATE SEQUENCE seq_usuario START 1;
CREATE SEQUENCE seq_lista_compra START 1;
CREATE SEQUENCE seq_produto START 1;
CREATE SEQUENCE seq_lista_compra_produto START 1;
CREATE SEQUENCE seq_venda_diaria START 1;
CREATE SEQUENCE seq_venda_diaria_forma_receb START 1;
CREATE SEQUENCE seq_venda_diaria_produto START 1;

-- alteração das tabelas para associar as sequence nas colunas de chave primária
ALTER TABLE BARAABB_CATEGORIAPRODUTO ALTER COLUMN idCategoriaProduto SET DEFAULT nextval('seq_categoria_produto');
ALTER TABLE BARAABB_CLIENTE ALTER COLUMN idCliente SET DEFAULT nextval('seq_cliente');
ALTER TABLE BARAABB_CLIENTESINADIMPLENTES ALTER COLUMN idClientesInadimplentes SET DEFAULT nextval('seq_clientes_inadimplentes');
ALTER TABLE BARAABB_TIPOUSUARIO ALTER COLUMN idTipoUsuario SET DEFAULT nextval('seq_tipo_usuario');
ALTER TABLE BARAABB_USUARIO ALTER COLUMN idUsuario SET DEFAULT nextval('seq_usuario');
ALTER TABLE BARAABB_LISTACOMPRA ALTER COLUMN idListaCompra SET DEFAULT nextval('seq_lista_compra');
ALTER TABLE BARAABB_PRODUTO ALTER COLUMN idProduto SET DEFAULT nextval('seq_produto');
ALTER TABLE BARAABB_LISTACOMPRAPRODUTO ALTER COLUMN idListaCompraProduto SET DEFAULT nextval('seq_lista_compra_produto');
ALTER TABLE BARAABB_VENDADIARIA ALTER COLUMN idVendaDiaria SET DEFAULT nextval('seq_venda_diaria');
ALTER TABLE BARAABB_VENDADIARIAFORMARECEB ALTER COLUMN idVendaDiariaFormaRecebimento SET DEFAULT nextval('seq_venda_diaria_forma_receb');
ALTER TABLE BARAABB_VENDADIARIAPRODUTO ALTER COLUMN idVendaDiariaProduto SET DEFAULT nextval('seq_venda_diaria_produto');
