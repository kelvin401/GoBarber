import React, { useCallback, useRef } from 'react';
import { Container, Content, AvatarInput } from './styles';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import gerValidationErrors from '../../utils/getValidationErrors';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

  console.log(formRef);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Preencha o campo nome'),
          email: Yup.string()
            .required('Preencha o campo email')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'mínimo de 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description: 'Você já pode fazer seu cadastro no Go Barber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = gerValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Oops...',
          description:
            'Ocorreu um erro durante o seu cadastro. Por favor, tente novamente!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            type="old_password"
            name="password"
            icon={FiLock}
            placeholder="Senha atual"
          />

          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Nova senha"
          />

          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Confirmar senha"
          />

          <Button type="submit">Salvar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
