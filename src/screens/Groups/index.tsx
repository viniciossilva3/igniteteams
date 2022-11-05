import { useState } from 'react';
import { FlatList } from 'react-native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';

import { Container } from './styles';

export function Groups() {
    const [groups, setGroups] = useState<string[]>(['Galera da Rocket']);


    return (
        <Container>
            <Header />

            <HighLight
                title="Turmas"
                subtitle="Jogue com a sua turma"
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                    />
                )}
            />

        </Container>
    );
}
