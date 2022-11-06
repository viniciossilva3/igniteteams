import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Form } from './styles';
import { Input } from '@components/Input';

export function Players() {
    return (
        <Container>
            <Header showBackButton />

            <HighLight
                title="Nome da turma"
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome do participante"
                    autoCorrect={false}
                />


                <ButtonIcon icon="add" />
            </Form>

        </Container>
    );
}