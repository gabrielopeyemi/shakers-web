import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { wrappedLocalStorage } from '../../functions';
import { CheckIfUserIsInAGameQuery } from '../../Queries/CheckIfUserIsInAGameQuery';
import { CreateQueries } from '../../Queries/CreateQueries';
import { useInterval } from '../../useInterval';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

interface Props {

}

export default function DashboardPages({ }: Props): ReactElement {
    const token = wrappedLocalStorage('TOKEN').get();
    useInterval(() => {
        getGame(token)
    }, 2000)

    let history = useHistory();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleJoinGame = () => {
        return history.push('/running-games')
    };

    const handleCreateGame = () => {
        return history.push('/create-new-game')
    };

    const getGame = async (token: string) => {
        try {
            const response = await CheckIfUserIsInAGameQuery(token);
            const main = response.data.data;
            if (main.success) {
                if (main.data) {
                    return history.push('/play-ground')
                }

                if (main.data.joiner === undefined) {
                    return history.push('/waiting-for-team-mate');
                }
                return main.data;
            }
        } catch (error) {

        }
    }

    return (
        <Container>
            <Auth>
                <h5>Hi there</h5>
                <h4>Let Play</h4>
                <ButtonWithLoader title={'Join a Game'} onClick={handleJoinGame} isLoading={isLoading} />
                <ButtonWithLoader title={'Create a new Game'} onClick={handleCreateGame} isLoading={isLoading} />


                <ButtonWithLoader title={'Logout'} onClick={() => history.push("/")} />
            </Auth>
        </Container>
    )
}
