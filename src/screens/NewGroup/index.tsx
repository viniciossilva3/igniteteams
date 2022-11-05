import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Button } from '@components/Button';

export function NewGroup() {

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <HighLight
                    title="Nova turma"
                    subtitle="Crie uma turma para adicionar pessoas"
                />
            </Content>

            <Button
                title="Criar"
            />


        </Container>
    );
}