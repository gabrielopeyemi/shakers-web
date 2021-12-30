import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { CreateQueries } from '../../Queries/CreateQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

interface Props {
    
}

export default function DashboardPages({}: Props): ReactElement {
    let history = useHistory();
    const [username, setUsername] = React.useState<string>('gabriel');
    const [password, setPassword] = React.useState<string>('Opeyemi@12');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleJoinGame = () =>{
        return history.push('/running-games')
    };

    const handleCreateGame = () =>{
        return history.push('/create-new-game')
    };

    return (
        <Container>
        <Auth>
            <h5>Hi there</h5>
            <h4>Let Play</h4>
            <ButtonWithLoader title={'Join a Game'} onClick={handleJoinGame} isLoading={isLoading}/>
            <ButtonWithLoader title={'Create a new Game'} onClick={handleCreateGame} isLoading={isLoading}/>
        </Auth>
    </Container>
    )
}
