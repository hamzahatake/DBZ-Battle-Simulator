import { createContext, useContext, useState } from 'react'

const CharacterContext = createContext()

export const useSelectedCharacter = () => useContext(CharacterContext)

export function SelectingCharacter({ children }) {
    const [selectedCharacter, setSelectedCharacter] = useState([]);

    return (
        <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
            {children}
        </CharacterContext.Provider>
    )
}
