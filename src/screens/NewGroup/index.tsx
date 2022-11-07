import { useNavigation } from '@react-navigation/native';

import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('players', { group: 'Rocket' });
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <Highlight
                    title="Nova turma"
                    subtitle="Crie uma turma para adicionar pessoas"
                />
            </Content>

            <Input
                placeholder="Nome da turma"
            />

            <Button
                title="Criar"
                style={{ marginTop: 20 }}
                onPress={handleNewGroup}
            />
        </Container>
    );
}