import { useState } from 'react';
import { FlatList } from 'react-native';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';

export function Players() {
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState(['1']);

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

            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) =>

                    (<Filter
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                    />)
                    }
                    horizontal
                />

                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>


        </Container>
    );
}