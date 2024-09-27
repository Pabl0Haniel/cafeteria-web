import { useEffect, useState } from 'react';
import ClientesTable from '../components/ClientesTable';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Cliente = () => {
  const schema = Yup.object().shape({
    nome: Yup.string().trim().min(1).max(10).required(),
    email: Yup.string().trim().min(1).max(20).required(),
    nascimento: Yup.date().required(),
    cep: Yup.number().required(),
  });

  let [clientes, setClientes] = useState([]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  let formData = {
    nome: '',
    email: '',
    nascimento: '',
    cep: '',
  };

  useEffect(() => {
    console.log('Carregando clientes!');
    fetch('http://localhost:3000/clientes', { method: 'GET' })
      .then((res) => {
        res.json().then((data) => {
          setClientes([...data]);
        });
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    console.log('Modifiquei o produto!');
  }, [clientes]);

  const handleSubmit = (values) => {
    // Enviar dados para a tabela.
    let novoCliente = { ...values };

    // Enviar os dados para o servidor de backend.
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      body: JSON.stringify(novoCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Cadastro efetuado com sucesso!');

        setClientes([...clientes, novoCliente]);

        // Fechar modal.
        setShow(false);
      })
      .catch((error) => {
        console.log('Problemas a vista!');
      });
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        +
      </Button>

      <ClientesTable clientes={clientes}></ClientesTable>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {/* Nome */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.nome}
                type="text"
                placeholder="Digite o seu nome"
                name="nome"
              />

              <span>{formik.errors.nome}</span>
            </Form.Group>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.descricao}
                type="text"
                placeholder="Digite o seu email"
                name="email"
              />
              <span>{formik.errors.email}</span>
            </Form.Group>
            {/* Nascimento */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nasciemnto</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.nascimento}
                type="date"
                placeholder="Digite sua data de naascimento"
                name="nascimento"
              />
            </Form.Group>
            {/* CEP */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.cep}
                type="text"
                placeholder="Digite o seu cep."
                name="cep"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow} type="button">
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Cliente;
