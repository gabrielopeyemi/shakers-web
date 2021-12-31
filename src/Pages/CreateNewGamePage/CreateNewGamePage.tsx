import { Alert } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader';
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { wrappedLocalStorage } from '../../functions';
import { CreateAGameQuery } from '../../Queries/CreateAGameQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

export default function CreateNewGamePage() {

    const token = wrappedLocalStorage('TOKEN').get();
    const userDetails = wrappedLocalStorage('USERDETAILS').get(true);
    let history = useHistory();
    const [amount, setAmount] = useState<any>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const handleCreateGame = async () => {
        setIsLoading(true);

        if (!amount) {
            setIsLoading(false)
            return alert('input your details')
        }
        try {
            const response = await CreateAGameQuery({ amount, token });
            if (response.data.data.success) {
                setIsLoading(false);
                localStorage.setItem('GAMEID', response.data.data.data._id);
                return history.push('/waiting-for-team-mate')
            }
        } catch (error: any) {
            setIsLoading(false);
            console.log({ error })
            alert("Oops! you can't create a new game, it's like you are in a game")
        }
    }

    return (
        <Container>
            <Auth>
                <h4>Create a game</h4>
                <InputDivStyled>
                    <InputLabelStyled>Amount to bet</InputLabelStyled>
                    <InputStyled
                        type=''
                        onChange={(e: any) => setAmount(e.target.value)}
                        placeholder={'How much do you want to bet'}
                        value={amount}
                    />
                </InputDivStyled>
                <ButtonWithLoader onClick={handleCreateGame} isLoading={isLoading} title='create game' />
                <ButtonWithLoader title={'Join Started Games'} onClick={() => history.push("/running-games")} isLoading={isLoading} />
            </Auth>
            <ToastComponents />
        </Container>
    )
}
